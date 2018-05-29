import ethicalengine.*;

/**
 * Ethical Decision Engine
 * @author: YOUR NAME
 */
public class EthicalEngine extends Engine {

    /**
     * Decides whether to save the passengers or the pedestrians
     * @param Scenario scenario: the ethical dilemma
     * @return Decision: which group to save
     */
    public Decision decide(Scenario scenario) {
        // TODO: Implement your own decision engine!
        int numPassengers = scenario.getPassengers().length;
        int numPedestrians = scenario.getPedestrians().length;
        if (numPassengers > numPedestrians) {
            return Decision.PASSENGERS;
        } else {
            return Decision.PEDESTRIANS;
        }
    }

}