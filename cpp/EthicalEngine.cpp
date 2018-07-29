#include <iostream>
using namespace std;

/**
 * Ethical Decision Engine
 * @author: YOUR NAME
 */
class EthicalEngine: public Engine {

    public:
        Decision decide(Scenario scenario);

}

/**
 * Decides whether to save the passengers or the pedestrians
 * @param Scenario scenario: the ethical dilemma
 * @return Decision: which group to save
 */
EthicalEngine::Decision decide(Scenario& scenario) {
    // TODO: Implement your own decision engine!
    int numPassengers = scenario.getPassengers().size();
    int numPedestrians = scenario.getPedestrians().size();
    if (numPassengers > numPedestrians) {
        return PASSENGERS;
    } else {
        return PEDESTRIANS;
    }
}