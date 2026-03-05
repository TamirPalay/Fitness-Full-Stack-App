/* ── State ────────────────────────────────────────────────────────── */
const state = {
  exercises: [],
  workouts: [],
  builderSelected: [],   // { exercise, sets, reps }
  activeWorkoutTab: 'preset',
};

/* ── API helpers ──────────────────────────────────────────────────── */
const api = {
  async get(path) {
    const r = await fetch(path);
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async post(path, body) {
    const r = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  },
  async del(path) {
    const r = await fetch(path, { method: 'DELETE' });
    return r.ok;
  },
};

/* ── Toast ────────────────────────────────────────────────────────── */
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Navigation ───────────────────────────────────────────────────── */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`page-${btn.dataset.page}`).classList.add('active');
  });
});

/* ── Workout Tabs ─────────────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.activeWorkoutTab = tab.dataset.tab;
    renderWorkouts();
  });
});

/* ── Workout page ─────────────────────────────────────────────────── */
function renderWorkouts() {
  const list = document.getElementById('workout-list');
  const filtered = state.workouts.filter(w =>
    state.activeWorkoutTab === 'preset'
      ? w.type === 'PRESET'
      : w.type === 'CUSTOM'
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <p>${state.activeWorkoutTab === 'custom'
        ? 'No custom workouts yet. Head to <strong>Build Workout</strong> to create one!'
        : 'No preset workouts found.'}</p>
    </div>`;
    return;
  }

  list.innerHTML = filtered.map(w => `
    <div class="workout-card" data-id="${w.id}">
      ${w.type === 'CUSTOM' ? `<button class="delete-btn" title="Delete" data-id="${w.id}">🗑</button>` : ''}
      <span class="badge badge-${w.type.toLowerCase()}">${w.type}</span>
      <span class="badge badge-${w.difficulty.toLowerCase()}">${w.difficulty}</span>
      <h3>${w.name}</h3>
      <p>${w.description}</p>
      <div class="workout-meta-row">
        <span>⏱ ${w.estimatedMinutes} min</span>
        <span>🏋️ ${w.exercises.length} exercises</span>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.workout-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) return;
      const id = Number(card.dataset.id);
      openWorkoutModal(id);
    });
  });

  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const ok = await api.del(`/api/workouts/${id}`);
      if (ok) {
        state.workouts = state.workouts.filter(w => w.id !== id);
        renderWorkouts();
        showToast('Workout deleted.');
      }
    });
  });
}

