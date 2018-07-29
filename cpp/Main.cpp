#include <iostream>
using namespace std;

void runSimulation(int seed) {
    Engine *engine = new EthicalEngine();
    Scenario.setSeed(seed);
    Scanner scanner = new Scanner(System.in);
    while (true) {
        Scenario scene = Scenario.getRandomScenario();
        cout << scene.toString() << endl;
        Decision result = engine.decide(scene);
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
    if (argc >= 1) {
        seed = stoi(argv[0]);
    }
    runSimulation(seed);
    return 0;
}