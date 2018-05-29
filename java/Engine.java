public class Engine {
    
    public Decision decide(Scenario scenario) {
        int numPassengers = scenario.passengers.length;
        int numPedestrians = scenario.pedestrians.length;
        if (numPassengers > numPedestrians) {
            return Decision.PASSENGERS;
        } else {
            return Decision.PEDESTRIANS;
        }
    }
    
}