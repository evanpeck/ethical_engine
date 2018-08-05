#include <iostream>
#include "ethicalengine.h"
using namespace std;

int main(int argc, char** argv) {
    int seed = getSeed(argc, argv);
    runSimulation(seed);
    return 0;
}

string decide(Person passenger, Person pedestrian, bool pedsInLane, bool legalCrossing) {
    if (passenger.isPregnant) {
        if (pedestrian.isPregnant) {
            cout << "ped is preg" << endl;
        }
        return "passenger";
    }
    return "pedestrian";
}
