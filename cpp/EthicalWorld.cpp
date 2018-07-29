#include <iostream>
#include <vector>
using namespace std;

const vector<string> CHAR_TYPES = {"human", "human", "human", "animal", "human"};
const vector<string> ANIMAL_TYPES = {"cat", "dog"};
const vector<string> AGE_TYPES = {"baby", "child", "adult", "adult", "adult", "elderly"};
const vector<string> PROF_TYPES = {"doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"};
const vector<string> GENDER_TYPES = {"male", "female"};
const vector<string> BODYWEIGHT_CHANCE = {"overweight", "athletic", "average", "average"};
const vector<bool> PREGNANT_CHANCE = {true, false, false, false};
        
const int MIN_PASSENGERS = 0;
const int MAX_PASSENGERS = 4;
const int MIN_PEDESTRIANS = 1;
const int MAX_PEDESTRIANS = 4;

const vector<bool> YOU_CHANCE = {true, false, false, false};
const vector<bool> LEGAL_CROSSING_CHANCE = {true, true, false};
const vector<bool> PEDS_IN_LANE_CHANCE = {true, false};
const vector<bool> SAME_NUM_CHANCE = {true, false};

class Helper {

    public:
        static void setSeed(int seed) {
            srand(seed);
        }
        
        static bool randomBoolean(vector<bool> boolValues) {
            int index = (rand() % boolValues.size()) - 1;
            return boolValues[index];
        }
        
        static string randomString(vector<string> stringValues) {
            int index = (rand() % stringValues.size()) - 1;
            return stringValues[index];
        }
        
        static int randomIntBetween(int min, int max) {
            int diff = (rand() % max) - min;
            return min + diff;
        }

};

class Person {
    
    // Person model

    private:
        string charType;
        string profession;
        string age;
        string gender;
        string bodyType;
        bool personIsPregnant;
        bool personIsYou;
    
    public:

        Person(string charType, string profession, string age, string gender, string bodyType, bool personIsPregnant, bool personIsYou) {
            this->charType = charType;
            this->profession = profession;
            this->age = age;
            this->gender = gender;
            this->bodyType = bodyType;
            this->personIsPregnant = personIsPregnant;
            this->personIsYou = personIsYou;
        }

        Person() {
            string charType = Helper::randomString(CHAR_TYPES);
            string profession = "";
            string age = "";
            string gender = "";
            string bodyType = "";
            bool isPregnant = false;
            bool isYou = false;
            if (charType == "animal") {
                charType = Helper::randomString(ANIMAL_TYPES);
            } else {
                age = Helper::randomString(AGE_TYPES);
                gender = Helper::randomString(GENDER_TYPES);
                if (age == "adult") {
                    bodyType = Helper::randomString(BODYWEIGHT_CHANCE);
                    if (gender == "female") {
                        isPregnant = Helper::randomBoolean(PREGNANT_CHANCE);
                    }
                    profession = Helper::randomString(PROF_TYPES);
                }
            }
            this->charType = charType;
            this->profession = profession;
            this->age = age; 
            this->gender = gender;
            this->bodyType = bodyType;
            this->personIsPregnant = isPregnant;
            this->personIsYou = isYou;
        }
    
        string getCharacterType() {
            return this->charType;
        }
    
        string getProfession() {
            return this->profession;
        }
    
        string getAgeGroup() {
            return this->age;
        }
    
        string getGender() {
            return this->gender;
        }
    
        string getBodyType() {
            return this->bodyType;
        }
    
        bool isPregnant() {
            return this->personIsPregnant;
        }
    
        bool isYou() {
            return this->personIsYou;
        }
    
        void setAsYou(bool personIsYou) {
            this->personIsYou = personIsYou;
        }
    
