package com.example.CustomFIT.Backend.model;

public class Exercise {
    private Long id;
    private String name;
    private String bodyPart;
    private String equipment;
    private String description;
    private int defaultSets;
    private int defaultReps;
    private String imageUrl;

    public Exercise() {}

    public Exercise(Long id, String name, String bodyPart, String equipment,
                    String description, int defaultSets, int defaultReps) {
        this.id = id;
        this.name = name;
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.description = description;
        this.defaultSets = defaultSets;
        this.defaultReps = defaultReps;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBodyPart() { return bodyPart; }
    public void setBodyPart(String bodyPart) { this.bodyPart = bodyPart; }

    public String getEquipment() { return equipment; }
    public void setEquipment(String equipment) { this.equipment = equipment; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getDefaultSets() { return defaultSets; }
    public void setDefaultSets(int defaultSets) { this.defaultSets = defaultSets; }

    public int getDefaultReps() { return defaultReps; }
    public void setDefaultReps(int defaultReps) { this.defaultReps = defaultReps; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}