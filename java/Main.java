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
        Engine engine = new Engine();
        Scenario.setSeed(seed);
        Scanner scanner = new Scanner(System.in);
        while (true) {
            Scenario scene = new Scenario();
            System.out.println(scene);
            Decision result = engine.decide(scene);
            System.out.print("Hit any key to see decision: ");
            scanner.nextLine();
            System.out.println("I chose to save the " + result);
            System.out.print("Hit 'q' to quit or 'enter' to continue: ");
            String response = scanner.nextLine();
            if (response.equals("q")) {
                break;
            }
        }
        System.out.println("Done.");
    }
    
}