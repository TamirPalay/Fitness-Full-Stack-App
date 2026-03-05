package com.example.CustomFIT.Backend.controller;

import com.example.CustomFIT.Backend.model.Exercise;
import com.example.CustomFIT.Backend.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final WorkoutService workoutService;

    public ExerciseController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<Exercise> getExercises(
            @RequestParam(required = false) String bodyPart,
            @RequestParam(required = false) String equipment) {
        return workoutService.getExercises(bodyPart, equipment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exercise> getExercise(@PathVariable Long id) {
        return workoutService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/body-parts")
    public List<String> getBodyParts() {
        return workoutService.getBodyParts();
    }

    @GetMapping("/equipment")
    public List<String> getEquipment() {
        return workoutService.getEquipmentList();
    }
}
