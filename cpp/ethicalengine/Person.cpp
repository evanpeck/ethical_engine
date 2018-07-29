#include <iostream>
#include <vector>
using namespace std;

class Person {
    
    // Person model

    private:
        string charType;
        string profession;
        string age;
        string gender;
        string bodyType;
        bool isPregnant;
        bool isYou;
    
    public:

        Person(string charType, string profession, string age,
                  string gender, string bodyType, bool isPregnant,
                  bool isYou) {
            this->charType = charType;
            this->profession = profession;
            this->age = age;
            this->gender = gender;
            this->bodyType = bodyType;
            this->isPregnant = isPregnant;
            this->isYou = isYou;
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
            return this->isPregnant;
        }
    
        bool isYou() {
            return this->isYou;
        }
    
        void setAsYou(boolean isYou) {
            this.isYou = isYou;
        }
    
        string toString() {
            string readable = this->charType;
            if (this->charType == "human") {
                readable = "[";
                if (this->bodyType != null) {
                    readable += this.bodyType;
                    readable += " ";
                }
                if (this->age != null) {
                    readable += this->age;
                }
                if (this->gender != null) {
                    readable += " ";
                    readable += this->gender;
                    readable += "]";
                }
                if (this->profession != null) {
                    readable += " job: ";
                    readable += this->profession;
                }
                if (this->isPregnant) {
                    readable += ", pregnant";
                }
            }
            if (this.isYou()) {
                readable = "YOU ";
                readable += readable;
            }
            return readable;
        }
        
        // Generate people
        
        vector<string> CHAR_TYPES = ["human", "human", "human", "animal", "human"];
        vector<string> ANIMAL_TYPES = ["cat", "dog"];
        vector<string> AGE_TYPES = ["baby", "child", "adult", "adult", "adult", "elderly"];
        vector<string> PROF_TYPES = ["doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"];
        vector<string> GENDER_TYPES = ["male", "female"];
        vector<bool> PREGNANT_CHANCE = [true, false, false, false];
        vector<string> BODYWEIGHT_CHANCE = ["overweight", "athletic", "average", "average"];

        // TODO: Allow more control over how random people are generated
        
        Person getRandomPerson() {
            string charType = Scenario::randomString(CHAR_TYPES);
            string profession = null;
            string age = null;
            string gender = null;
            string bodyType = null;
            bool isPregnant = false;
            bool isYou = false;
            if (charType == "animal") {
                charType = Scenario::randomString(ANIMAL_TYPES);
            } else {
                age = Scenario::randomString(AGE_TYPES);
                gender = Scenario::randomString(GENDER_TYPES);
                if (age == "adult") {
                    bodyType = Scenario::randomString(BODYWEIGHT_CHANCE);
                    if (gender == "female") {
                        isPregnant = Scenario::randomBoolean(PREGNANT_CHANCE);
                    }
                    profession = Scenario::randomString(PROF_TYPES);
                }
            }
            Person person(charType, profession, age, gender, bodyType, isPregnant, isYou);
            return person;
        }
    
}