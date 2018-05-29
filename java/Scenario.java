import java.util.Random;

public class Scenario {
    
    private static Random random = new Random();
    
    public static int MIN_PASSENGERS = 0;
    public static int MAX_PASSENGERS = 4;
    public static int MIN_PEDESTRIANS = 1;
    public static int MAX_PEDESTRIANS = 4;
    
    public static boolean[] YOU_CHANGE = {true, false, false, false};
    public static boolean[] LEGAL_CROSSING_CHANCE = {true, true, false};
    public static boolean PEDS_IN_LANE_CHANCE = {true, false};
    
    public Scenario() {
        // numPedestrians = randomIntBetween(MIN_PEDESTRIANS, MAX_PEDESTRIANS);
    }
    
    public static void setSeed(int seed) {
        random.setSeed(seed);
    } 
    
    public static String randomString(String[] array) {
        int index = random.nextInt(array.length);
        return array[index];
    }
    
    public static boolean randomBoolean(boolean[] array) {
        int index = random.nextInt(array.length);
        return array[index];
    }
    
    public static int randomIntBetween(int min, int max) {
        int diff = random.nextInt((max - min) + 1);
        return min + diff;
    }
    
}