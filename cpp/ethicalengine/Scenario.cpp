#include <iostream>
#include <vector>
using namespace std;

class Scenario {
    
    // Scenario model
    
    private:
        vector<Person> passengers = [];
        vector<Person> pedestrians = [];
        bool legalCrossing;
        bool pedsInLane;
    
    public:
        Scenario(vector<Person> passengers, vector<Person> pedestrians,
                        bool legalCrossing, bool pedsInLane) {
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
        
        @Override
        string toString() {
            string readable = "Scenario Overview";
            readable += "\n-----------------";
            readable += "\nPeds in Lane: ";
            readable += (this->pedsInLane ? "Yes" : "No");
            readable += "\nLegal Crossing: ";
            readable += (this->legalCrossing ? "Yes" : "No");
            readable += "\nPassengers (";
            readable += this->passengers.length;
            readable += ")";
            for (Person p : this->passengers) {
                readable += "\n- ";
                readable += p;
            }
            readable += "\nPedestrians (";
            readable += this->pedestrians.length;
            readable += ")";
            for (Person p : this->pedestrians) {
                readable += "\n- ";
                readable += p;
            }
            return readable;
        }
        
        // Generate scenarios
        
        static int MIN_PASSENGERS = 0;
        static int MAX_PASSENGERS = 4;
        static int MIN_PEDESTRIANS = 1;
        static int MAX_PEDESTRIANS = 4;
        
        static vector<bool> YOU_CHANCE = [true, false, false, false];
        static vector<bool> LEGAL_CROSSING_CHANCE = [true, true, false];
        static vector<bool> PEDS_IN_LANE_CHANCE = [true, false];
        static vector<bool> SAME_NUM_CHANCE = [true, false];
        
        // TODO: Allow more control over how random scenarios are generated
        
        static Scenario getRandomScenario() {
            int numPedestrians = randomIntBetween(MIN_PEDESTRIANS, MAX_PEDESTRIANS);
            int numPassengers;
            // Check if scenario should have same number of passengers as pedestrians
            bool sameNum = randomBoolean(SAME_NUM_CHANCE);
            if (!sameNum) {
                numPassengers = randomIntBetween(MIN_PASSENGERS, MAX_PASSENGERS);
            } else {
                numPassengers = numPedestrians;
            }
            // Generate passengers
            vector<Person> passengers = getRandomPersonArray(numPassengers);
            // Determine if you are in the car
            bool youInCar = randomBoolean(YOU_CHANCE);
            if (youInCar) {
                // If you are in the car, set a passenger to be you
                int randomIndex = rand(numPassengers - 1);
                passengers[randomIndex].setAsYou(true);
            }
            // Generate pedestrians
            vector<Person> pedestrians = getRandomPersonArray(numPedestrians);
            // Determine other scenario settings
            bool legalCrossing = randomBoolean(LEGAL_CROSSING_CHANCE);
            bool pedsInLane = randomBoolean(PEDS_IN_LANE_CHANCE);
            Scenario scenario(passengers, pedestrians, legalCrossing, pedsInLane);
            return scenario;
                
        }
        
        static vector<Person> getRandomPersonArray(int num) {
            vector<Person> array(num);
            for (int i = 0; i < num; i++) {
                array[i] = Person::getRandomPerson();
            }
            return array;
        }
        
        static void setSeed(int seed) {
            srand(seed);
        }
        
        static bool randomBoolean(vector<bool> array) {
            int index = rand(array.size() - 1);
            return array[index];
        }
        
        static string randomString(vector<string> array) {
            int index = rand(array.size() - 1);
            return array[index];
        }
        
        static int randomIntBetween(int min, int max) {
            int diff = rand((max - min));
            return min + diff;
        }
    
}