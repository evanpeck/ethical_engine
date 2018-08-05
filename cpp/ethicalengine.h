#include <iostream>
using namespace std;

class Person {

    public:
        string charType;
        string ageGroup;
        string gender;
        string bodyType;
        string profession;
        bool isPregnant;
        bool isYou;

        Person(string charType, string ageGroup, string gender, string bodyType,
               string profession, bool isPregnant, bool isYou);

        string toString();

};

string decide(Person passenger, Person pedestrian, bool pedsInLane, bool legalCrossing);
int getSeed(int argc, char** argv);
void runSimulation(int seed);