/* ── Workout Detail Modal ─────────────────────────────────────────── */
function openWorkoutModal(id) {
  const w = state.workouts.find(x => x.id === id);
  if (!w) return;

  document.getElementById('modal-content').innerHTML = `
    <h2>${w.name}</h2>
    <div class="modal-meta">
      <span class="badge badge-${w.type.toLowerCase()}">${w.type}</span>
      <span class="badge badge-${w.difficulty.toLowerCase()}">${w.difficulty}</span>
    </div>
    <p>${w.description}</p>
    <table class="exercise-table">
      <thead><tr><th>#</th><th>Exercise</th><th>Body Part</th><th>Equipment</th><th>Sets</th><th>Reps</th></tr></thead>
      <tbody>
        ${w.exercises.map((we, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${we.exercise.name}</strong></td>
            <td>${we.exercise.bodyPart}</td>
            <td>${we.exercise.equipment}</td>
            <td>${we.sets}</td>
            <td>${we.reps}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="margin-top:1.5rem;display:flex;gap:.75rem;justify-content:flex-end">
      <button class="btn-primary" id="modal-use-btn">Use This Workout</button>
    </div>
  `;

  document.getElementById('modal-use-btn').addEventListener('click', () => {
    closeModal();
    loadWorkoutIntoBuilder(w);
    document.querySelector('[data-page="builder"]').click();
  });

  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

/* ── Exercise Library ─────────────────────────────────────────────── */
async function populateFilters(bodypartSel, equipmentSel) {
  const [bodyParts, equipment] = await Promise.all([
    api.get('/api/exercises/body-parts'),
    api.get('/api/exercises/equipment'),
  ]);

  bodyParts.forEach(bp => {
    const o = new Option(bp, bp);
    bodypartSel.appendChild(o.cloneNode(true));
  });

  equipment.forEach(eq => {
    const o = new Option(eq, eq);
    equipmentSel.appendChild(o.cloneNode(true));
  });
}

function tagClass(bodyPart) {
  return 'tag-' + bodyPart.toLowerCase().replace(' ', '-');
}

function renderExercises(container, exercises, clickable = false, selectedIds = new Set()) {
  if (exercises.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>No exercises match your filters.</p></div>`;
    return;
  }
  container.innerHTML = exercises.map(e => `
    <div class="exercise-card ${clickable ? 'clickable' : ''} ${selectedIds.has(e.id) ? 'selected' : ''}"
         data-id="${e.id}">
      <span class="tag ${tagClass(e.bodyPart)}">${e.bodyPart}</span>
      <h4>${e.name}</h4>
      <div class="equip">🔧 ${e.equipment}</div>
      <div style="font-size:.75rem;color:#666;margin-top:.4rem;line-height:1.4">${e.description}</div>
    </div>
  `).join('');
}

async function loadExercisePage() {
  const bodypartSel  = document.getElementById('filter-bodypart');
  const equipmentSel = document.getElementById('filter-equipment');

  await populateFilters(bodypartSel, equipmentSel);

  async function refresh() {
    const bp = bodypartSel.value || null;
    const eq = equipmentSel.value || null;
    const params = new URLSearchParams();
    if (bp) params.append('bodyPart', bp);
    if (eq) params.append('equipment', eq);
    const url = '/api/exercises' + (params.toString() ? '?' + params : '');
    const data = await api.get(url);
    renderExercises(document.getElementById('exercise-list'), data);
  }

  bodypartSel.addEventListener('change', refresh);
  equipmentSel.addEventListener('change', refresh);
  document.getElementById('btn-clear-filters').addEventListener('click', () => {
    bodypartSel.value = '';
    equipmentSel.value = '';
    refresh();
  });

  await refresh();
}

/* ── Builder ──────────────────────────────────────────────────────── */
async function loadBuilderPage() {
  const bodypartSel  = document.getElementById('builder-filter-bodypart');
  const equipmentSel = document.getElementById('builder-filter-equipment');

  // Only populate once
  if (bodypartSel.options.length <= 1) {
    const [bodyParts, equipment] = await Promise.all([
      api.get('/api/exercises/body-parts'),
      api.get('/api/exercises/equipment'),
    ]);
    bodyParts.forEach(bp => bodypartSel.appendChild(new Option(bp, bp)));
    equipment.forEach(eq => equipmentSel.appendChild(new Option(eq, eq)));
  }

  async function refreshBuilderList() {
    const bp = bodypartSel.value || null;
    const eq = equipmentSel.value || null;
    const params = new URLSearchParams();
    if (bp) params.append('bodyPart', bp);
    if (eq) params.append('equipment', eq);
    const url = '/api/exercises' + (params.toString() ? '?' + params : '');
    const data = await api.get(url);
    const selectedIds = new Set(state.builderSelected.map(s => s.exercise.id));
    const container = document.getElementById('builder-exercise-list');
    renderExercises(container, data, true, selectedIds);

    container.querySelectorAll('.exercise-card.clickable').forEach(card => {
      card.addEventListener('click', () => {
        const id = Number(card.dataset.id);
        toggleBuilderExercise(id, data);
        refreshBuilderList();
      });
    });
  }

  bodypartSel.addEventListener('change', refreshBuilderList);
  equipmentSel.addEventListener('change', refreshBuilderList);

  await refreshBuilderList();
}

function toggleBuilderExercise(id, exercisePool) {
  const existing = state.builderSelected.findIndex(s => s.exercise.id === id);
  if (existing !== -1) {
    state.builderSelected.splice(existing, 1);
  } else {
    const ex = exercisePool.find(e => e.id === id);
    if (ex) state.builderSelected.push({ exercise: ex, sets: ex.defaultSets, reps: ex.defaultReps });
  }
  renderBuilderSelected();
}

function renderBuilderSelected() {
  const container = document.getElementById('builder-selected');
  const empty     = document.getElementById('builder-empty');
  const saveBtn   = document.getElementById('btn-save-workout');

  if (state.builderSelected.length === 0) {
    container.innerHTML = '';
    empty.style.display = 'block';
    saveBtn.disabled = true;
    return;
  }

  empty.style.display = 'none';
  saveBtn.disabled = false;

  container.innerHTML = state.builderSelected.map((item, idx) => `
    <div class="selected-item" data-idx="${idx}">
      <span class="tag ${tagClass(item.exercise.bodyPart)}" style="min-width:60px;text-align:center">${item.exercise.bodyPart}</span>
      <span class="item-name">${item.exercise.name}</span>
      <div class="sets-reps">
        <input type="number" class="sets-input" value="${item.sets}" min="1" max="20" data-idx="${idx}" title="Sets" />
        <span style="color:var(--muted)">×</span>
        <input type="number" class="reps-input" value="${item.reps}" min="1" max="100" data-idx="${idx}" title="Reps" />
      </div>
      <button class="remove-item" data-idx="${idx}" title="Remove">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      state.builderSelected.splice(Number(btn.dataset.idx), 1);
      renderBuilderSelected();
      // Refresh exercise list to deselect card
      const bp = document.getElementById('builder-filter-bodypart').value;
      const eq = document.getElementById('builder-filter-equipment').value;
      const params = new URLSearchParams();
      if (bp) params.append('bodyPart', bp);
      if (eq) params.append('equipment', eq);
      api.get('/api/exercises' + (params.toString() ? '?' + params : '')).then(data => {
        const selectedIds = new Set(state.builderSelected.map(s => s.exercise.id));
        const container2 = document.getElementById('builder-exercise-list');
        renderExercises(container2, data, true, selectedIds);
        container2.querySelectorAll('.exercise-card.clickable').forEach(card => {
          card.addEventListener('click', () => {
            toggleBuilderExercise(Number(card.dataset.id), data);
            const selectedIds2 = new Set(state.builderSelected.map(s => s.exercise.id));
            renderExercises(container2, data, true, selectedIds2);
            container2.querySelectorAll('.exercise-card.clickable').forEach(c => {
              c.addEventListener('click', () => toggleBuilderExercise(Number(c.dataset.id), data));
            });
          });
        });
      });
    });
  });

  container.querySelectorAll('.sets-input').forEach(inp => {
    inp.addEventListener('change', () => {
      state.builderSelected[Number(inp.dataset.idx)].sets = Number(inp.value);
    });
  });
  container.querySelectorAll('.reps-input').forEach(inp => {
    inp.addEventListener('change', () => {
      state.builderSelected[Number(inp.dataset.idx)].reps = Number(inp.value);
    });
  });
}

