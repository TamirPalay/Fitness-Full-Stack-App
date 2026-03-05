package com.example.CustomFIT.Backend.service;

import com.example.CustomFIT.Backend.model.Exercise;
import com.example.CustomFIT.Backend.model.Workout;
import com.example.CustomFIT.Backend.model.WorkoutExercise;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class WorkoutService {

    private final Map<Long, Exercise> exercises = new LinkedHashMap<>();
    private final Map<Long, Workout> workouts = new LinkedHashMap<>();
    private final AtomicLong workoutIdSeq = new AtomicLong(100);

    public WorkoutService() {
        seedExercises();
        seedWorkouts();
    }

    // ─── Exercises ────────────────────────────────────────────────────────────

    public List<Exercise> getExercises(String bodyPart, String equipment) {
        return exercises.values().stream()
                .filter(e -> bodyPart == null || e.getBodyPart().equalsIgnoreCase(bodyPart))
                .filter(e -> equipment == null || e.getEquipment().equalsIgnoreCase(equipment))
                .collect(Collectors.toList());
    }

    public Optional<Exercise> getExerciseById(Long id) {
        return Optional.ofNullable(exercises.get(id));
    }

    public List<String> getBodyParts() {
        return exercises.values().stream()
                .map(Exercise::getBodyPart)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<String> getEquipmentList() {
        return exercises.values().stream()
                .map(Exercise::getEquipment)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // ─── Workouts ─────────────────────────────────────────────────────────────

    public List<Workout> getWorkouts(String type) {
        return workouts.values().stream()
                .filter(w -> type == null || w.getType().equalsIgnoreCase(type))
                .collect(Collectors.toList());
    }

    public Optional<Workout> getWorkoutById(Long id) {
        return Optional.ofNullable(workouts.get(id));
    }

    public Workout createWorkout(Workout workout) {
        long id = workoutIdSeq.incrementAndGet();
        workout.setId(id);
        workout.setType("CUSTOM");

        // Resolve exercise references — client sends exercise IDs inside WorkoutExercise
        if (workout.getExercises() != null) {
            List<WorkoutExercise> resolved = new ArrayList<>();
            for (WorkoutExercise we : workout.getExercises()) {
                if (we.getExercise() != null && we.getExercise().getId() != null) {
                    Exercise full = exercises.get(we.getExercise().getId());
                    if (full != null) {
                        WorkoutExercise copy = new WorkoutExercise(full,
                                we.getSets() > 0 ? we.getSets() : full.getDefaultSets(),
                                we.getReps() > 0 ? we.getReps() : full.getDefaultReps());
                        copy.setNotes(we.getNotes());
                        resolved.add(copy);
                    }
                }
            }
            workout.setExercises(resolved);
        }

        workouts.put(id, workout);
        return workout;
    }

    public boolean deleteWorkout(Long id) {
        Workout w = workouts.get(id);
        if (w != null && "CUSTOM".equals(w.getType())) {
            workouts.remove(id);
            return true;
        }
        return false;
    }

    // ─── Seed Data ────────────────────────────────────────────────────────────

    private void add(long id, String name, String bodyPart, String equipment,
                     String desc, int sets, int reps) {
        exercises.put(id, new Exercise(id, name, bodyPart, equipment, desc, sets, reps));
    }

    private void seedExercises() {
        // Chest
        add(1,  "Barbell Bench Press",   "Chest",     "Barbell",         "Lie flat, lower bar to chest and press up.", 4, 8);
        add(2,  "Dumbbell Chest Fly",    "Chest",     "Dumbbell",        "Lie flat, arc dumbbells wide and squeeze at top.", 3, 12);
        add(3,  "Push-Up",               "Chest",     "Bodyweight",      "Classic push-up keeping core tight.", 3, 15);
        add(4,  "Incline Dumbbell Press","Chest",     "Dumbbell",        "Press dumbbells on an incline bench.", 3, 10);
        add(5,  "Cable Chest Fly",       "Chest",     "Cable",           "Use cable machine for constant tension fly.", 3, 12);
        add(6,  "Chest Dip",             "Chest",     "Bodyweight",      "Forward-lean dips targeting lower chest.", 3, 10);
        // Back
        add(7,  "Pull-Up",               "Back",      "Bodyweight",      "Hang from bar and pull chest to bar.", 4, 8);
        add(8,  "Barbell Deadlift",      "Back",      "Barbell",         "Hinge at hips, lift bar from floor with flat back.", 4, 5);
        add(9,  "Dumbbell Row",          "Back",      "Dumbbell",        "One arm row braced on bench.", 3, 10);
        add(10, "Lat Pulldown",          "Back",      "Cable",           "Pull bar to upper chest with wide grip.", 3, 12);
        add(11, "Seated Cable Row",      "Back",      "Cable",           "Row cable to abdomen keeping back straight.", 3, 12);
        add(12, "Barbell Bent-Over Row", "Back",      "Barbell",         "Hinge and row bar to lower chest.", 4, 8);
        // Shoulders
        add(13, "Overhead Press",        "Shoulders", "Barbell",         "Press barbell overhead from rack.", 4, 8);
        add(14, "Dumbbell Lateral Raise","Shoulders", "Dumbbell",        "Raise dumbbells out to sides to shoulder height.", 3, 15);
        add(15, "Face Pull",             "Shoulders", "Cable",           "Pull rope to face targeting rear delts.", 3, 15);
        add(16, "Arnold Press",          "Shoulders", "Dumbbell",        "Rotating dumbbell press for full delt coverage.", 3, 10);
        add(17, "Band Pull-Apart",       "Shoulders", "Resistance Band", "Pull band apart at chest height for rear delts.", 3, 20);
        // Arms
        add(18, "Barbell Curl",          "Arms",      "Barbell",         "Standard barbell bicep curl.", 3, 12);
        add(19, "Tricep Pushdown",       "Arms",      "Cable",           "Push cable bar down to full extension.", 3, 12);
        add(20, "Dumbbell Hammer Curl",  "Arms",      "Dumbbell",        "Neutral-grip curl for brachialis and biceps.", 3, 12);
        add(21, "Skull Crusher",         "Arms",      "Barbell",         "Lower bar to forehead then extend.", 3, 10);
        add(22, "Dips (Tricep)",         "Arms",      "Bodyweight",      "Upright dips targeting triceps.", 3, 12);
        add(23, "Concentration Curl",    "Arms",      "Dumbbell",        "Seated single-arm curl braced on thigh.", 3, 12);
        // Legs
        add(24, "Barbell Squat",         "Legs",      "Barbell",         "Back squat below parallel.", 4, 8);
        add(25, "Romanian Deadlift",     "Legs",      "Barbell",         "Hip hinge targeting hamstrings.", 3, 10);
        add(26, "Leg Press",             "Legs",      "Machine",         "Press sled with feet shoulder-width.", 4, 12);
        add(27, "Dumbbell Lunge",        "Legs",      "Dumbbell",        "Alternating forward lunges.", 3, 12);
        add(28, "Goblet Squat",          "Legs",      "Kettlebell",      "Hold kettlebell at chest and squat deep.", 3, 12);
        add(29, "Leg Curl",              "Legs",      "Machine",         "Curl legs against resistance.", 3, 12);
        add(30, "Calf Raise",            "Legs",      "Bodyweight",      "Rise onto toes with full range of motion.", 4, 20);
        add(31, "Resistance Band Squat", "Legs",      "Resistance Band", "Squat with band above knees for glute activation.", 3, 15);
        // Core
        add(32, "Plank",                 "Core",      "Bodyweight",      "Hold hollow body position on forearms.", 3, 60);
        add(33, "Cable Crunch",          "Core",      "Cable",           "Kneel and crunch down with cable overhead.", 3, 15);
        add(34, "Hanging Leg Raise",     "Core",      "Bodyweight",      "Hang from bar and raise legs to 90°.", 3, 12);
        add(35, "Russian Twist",         "Core",      "Dumbbell",        "Seated twist holding dumbbell.", 3, 20);
        add(36, "Ab Wheel Rollout",      "Core",      "Bodyweight",      "Roll wheel out and back from knees.", 3, 10);
        add(37, "Dead Bug",              "Core",      "Bodyweight",      "Opposite arm/leg extension keeping back flat.", 3, 10);

        // Full Body
        add(38, "Kettlebell Swing", "Full Body", "Kettlebell", "Hip-hinge swing driving kettlebell to shoulder height.", 4, 15);
        add(39, "Burpee",           "Full Body", "Bodyweight", "Drop to ground, push-up, jump up.", 3, 10);
        add(40, "Clean and Press",  "Full Body", "Barbell",    "Power clean into overhead press.", 4, 5);
        add(41, "Thruster",         "Full Body", "Dumbbell",   "Front squat into overhead press.", 3, 10);
    }

    private void seedWorkouts() {
        // Exercise ID map (sequential from seedExercises):
        // 1=Bench Press, 2=DB Fly, 3=Push-Up, 4=Incline DB Press, 5=Cable Fly, 6=Chest Dip
        // 7=Pull-Up, 8=Deadlift, 9=DB Row, 10=Lat Pulldown, 11=Cable Row, 12=BB Bent-Over Row
        // 13=OHP, 14=Lateral Raise, 15=Face Pull, 16=Arnold Press, 17=Band Pull-Apart
        // 18=BB Curl, 19=Tricep Pushdown, 20=Hammer Curl, 21=Skull Crusher, 22=Tricep Dips, 23=Concentration Curl
        // 24=BB Squat, 25=RDL, 26=Leg Press, 27=DB Lunge, 28=Goblet Squat, 29=Leg Curl, 30=Calf Raise, 31=Band Squat
        // 32=Plank, 33=Cable Crunch, 34=Hanging Leg Raise, 35=Russian Twist, 36=Ab Wheel, 37=Dead Bug
        // 38=KB Swing, 39=Burpee, 40=Clean and Press, 41=Thruster
        long id = 1;

        workouts.put(id, new Workout(id++, "Full Body Beginner",
                "A simple full-body workout using only bodyweight. Great for getting started.",
                "PRESET", "Beginner", 30,
                List.of(
                        new WorkoutExercise(exercises.get(3L), 3, 10),   // Push-Up
                        new WorkoutExercise(exercises.get(7L), 3, 8),    // Pull-Up
                        new WorkoutExercise(exercises.get(27L), 3, 12),  // DB Lunge
                        new WorkoutExercise(exercises.get(32L), 3, 30),  // Plank (seconds)
                        new WorkoutExercise(exercises.get(39L), 3, 10)   // Burpee
                )));

        workouts.put(id, new Workout(id++, "Push Day",
                "Classic push session targeting chest, shoulders, and triceps.",
                "PRESET", "Intermediate", 50,
                List.of(
                        new WorkoutExercise(exercises.get(1L), 4, 8),    // Bench Press
                        new WorkoutExercise(exercises.get(4L), 3, 10),   // Incline DB Press
                        new WorkoutExercise(exercises.get(13L), 4, 8),   // Overhead Press
                        new WorkoutExercise(exercises.get(2L), 3, 12),   // DB Fly
                        new WorkoutExercise(exercises.get(19L), 3, 12),  // Tricep Pushdown
                        new WorkoutExercise(exercises.get(14L), 3, 15)   // Lateral Raise
                )));

        workouts.put(id, new Workout(id++, "Pull Day",
                "Back and bicep session focused on vertical and horizontal pulls.",
                "PRESET", "Intermediate", 50,
                List.of(
                        new WorkoutExercise(exercises.get(7L), 4, 8),    // Pull-Up
                        new WorkoutExercise(exercises.get(12L), 4, 8),   // Bent-Over Row
                        new WorkoutExercise(exercises.get(10L), 3, 12),  // Lat Pulldown
                        new WorkoutExercise(exercises.get(11L), 3, 12),  // Seated Cable Row
                        new WorkoutExercise(exercises.get(18L), 3, 12),  // Barbell Curl
                        new WorkoutExercise(exercises.get(20L), 3, 12)   // Hammer Curl
                )));

        workouts.put(id, new Workout(id++, "Leg Day",
                "Lower body strength and hypertrophy session.",
                "PRESET", "Intermediate", 55,
                List.of(
                        new WorkoutExercise(exercises.get(24L), 4, 8),   // Barbell Squat
                        new WorkoutExercise(exercises.get(25L), 3, 10),  // Romanian Deadlift
                        new WorkoutExercise(exercises.get(26L), 4, 12),  // Leg Press
                        new WorkoutExercise(exercises.get(29L), 3, 12),  // Leg Curl
                        new WorkoutExercise(exercises.get(27L), 3, 12),  // DB Lunge
                        new WorkoutExercise(exercises.get(30L), 4, 20)   // Calf Raise
                )));

        workouts.put(id, new Workout(id++, "Core Blast",
                "Targeted abs and core stability work.",
                "PRESET", "Beginner", 25,
                List.of(
                        new WorkoutExercise(exercises.get(32L), 3, 45),  // Plank
                        new WorkoutExercise(exercises.get(34L), 3, 12),  // Hanging Leg Raise
                        new WorkoutExercise(exercises.get(35L), 3, 20),  // Russian Twist
                        new WorkoutExercise(exercises.get(36L), 3, 10),  // Ab Wheel Rollout
                        new WorkoutExercise(exercises.get(37L), 3, 10)   // Dead Bug
                )));

        workouts.put(id, new Workout(id++, "Kettlebell Power",
                "Full-body power and conditioning using kettlebells.",
                "PRESET", "Intermediate", 40,
                List.of(
                        new WorkoutExercise(exercises.get(38L), 4, 15),  // KB Swing
                        new WorkoutExercise(exercises.get(28L), 3, 12),  // Goblet Squat
                        new WorkoutExercise(exercises.get(16L), 3, 10),  // Arnold Press
                        new WorkoutExercise(exercises.get(20L), 3, 12),  // Hammer Curl
                        new WorkoutExercise(exercises.get(41L), 3, 10)   // Thruster
                )));

        workouts.put(id, new Workout(id++, "Barbell Strength",
                "Heavy compound lifts for maximal strength development.",
                "PRESET", "Advanced", 65,
                List.of(
                        new WorkoutExercise(exercises.get(24L), 5, 5),   // Squat
                        new WorkoutExercise(exercises.get(8L), 5, 5),    // Deadlift
                        new WorkoutExercise(exercises.get(1L), 5, 5),    // Bench Press
                        new WorkoutExercise(exercises.get(13L), 4, 5),   // OHP
                        new WorkoutExercise(exercises.get(12L), 4, 5)    // Bent-Over Row
                )));
    }
}
