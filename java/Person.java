public class Person {
    
    public static String[] CHAR_TYPES = {"human", "human", "human", "animal", "human"};
    public static String[] ANIMAL_TYPES = {"cat", "dog"};
    public static String[] AGE_TYPES = {"baby", "child", "adult", "adult", "adult", "elderly"};
    public static String[] PROF_TYPES = {"doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"};
    public static String[] GENDER_TYPES = {"male", "female"};
    public static boolean[] PREGNANT_CHANCE = {true, false, false, false};
    public static String[] BODYWEIGHT_CHANCE = {"overweight", "athletic", "average", "average"};

    private String charType;
    private String profession;
    private String age;
    private String gender;
    private String bodyType;
    private boolean pregnant;

    public Person() {
        String charKind = Scenario.randomString(CHAR_TYPES);
        if (charKind.equals("animal")) {
            this.charType = Scenario.randomString(ANIMAL_TYPES);
        } else {
            this.age = Scenario.randomString(AGE_TYPES);
            this.gender = Scenario.randomString(GENDER_TYPES);
            if (this.age.equals("adult")) {
                this.bodyType = Scenario.randomString(BODYWEIGHT_CHANCE);
                if (this.gender.equals("female")) {
                    this.pregnant = Scenario.randomBoolean(PREGNANT_CHANCE);
                }
                this.profession = Scenario.randomString(PROF_TYPES);
            }
        }
    }
    
}