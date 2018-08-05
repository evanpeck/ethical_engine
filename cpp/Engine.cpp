#include <iostream>
#include "ethicalengine.h"
using namespace std;

int main(int argc, char** argv) {
    int seed = getSeed(argc, argv);
    runSimulation(seed);
    return 0;
}

/**
 * Decides whether to save the passengers or the pedestrians
 * @param Scenario scenario: the ethical dilemma
 * @return string: either "passengers" or "pedestrians" depending on which group to save
 */
string decide(Scenario scenario) {
    Person passenger = scenario.getPassengers()[0];
    Person pedestrian = scenario.getPedestrians()[0];
    if (passenger.isPregnant()) {
        return "passengers";
    }
    return "pedestrians";
}
