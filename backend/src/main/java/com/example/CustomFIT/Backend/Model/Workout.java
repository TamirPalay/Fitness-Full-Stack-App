package com.example.CustomFIT.Backend.model;

import java.util.List;

public class Workout {
    private Long id;
    private String name;
    private String description;
    private String type; // PRESET or CUSTOM
    private String difficulty; // Beginner, Intermediate, Advanced
    private int estimatedMinutes;
    private List<WorkoutExercise> exercises;

    public Workout() {}

    public Workout(Long id, String name, String description, String type,
                   String difficulty, int estimatedMinutes, List<WorkoutExercise> exercises) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.difficulty = difficulty;
        this.estimatedMinutes = estimatedMinutes;
        this.exercises = exercises;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }

    public List<WorkoutExercise> getExercises() { return exercises; }
    public void setExercises(List<WorkoutExercise> exercises) { this.exercises = exercises; }
}