package com.example.CustomFIT.Backend.model;

public class WorkoutExercise {
    private Exercise exercise;
    private int sets;
    private int reps;
    private String notes;

    public WorkoutExercise() {}

    public WorkoutExercise(Exercise exercise, int sets, int reps) {
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
    }

    public Exercise getExercise() { return exercise; }
    public void setExercise(Exercise exercise) { this.exercise = exercise; }

    public int getSets() { return sets; }
    public void setSets(int sets) { this.sets = sets; }

    public int getReps() { return reps; }
    public void setReps(int reps) { this.reps = reps; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}