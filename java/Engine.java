public class Engine {
    
    public Decision decide(Scenario scenario) {
        int numPassengers = scenario.getPassengers().length;
        int numPedestrians = scenario.getPedestrians().length;
        if (numPassengers > numPedestrians) {
            return Decision.PASSENGERS;
        } else {
            return Decision.PEDESTRIANS;
        }
    }
    
}