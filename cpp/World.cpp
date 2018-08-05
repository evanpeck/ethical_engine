#include <iostream>
#include <vector>
#include "ethicalengine.h"
using namespace std;

const vector<string> CHAR_TYPES = {"human", "human", "human", "animal", "human"};
const vector<string> ANIMAL_TYPES = {"cat", "dog"};
const vector<string> AGE_TYPES = {"baby", "child", "adult", "adult", "adult", "elderly"};
const vector<string> PROF_TYPES = {"doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"};
const vector<string> BODYWEIGHT_CHANCE = {"overweight", "athletic", "average", "average"};
const vector<string> GENDER_TYPES = {"male", "female"};
const vector<bool> PREGNANT_CHANCE = {true, false, false, false};
        
const int MIN_PASSENGERS = 0;
const int MAX_PASSENGERS = 4;
const int MIN_PEDESTRIANS = 1;
const int MAX_PEDESTRIANS = 4;

const vector<bool> YOU_CHANCE = {true, false, false, false};
const vector<bool> LEGAL_CROSSING_CHANCE = {true, true, false};
const vector<bool> PEDS_IN_LANE_CHANCE = {true, false};
const vector<bool> SAME_NUM_CHANCE = {true, false};

string getRandomString(vector<string> choices) {
    int index = rand() % choices.size();
    return choices[index];
}

bool getRandomBool(vector<bool> choices) {
    int index = rand() % choices.size();
    return choices[index];
}

Person getRandomPerson(bool mustBeHuman, bool isYou) {
    string charType = getRandomString(CHAR_TYPES);
    string ageGroup = "";
    string gender = "";
    string bodyType = "";
    string profession = "";
    bool isPregnant = false;
    if (mustBeHuman) {
        charType = "human";
    }
    if (charType == "human") {
        ageGroup = getRandomString(AGE_TYPES);
        gender = getRandomString(GENDER_TYPES);
        bodyType = getRandomString(BODYWEIGHT_CHANCE);
        if (ageGroup == "adult") {
            profession = getRandomString(PROF_TYPES);
            if (gender == "female") {
                isPregnant = getRandomBool(PREGNANT_CHANCE);
            }
        }
    } else {
        charType = getRandomString(ANIMAL_TYPES);
    }
    Person person(charType, ageGroup, gender, bodyType, profession, isPregnant, isYou);
    return person;
}

Person::Person(string charType, string ageGroup, string gender, string bodyType,
               string profession, bool isPregnant, bool isYou) {
    this->charType = charType;
    this->ageGroup = ageGroup;
    this->gender = gender;
    this->bodyType = bodyType;
    this->profession = profession;
    this->isPregnant = isPregnant;
    this->isYou = isYou;
}

void showPersonAttributes(Person person) {
    cout << "\n" << endl;
    cout << "charType = " << person.charType << endl;
    cout << "ageGroup = " << person.ageGroup << endl;
    cout << "gender = " << person.gender << endl;
    cout << "bodyType = " << person.bodyType << endl;
    cout << "profession = " << person.profession << endl;
    cout << "isPregnant = " << person.isPregnant << endl;
    cout << "isYou = " << person.isYou << endl;
    cout << "\n" << endl;
}

string personToString(Person p) {
    string readable = p.charType;
    if (p.charType == "human") {
        readable = "[";
        if (p.bodyType != "") {
            readable += p.bodyType;
            readable += " ";
        }
        if (p.ageGroup != "") {
            readable += p.ageGroup;
        }
        if (p.gender != "") {
            readable += " ";
            readable += p.gender;
        }
        readable += "]";
        if (p.profession != "") {
            readable += " job: ";
            readable += p.profession;
        }
        if (p.isPregnant) {
            readable += ", pregnant";
        }
    }
    if (p.isYou) {
        string info = readable;
        readable = "YOU " + info;
    }
    return readable;
}

Scenario::Scenario(vector<Person> passengers, vector<Person> pedestrians,
                   bool pedsInLane, bool legalCrossing, bool youInCar) {
    this->passengers = passengers;
    this->pedestrians = pedestrians;
    this->pedsInLane = pedsInLane;
    this->legalCrossing = legalCrossing;
    this->youInCar = youInCar;
}

string showScenarioOverview(Scenario scenario) {
    string readable = "Scenario Overview";
    readable += "\n-----------------";
    readable += "\nPeds in Lane: ";
    readable += (scenario.pedsInLane ? "Yes" : "No");
    readable += "\nLegal Crossing: ";
    readable += (scenario.legalCrossing ? "Yes" : "No");
    readable += "\nPassengers (1)";
    for (Person p : scenario.passengers) {
        readable += "\n- " + personToString(p);
    }
    readable += "\nPedestrians (1)";
    for (Person p : scenario.pedestrians) {
        readable += "\n- " + personToString(p);
    }
    return readable;
}

int getSeed(int argc, char** argv) {
    int seed = 42;
    if (argc >= 2) {
        seed = stoi(argv[1]);
    }
    return seed;
}

void runSimulation(int seed) {
    srand(seed);
    while (true) {
        bool youInCar = getRandomBool(YOU_CHANCE);
        Person passenger = getRandomPerson(true, youInCar);
        Person pedestrian = getRandomPerson(false, false);
        bool pedsInLane = getRandomBool(PEDS_IN_LANE_CHANCE);
        bool legalCrossing = getRandomBool(LEGAL_CROSSING_CHANCE);
        Scenario scenario({passenger}, {pedestrian}, pedsInLane, legalCrossing, youInCar);
        string details = showScenarioOverview(scenario);
        // showPersonAttributes(passenger);
        // showPersonAttributes(pedestrian);
        cout << details << endl;
        string result = decide(scenario);
        cout << "Hit any key to see decision: " << endl;
        string line;
        getline(cin, line);
        cout << "I chose to save the " << result << endl;
        cout << "Hit 'q' to quit or 'enter' to continue: " << endl;
        getline(cin, line);
        if (line == "q") {
            break;
        }
    }
    cout << "Done." << endl;
}
