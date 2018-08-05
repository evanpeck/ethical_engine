#include <iostream>
#include "ethicalengine.h"
using namespace std;

int main(int argc, char** argv) {
    int seed = getSeed(argc, argv);
    runSimulation(seed);
    return 0;
}

/**
 * Decides whether to save the passenger or the pedestrian
 * @param passenger: the passenger in the car
 * @param pedestrian: the pedestrian near the car
 * @param pedsInLane: whether or not the pedestrian is in the crossing lane
 * @param legalCrossing: whether or not the pedestrian is crossing legally
 * @return string: either "passenger" or "pedestrian" depending on which group to save
 */
string decide(Person passenger, Person pedestrian, bool pedsInLane, bool legalCrossing) {
    if (passenger.isPregnant) {
        return "passenger";
    }
    return "pedestrian";
}
