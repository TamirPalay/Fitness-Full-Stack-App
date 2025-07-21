const workoutList = [
    {
      Name: "Full Body Beginner",
      Description: "A full body workout suitable for beginners.",
      DurationMinutes: 30,
      Exercises: [
        { ExerciseName: "Push Ups", Sets: 3, Reps: 10, RestSeconds: 60 },
        { ExerciseName: "Squats", Sets: 3, Reps: 15, RestSeconds: 60 },
        { ExerciseName: "Plank", Sets: 3, TimeSeconds: 30, RestSeconds: 30 },
        { ExerciseName: "Glute Bridge", Sets: 3, Reps: 12, RestSeconds: 45 }
      ]
    },
    {
      Name: "Upper Body Strength",
      Description: "Focuses on upper body muscle groups.",
      DurationMinutes: 40,
      Exercises: [
        { ExerciseName: "Bench Press", Sets: 4, Reps: 8, RestSeconds: 90 },
        { ExerciseName: "Pull Ups", Sets: 3, Reps: 6, RestSeconds: 90 },
        { ExerciseName: "Overhead Press", Sets: 3, Reps: 10, RestSeconds: 60 },
        { ExerciseName: "Bicep Curls", Sets: 3, Reps: 12, RestSeconds: 45 }
      ]
    },
    {
      Name: "Core Focus",
      Description: "Strengthen your core muscles.",
      DurationMinutes: 20,
      Exercises: [
        { ExerciseName: "Plank", Sets: 4, TimeSeconds: 45, RestSeconds: 30 },
        { ExerciseName: "Russian Twists", Sets: 3, Reps: 20, RestSeconds: 30 },
        { ExerciseName: "Leg Raises", Sets: 3, Reps: 15, RestSeconds: 30 },
        { ExerciseName: "Side Plank", Sets: 3, TimeSeconds: 30, RestSeconds: 30 }
      ]
    },
    {
      Name: "Leg Day",
      Description: "Leg strengthening and endurance.",
      DurationMinutes: 35,
      Exercises: [
        { ExerciseName: "Squats", Sets: 4, Reps: 12, RestSeconds: 60 },
        { ExerciseName: "Lunges", Sets: 3, Reps: 10, RestSeconds: 45 },
        { ExerciseName: "Calf Raises", Sets: 3, Reps: 20, RestSeconds: 30 },
        { ExerciseName: "Jump Squats", Sets: 3, Reps: 15, RestSeconds: 45 }
      ]
    },
    {
      Name: "Cardio Blast",
      Description: "High intensity cardio workout.",
      DurationMinutes: 25,
      Exercises: [
        { ExerciseName: "Jumping Jacks", Sets: 5, TimeSeconds: 30, RestSeconds: 15 },
        { ExerciseName: "Mountain Climbers", Sets: 4, TimeSeconds: 40, RestSeconds: 20 },
        { ExerciseName: "Burpees", Sets: 3, Reps: 10, RestSeconds: 45 },
        { ExerciseName: "Jump Rope", Sets: 5, TimeSeconds: 60, RestSeconds: 30 }
      ]
    },
    {
      Name: "Glute Strength",
      Description: "Targeted exercises for glute muscles.",
      DurationMinutes: 30,
      Exercises: [
        { ExerciseName: "Glute Bridge", Sets: 4, Reps: 15, RestSeconds: 45 },
        { ExerciseName: "Hip Thrust", Sets: 4, Reps: 12, RestSeconds: 60 },
        { ExerciseName: "Side Leg Raises", Sets: 3, Reps: 20, RestSeconds: 30 },
        { ExerciseName: "Pistol Squat", Sets: 3, Reps: 8, RestSeconds: 90 }
      ]
    },
    {
      Name: "Back and Biceps",
      Description: "Strengthen your back and biceps muscles.",
      DurationMinutes: 40,
      Exercises: [
        { ExerciseName: "Dumbbell Rows", Sets: 4, Reps: 10, RestSeconds: 60 },
        { ExerciseName: "Lat Pulldown", Sets: 4, Reps: 12, RestSeconds: 60 },
        { ExerciseName: "Hammer Curls", Sets: 3, Reps: 12, RestSeconds: 45 },
        { ExerciseName: "Cable Bicep Curl", Sets: 3, Reps: 15, RestSeconds: 45 }
      ]
    },
    {
      Name: "Shoulder Stability",
      Description: "Focus on shoulder strength and stability.",
      DurationMinutes: 30,
      Exercises: [
        { ExerciseName: "Overhead Press", Sets: 3, Reps: 10, RestSeconds: 60 },
        { ExerciseName: "Cable Lateral Raise", Sets: 3, Reps: 15, RestSeconds: 45 },
        { ExerciseName: "Face Pulls", Sets: 3, Reps: 12, RestSeconds: 45 },
        { ExerciseName: "Side Plank", Sets: 3, TimeSeconds: 30, RestSeconds: 30 }
      ]
    },
    {
      Name: "Triceps Focus",
      Description: "Isolated triceps strengthening workout.",
      DurationMinutes: 25,
      Exercises: [
        { ExerciseName: "Tricep Dips", Sets: 3, Reps: 15, RestSeconds: 45 },
        { ExerciseName: "Tricep Kickbacks", Sets: 3, Reps: 15, RestSeconds: 45 },
        { ExerciseName: "Cable Crunch", Sets: 4, Reps: 20, RestSeconds: 30 },
        { ExerciseName: "Plank", Sets: 3, TimeSeconds: 45, RestSeconds: 30 }
      ]
    },
    {
      Name: "Advanced Power",
      Description: "Power and plyometric workout for advanced athletes.",
      DurationMinutes: 45,
      Exercises: [
        { ExerciseName: "Deadlift", Sets: 4, Reps: 6, RestSeconds: 120 },
        { ExerciseName: "Box Jump", Sets: 4, Reps: 10, RestSeconds: 90 },
        { ExerciseName: "Kettlebell Swings", Sets: 4, Reps: 15, RestSeconds: 60 },
        { ExerciseName: "Medicine Ball Slams", Sets: 4, Reps: 12, RestSeconds: 60 }
      ]
    }
  ];
module.exports = { workoutList };  