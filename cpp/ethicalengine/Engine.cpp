#include <iostream>
using namespace std;

enum Decision {PASSENGERS="passengers", PEDESTRIANS="pedestrians"};

class Engine {
    
    public:
        virtual Decision decide(Scenario scenario);
    
}