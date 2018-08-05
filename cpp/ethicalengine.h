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
        bool personIsPregnant;
        bool personIsYou;

        Person(string charType, string ageGroup, string gender, string bodyType,
               string profession, bool isPregnant, bool isYou);

        string getCharacterType();
        string getAgeGroup();
        string getGender();
        string getBodyType();
        string getProfession();
        bool isPregnant();
        bool isYou();

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

        vector<Person> getPassengers();
        vector<Person> getPedestrians();
        bool hasPedestriansInLane();
        bool isLegalCrossing();
        bool hasYouInCar();
};

string decide(Scenario scenario);
int getSeed(int argc, char** argv);
void runSimulation(int seed);