        string toString() {
            string readable = this->charType;
            if (this->charType == "human") {
                readable = "[";
                if (this->bodyType != "") {
                    readable += this->bodyType;
                    readable += " ";
                }
                if (this->age != "") {
                    readable += this->age;
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
                if (this->personIsPregnant) {
                    readable += ", pregnant";
                }
            }
            if (this->personIsYou) {
                readable = "YOU ";
                readable += readable;
            }
            return readable;
        }
        
        // Generate people

        // TODO: Allow more control over how random people are generated
        
        // Person getRandomPerson() {
        //     string charType = Helper::randomString(CHAR_TYPES);
        //     string profession = "";
        //     string age = "";
        //     string gender = "";
        //     string bodyType = "";
        //     bool isPregnant = false;
        //     bool isYou = false;
        //     if (charType == "animal") {
        //         charType = Helper::randomString(ANIMAL_TYPES);
        //     } else {
        //         age = Helper::randomString(AGE_TYPES);
        //         gender = Helper::randomString(GENDER_TYPES);
        //         if (age == "adult") {
        //             bodyType = Helper::randomString(BODYWEIGHT_CHANCE);
        //             if (gender == "female") {
        //                 isPregnant = Helper::randomBoolean(PREGNANT_CHANCE);
        //             }
        //             profession = Helper::randomString(PROF_TYPES);
        //         }
        //     }
        //     Person person(charType, profession, age, gender, bodyType, isPregnant, isYou);
        //     return person;
        // }
    
};

// Person getRandomPerson() {
//     // string charType = Helper::randomString(CHAR_TYPES);
//     // string profession = "";
//     // string age = "";
//     // string gender = "";
//     // string bodyType = "";
//     // bool isPregnant = false;
//     // bool isYou = false;
//     // if (charType == "animal") {
//     //     charType = Helper::randomString(ANIMAL_TYPES);
//     // } else {
//     //     age = Helper::randomString(AGE_TYPES);
//     //     gender = Helper::randomString(GENDER_TYPES);
//     //     if (age == "adult") {
//     //         bodyType = Helper::randomString(BODYWEIGHT_CHANCE);
//     //         if (gender == "female") {
//     //             isPregnant = Helper::randomBoolean(PREGNANT_CHANCE);
//     //         }
//     //         profession = Helper::randomString(PROF_TYPES);
//     //     }
//     // }
//     // Person *person = Person(charType, profession, age, gender, bodyType, isPregnant, isYou);
//     // return person;
// }

class Scenario {
    
    // Scenario model
    
    private:
        vector<Person> passengers;
        vector<Person> pedestrians;
        bool legalCrossing;
        bool pedsInLane;
    
    public:
        Scenario(vector<Person> passengers, vector<Person> pedestrians, bool legalCrossing, bool pedsInLane) {
            this->passengers = passengers;
            this->pedestrians = pedestrians;
            this->legalCrossing = legalCrossing;
            this->pedsInLane = pedsInLane;
        }
        
        bool hasYouInCar() {
            for (Person person : this->passengers) {
                if (person.isYou()) {
                    return true;
                }
            }
            return false;
        }
        
        vector<Person> getPassengers() {
            return this->passengers;
        }
        
        vector<Person> getPedestrians() {
            return this->pedestrians;
        }
        
        bool isLegalCrossing() {
            return this->legalCrossing;
        }
        
        bool hasPedestriansInLane() {
            return this->pedsInLane;
        }
        
        string toString() {
            string readable = "Scenario Overview";
            readable += "\n-----------------";
            readable += "\nPeds in Lane: ";
            readable += (this->pedsInLane ? "Yes" : "No");
            readable += "\nLegal Crossing: ";
            readable += (this->legalCrossing ? "Yes" : "No");
            readable += "\nPassengers (";
            readable += this->passengers.size();
            readable += ")";
            for (Person p : this->passengers) {
                readable += "\n- ";
                readable += p.toString();
            }
            readable += "\nPedestrians (";
            readable += this->pedestrians.size();
            readable += ")";
            for (Person p : this->pedestrians) {
                readable += "\n- ";
                readable += p.toString();
            }
            return readable;
        }
        
        // Generate scenarios
        
        // TODO: Allow more control over how random scenarios are generated
        
