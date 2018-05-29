import java.util.Scanner;

public class Main {
    
    public static void main(String[] args) {
        int seed = 42;
        if (args.length >= 1) {
            seed = Integer.parseInt(args[0]);
        }
        runSimulation(seed);
    }
    
    public static void runSimulation(int seed) {
        Scenario.setSeed(seed);
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            Scenario scene = new Scenario();
            System.out.println(scene);
            String result = decide(scene);
            System.out.print("Hit any key to see decision: ");
            scanner.nextLine();
            System.out.println("I chose to save the " + result);
            System.out.print("Hit 'q' to quit or 'enter' to continue: ");
            String response = scanner.nextLine();
            if (response.toLowerCase().equals('q')) {
                break;
            }
        }
        System.out.println("Done.");
    }
    
}