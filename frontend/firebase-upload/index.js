// index.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { equipmentList } = require('./data/equipment');
const { exerciseList } = require('./data/exercises');
const { workoutList } = require('./data/workouts');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const uploadData = async () => {
  try {
    // Upload Equipment and save IDs mapped by equipment name
    const equipmentRefs = {};
    for (const item of equipmentList) {
      // Use doc ID = camelCase of name to keep consistency
      const docId = item.Name.replace(/\s+/g, '');
      const ref = db.collection('Equipment').doc(docId);
      await ref.set(item);
      equipmentRefs[item.Name] = docId;
    }

    // Upload Exercises linking to Equipment by ID
    const exerciseRefs = {};
    for (const exercise of exerciseList) {
      const equipmentId = equipmentRefs[exercise.EquipmentName] || null;
      const { EquipmentName, ...rest } = exercise;

      // Use camelCase name as doc ID
      const docId = rest.Name.replace(/\s+/g, '');
      const docRef = db.collection('Exercises').doc(docId);

      await docRef.set({
        ...rest,
        EquipmentId: equipmentId,
      });

      exerciseRefs[rest.Name] = docId;
    }

    // Upload Workouts with embedded ExerciseId, sets, reps, time, etc.
    for (const workout of workoutList) {
      // Replace ExerciseName with ExerciseId in exercises array
      const enrichedExercises = workout.Exercises.map((ex) => {
        const exerciseId = exerciseRefs[ex.ExerciseName];
        if (!exerciseId) {
          console.warn(`Exercise "${ex.ExerciseName}" not found in exercises collection.`);
        }
        return {
          ...ex,
          ExerciseId: exerciseId || null,
        };
      });

      const { Exercises, ...rest } = workout;
      const docId = rest.Name.replace(/\s+/g, '');
      const workoutRef = db.collection('Workouts').doc(docId);

      await workoutRef.set({
        ...rest,
        Exercises: enrichedExercises,
      });
    }

    console.log('✅ Data uploaded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Upload failed:', err);
    process.exit(1);
  }
};

uploadData();