        // Scenario getRandomScenario() {
        //     int numPedestrians = Helper::randomIntBetween(MIN_PEDESTRIANS, MAX_PEDESTRIANS);
        //     int numPassengers;
        //     // Check if scenario should have same number of passengers as pedestrians
        //     bool sameNum = Helper::randomBoolean(SAME_NUM_CHANCE);
        //     if (!sameNum) {
        //         numPassengers = Helper::randomIntBetween(MIN_PASSENGERS, MAX_PASSENGERS);
        //     } else {
        //         numPassengers = numPedestrians;
        //     }
        //     // Generate passengers
        //     vector<Person> passengers = getRandomPersonArray(numPassengers);
        //     // Determine if you are in the car
        //     bool youInCar = Helper::randomBoolean(YOU_CHANCE);
        //     if (youInCar) {
        //         // If you are in the car, set a passenger to be you
        //         int randomIndex = (rand() % numPassengers) - 1;
        //         passengers[randomIndex].setAsYou(true);
        //     }
        //     // Generate pedestrians
        //     vector<Person> pedestrians = getRandomPersonArray(numPedestrians);
        //     // Determine other scenario settings
        //     bool legalCrossing = Helper::randomBoolean(LEGAL_CROSSING_CHANCE);
        //     bool pedsInLane = Helper::randomBoolean(PEDS_IN_LANE_CHANCE);
        //     Scenario scenario(passengers, pedestrians, legalCrossing, pedsInLane);
        //     return scenario;       
        // }
        
        // vector<Person> getRandomPersonArray(int num) {
        //     // Person *p = new Person();
        //     vector<Person> persons(num);
        //     for (int i = 0; i < num; i++) {
        //         persons[i] = getRandomPerson();
        //     }
        //     return persons;
        // }
    
};

vector<Person> getRandomPersonArray(int num) {
    // Person *p = new Person();
    vector<Person> persons(num);
    for (int i = 0; i < num; i++) {
        // persons[i] = getRandomPerson();
        Person *person = new Person();
        persons[i] = *person;
    }
    return persons;
}

Scenario getRandomScenario() {
    int numPedestrians = Helper::randomIntBetween(MIN_PEDESTRIANS, MAX_PEDESTRIANS);
    int numPassengers;
    // Check if scenario should have same number of passengers as pedestrians
    bool sameNum = Helper::randomBoolean(SAME_NUM_CHANCE);
    if (!sameNum) {
        numPassengers = Helper::randomIntBetween(MIN_PASSENGERS, MAX_PASSENGERS);
    } else {
        numPassengers = numPedestrians;
    }
    // Generate passengers
    vector<Person> passengers = getRandomPersonArray(numPassengers);
    // Determine if you are in the car
    bool youInCar = Helper::randomBoolean(YOU_CHANCE);
    if (youInCar) {
        // If you are in the car, set a passenger to be you
        int randomIndex = (rand() % numPassengers) - 1;
        passengers[randomIndex].setAsYou(true);
    }
    // Generate pedestrians
    vector<Person> pedestrians = getRandomPersonArray(numPedestrians);
    // Determine other scenario settings
    bool legalCrossing = Helper::randomBoolean(LEGAL_CROSSING_CHANCE);
    bool pedsInLane = Helper::randomBoolean(PEDS_IN_LANE_CHANCE);
    Scenario scenario(passengers, pedestrians, legalCrossing, pedsInLane);
    return scenario;       
}

enum Decision {PASSENGERS, PEDESTRIANS};

/**
 * Decides whether to save the passengers or the pedestrians
 * @param Scenario scenario: the ethical dilemma
 * @return Decision: which group to save
 */
Decision decide(Scenario scenario) {
    // TODO: Implement your own decision engine!
    int numPassengers = scenario.getPassengers().size();
    int numPedestrians = scenario.getPedestrians().size();
    if (numPassengers > numPedestrians) {
        return Decision::PASSENGERS;
    } else {
        return Decision::PEDESTRIANS;
    }
}

void runSimulation(int seed) {
    Helper::setSeed(seed);
    while (true) {
        Scenario scene = getRandomScenario();
        cout << scene.toString() << endl;
        Decision result = decide(scene);
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

int main(int argc, char** argv) {
    int seed = 42;
    // if (argc >= 1) {
    //     seed = stoi(argv[1]);
    // }
    runSimulation(seed);
    return 0;
}