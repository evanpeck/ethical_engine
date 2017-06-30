from obf_engine import *
from scenario import *

def runSimulation(machine = False):
    ''' Temporarily putting a main function here to cycle through scenarios'''

    print("===========================================")
    print("THE ETHICAL ENGINE")
    print("===========================================")
    print()

    keepRunning = True
    while keepRunning:
        scene = Scenario(sameNum = False)
        print(scene)
        print()
        result = decide(scene)
        print()
        input('Hit any key to see decision: ')
        print('I choose to save the', result)
        print()

        # For breaking the loop
        response = input("Hit 'q' to quit or 'enter' to continue: ")
        if response == 'q':
            keepRunning = False

    print('Done')



if __name__ == '__main__':
    runSimulation()
