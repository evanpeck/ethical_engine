package ethicalengine;

import java.util.Random;

public class Scenario {
    
    // Scenario model
    
    private Person[] passengers = {};
    private Person[] pedestrians = {};
    private boolean legalCrossing;
    private boolean pedsInLane;
    
    public Scenario(Person[] passengers, Person[] pedestrians,
                    boolean legalCrossing, boolean pedsInLane) {
        this.passengers = passengers;
        this.pedestrians = pedestrians;
        this.legalCrossing = legalCrossing;
        this.pedsInLane = pedsInLane;
    }
    
    public boolean hasYouInCar() {
        for (Person person : this.passengers) {
            if (person.isYou()) {
                return true;
            }
        }
        return false;
    }
    
    public Person[] getPassengers() {
        return this.passengers;
    }
    
    public Person[] getPedestrians() {
        return this.pedestrians;
    }
    
    public boolean isLegalCrossing() {
        return this.legalCrossing;
    }
    
    public boolean hasPedestriansInLane() {
        return this.pedsInLane;
    }
    
    @Override
    public String toString() {
        String readable = "Scenario Overview";
        readable += "\n-----------------";
        readable += "\nPeds in Lane: " + (this.pedsInLane ? "Yes" : "No");
        readable += "\nLegal Crossing: " + (this.legalCrossing ? "Yes" : "No");
        readable += String.format("\nPassengers (%d)", this.passengers.length);
        for (Person p : this.passengers) {
            readable += "\n- " + p;
        }
        readable += String.format("\nPedestrians (%d)", this.pedestrians.length);
        for (Person p : this.pedestrians) {
            readable += "\n- " + p;
        }
        return readable;
    }
    
    // Generate scenarios
    
    private static Random random = new Random();
    
    public static int MIN_PASSENGERS = 0;
    public static int MAX_PASSENGERS = 4;
    public static int MIN_PEDESTRIANS = 1;
    public static int MAX_PEDESTRIANS = 4;
    
    public static boolean[] YOU_CHANCE = {true, false, false, false};
    public static boolean[] LEGAL_CROSSING_CHANCE = {true, true, false};
    public static boolean[] PEDS_IN_LANE_CHANCE = {true, false};
    public static boolean[] SAME_NUM_CHANCE = {true, false};
    
    // TODO: Allow more control over how random scenarios are generated
    
    public static Scenario getRandomScenario() {
        int numPedestrians = randomIntBetween(MIN_PEDESTRIANS, MAX_PEDESTRIANS);
        int numPassengers;
        // Check if scenario should have same number of passengers as pedestrians
        boolean sameNum = randomBoolean(SAME_NUM_CHANCE);
        if (!sameNum) {
            numPassengers = randomIntBetween(MIN_PASSENGERS, MAX_PASSENGERS);
        } else {
            numPassengers = numPedestrians;
        }
        // Generate passengers
        Person[] passengers = getRandomPersonArray(numPassengers);
        // Determine if you are in the car
        boolean youInCar = randomBoolean(YOU_CHANCE);
        if (youInCar) {
            // If you are in the car, set a passenger to be you
            int randomIndex = random.nextInt(numPassengers);
            passengers[randomIndex].setAsYou(true);
        }
        // Generate pedestrians
        Person[] pedestrians = getRandomPersonArray(numPedestrians);
        // Determine other scenario settings
        boolean legalCrossing = randomBoolean(LEGAL_CROSSING_CHANCE);
        boolean pedsInLane = randomBoolean(PEDS_IN_LANE_CHANCE);
        return new Scenario(passengers, pedestrians, legalCrossing, pedsInLane);
            
    }
    
    public static Person[] getRandomPersonArray(int num) {
        Person[] array = new Person[num];
        for (int i = 0; i < num; i++) {
            array[i] = Person.getRandomPerson();
        }
        return array;
    }
    
    public static void setSeed(int seed) {
        random.setSeed(seed);
    }
    
    public static boolean randomBoolean(boolean[] array) {
        int index = random.nextInt(array.length);
        return array[index];
    }
    
    public static String randomString(String[] array) {
        int index = random.nextInt(array.length);
        return array[index];
    }
    
    public static int randomIntBetween(int min, int max) {
        int diff = random.nextInt((max - min) + 1);
        return min + diff;
    }
    
}