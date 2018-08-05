#include <iostream>
#include <vector>
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

};

class Scenario {
    
    public:
        vector<Person> passengers;
        vector<Person> pedestrians;
        bool pedsInLane;
        bool legalCrossing;
        bool youInCar;

        Scenario(vector<Person> passengers, vector<Person> pedestrians,
                 bool pedsInLane, bool legalCrossing, bool youInCar);
};

string decide(Scenario scenario);
int getSeed(int argc, char** argv);
void runSimulation(int seed);