/* ── Load workout into builder (from "Use This Workout") ─────────── */
function loadWorkoutIntoBuilder(workout) {
  state.builderSelected = workout.exercises.map(we => ({
    exercise: we.exercise,
    sets: we.sets,
    reps: we.reps,
  }));
  document.getElementById('workout-name').value = workout.name + ' (Copy)';
  document.getElementById('workout-desc').value = workout.description;
  renderBuilderSelected();
  loadBuilderPage(); // refresh exercise list
}

/* ── Save Workout ─────────────────────────────────────────────────── */
document.getElementById('btn-save-workout').addEventListener('click', async () => {
  const name = document.getElementById('workout-name').value.trim();
  if (!name) { showToast('Please enter a workout name.'); return; }
  if (state.builderSelected.length === 0) { showToast('Add at least one exercise.'); return; }

  const payload = {
    name,
    description: document.getElementById('workout-desc').value.trim(),
    difficulty: document.getElementById('workout-difficulty').value,
    estimatedMinutes: state.builderSelected.length * 7,
    exercises: state.builderSelected.map(s => ({
      exercise: { id: s.exercise.id },
      sets: s.sets,
      reps: s.reps,
    })),
  };

  const created = await api.post('/api/workouts', payload);
  state.workouts.push(created);
  state.builderSelected = [];
  renderBuilderSelected();
  document.getElementById('workout-name').value = '';
  document.getElementById('workout-desc').value = '';

  showToast(`"${created.name}" saved!`);
  document.querySelector('[data-page="workouts"]').click();
  state.activeWorkoutTab = 'custom';
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === 'custom');
  });
  renderWorkouts();
});

/* ── Builder nav hook (lazy init) ─────────────────────────────────── */
let builderLoaded = false;
document.querySelector('[data-page="builder"]').addEventListener('click', () => {
  if (!builderLoaded) {
    loadBuilderPage();
    builderLoaded = true;
  }
});

/* ── Bootstrap ────────────────────────────────────────────────────── */
async function init() {
  const [exercises, workouts] = await Promise.all([
    api.get('/api/exercises'),
    api.get('/api/workouts'),
  ]);
  state.exercises = exercises;
  state.workouts  = workouts;

  renderWorkouts();
  await loadExercisePage();
}

init().catch(console.error);
