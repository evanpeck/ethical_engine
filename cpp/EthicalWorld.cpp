#include <iostream>
#include <vector>
#include "ethicalengine.h"
using namespace std;

// const vector<string> CHAR_TYPES = {"human", "human", "human", "animal", "human"};
// const vector<string> ANIMAL_TYPES = {"cat", "dog"};
// const vector<string> AGE_TYPES = {"baby", "child", "adult", "adult", "adult", "elderly"};
// const vector<string> PROF_TYPES = {"doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"};
// const vector<string> GENDER_TYPES = {"male", "female"};
// const vector<string> BODYWEIGHT_CHANCE = {"overweight", "athletic", "average", "average"};
// const vector<bool> PREGNANT_CHANCE = {true, false, false, false};
        
// const int MIN_PASSENGERS = 0;
// const int MAX_PASSENGERS = 4;
// const int MIN_PEDESTRIANS = 1;
// const int MAX_PEDESTRIANS = 4;

// const vector<bool> YOU_CHANCE = {true, false, false, false};
// const vector<bool> LEGAL_CROSSING_CHANCE = {true, true, false};
// const vector<bool> PEDS_IN_LANE_CHANCE = {true, false};
// const vector<bool> SAME_NUM_CHANCE = {true, false};

Person::Person(string charType, string ageGroup, string gender, string bodyType,
       string profession, bool isPregnant, bool isYou) {
    this->charType = charType;
    if (charType == "human") {
        this->ageGroup = ageGroup;
        this->gender = gender;
        this->bodyType = bodyType;
        this->profession = profession;
        if (gender == "female") {
            this->isPregnant = isPregnant;
        }
        this->isYou = isYou;
    }
}

string Person::toString() {
    string readable = this->charType;
    if (this->charType == "human") {
        readable = "[";
        if (this->bodyType != "") {
            readable += this->bodyType;
            readable += " ";
        }
        if (this->ageGroup != "") {
            readable += this->ageGroup;
        }
        if (this->gender != "") {
            readable += " ";
            readable += this->gender;
            readable += "]";
        }
        if (this->profession != "") {
            readable += " job: ";
            readable += this->profession;
        }
        if (this->isPregnant) {
            readable += ", pregnant";
        }
    }
    if (this->isYou) {
        readable = "YOU ";
        readable += readable;
    }
    return readable;
}

string showScenarioOverview(Person passenger, Person pedestrian, bool pedsInLane, bool legalCrossing) {
    string readable = "Scenario Overview";
    readable += "\n-----------------";
    readable += "\nPeds in Lane: ";
    readable += (pedsInLane ? "Yes" : "No");
    readable += "\nLegal Crossing: ";
    readable += (legalCrossing ? "Yes" : "No");
    readable += "\nPassengers (1)\n";
    readable += "- " + passenger.toString();
    readable += "\nPedestrians (1)\n";
    readable += "- " + pedestrian.toString();
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
        Person pedestrian("human", "adult", "female", "average", "doctor", true, false);
        Person passenger("human", "adult", "male", "average", "doctor", false, false);
        bool pedsInLane = true;
        bool legalCrossing = true;
        string scenario = showScenarioOverview(pedestrian, passenger, pedsInLane, legalCrossing);
        cout << scenario << endl;
        string result = decide(pedestrian, passenger, pedsInLane, legalCrossing);
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
