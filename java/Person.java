public class Person {
    
    // Person model

    private String charType;
    private String profession;
    private String age;
    private String gender;
    private String bodyType;
    private boolean isPregnant;
    private boolean isYou;
    
    public Person(String charType, String profession, String age,
                  String gender, String bodyType, boolean isPregnant,
                  boolean isYou) {
        this.charType = charType;
        this.profession = profession;
        this.age = age;
        this.gender = gender;
        this.bodyType = bodyType;
        this.isPregnant = isPregnant;
        this.isYou = isYou;
    }
    
    // TODO: Add getters and setters
    
    public boolean isYou() {
        return this.isYou;
    }
    
    public void setAsYou(boolean isYou) {
        this.isYou = isYou;
    }
    
    // Generate people
    
    public static String[] CHAR_TYPES = {"human", "human", "human", "animal", "human"};
    public static String[] ANIMAL_TYPES = {"cat", "dog"};
    public static String[] AGE_TYPES = {"baby", "child", "adult", "adult", "adult", "elderly"};
    public static String[] PROF_TYPES = {"doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"};
    public static String[] GENDER_TYPES = {"male", "female"};
    public static boolean[] PREGNANT_CHANCE = {true, false, false, false};
    public static String[] BODYWEIGHT_CHANCE = {"overweight", "athletic", "average", "average"};

    // TODO: Allow more control over how random people are generated
    
    public static Person getRandomPerson() {
        String charType = Scenario.randomString(CHAR_TYPES);
        String profession = null;
        String age = null;
        String gender = null;
        String bodyType = null;
        boolean isPregnant = false;
        boolean isYou = false;
        if (charType.equals("animal")) {
            charType = Scenario.randomString(ANIMAL_TYPES);
        } else {
            age = Scenario.randomString(AGE_TYPES);
            gender = Scenario.randomString(GENDER_TYPES);
            if (age.equals("adult")) {
                bodyType = Scenario.randomString(BODYWEIGHT_CHANCE);
                if (gender.equals("female")) {
                    isPregnant = Scenario.randomBoolean(PREGNANT_CHANCE);
                }
                profession = Scenario.randomString(PROF_TYPES);
            }
        }
        return new Person(charType, profession, age, gender, bodyType, isPregnant, isYou);
    }
    
}