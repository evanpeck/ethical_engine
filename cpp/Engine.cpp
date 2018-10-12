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
 * @param Person passenger: the car passenger
 * @param Person pedestrian: the nearby pedestrian
 * @param bool hasPeds: whether or not the pedestrians are in the crossing lane
 * @param bool isLegal: Whether or not the people are crossing legally
 * @param bool hasYou: whether or not you are in the car
 * @return string: either "passenger" or "pedestrian" depending on who you choose to save
 */
string decide(Person passenger, Person pedestrian, bool hasPeds, bool isLegal, bool hasYou) {
    if (passenger.isPregnant()) {
        return "passenger";
    }
    return "pedestrian";
}
