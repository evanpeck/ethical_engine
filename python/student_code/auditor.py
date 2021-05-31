# from obf_engine import decide
# from scenario import Scenario

from engine import decide
from scenario import Scenario

def audit():
    ''' Determines if the ethical engine exhibits any biases towards
    different people groups.

    The audit method should print out two lists of attributes that explain
    how the underlying ethical engine is making decisions.
        - The first list should contain attributes in which the autonomous
        car is biased towards SAVING
        - The second list should contain attributes in which the autonomous
        car is biased towards KILLING
    In both lists, the attributes should be roughly ranked based on the
    severity of the bias. This might not be perfect, but should at least
    detect significant trends.

    To accomplish this, write a program that runs many thousands of scenarios
    (at least 10000) and keep track of the results.
    '''
    # pass

    liveProfession = []
    livePregnant = []
    liveGender = []
    liveCharType = []
    liveAge = []

    dieProfession = []
    diePregnant = []
    dieGender = []
    dieCharType = []
    dieAge = []

    pedestriansSaved = 0
    passengersSaved = 0

    simulations = 0
    while (simulations < 10000):
        scene = Scenario()
        # print(scene)
        # print()
        result = decide(scene)
        if result == "passengers":
            for person in scene.passengers:
                liveProfession.append(person.profession)
                livePregnant.append(person.pregnant)
                liveGender.append(person.gender)
                liveCharType.append(person.charType)
                liveAge.append(person.age)
            for person in scene.pedestrians:
                dieProfession.append(person.profession)
                diePregnant.append(person.pregnant)
                dieGender.append(person.gender)
                dieCharType.append(person.charType)
                dieAge.append(person.age)
            passengersSaved = passengersSaved + len(scene.passengers)
        else:
            for person in scene.pedestrians:
                liveProfession.append(person.profession)
                livePregnant.append(person.pregnant)
                liveGender.append(person.gender)
                liveCharType.append(person.charType)
                liveAge.append(person.age)
            for person in scene.passengers:
                dieProfession.append(person.profession)
                diePregnant.append(person.pregnant)
                dieGender.append(person.gender)
                dieCharType.append(person.charType)
                dieAge.append(person.age)
            pedestriansSaved = pedestriansSaved + len(scene.pedestrians)
        simulations = simulations + 1
        print("Simulations: ", simulations)
        # print(livePregnant)
    print("Passengers Saved:", passengersSaved)
    print("Pedestrians Saved", pedestriansSaved)
    print("Homeless saved:", liveProfession.count("homeless"), "Homeless died:", dieProfession.count("homeless"),"Percent live:", calcRatio( liveProfession.count("homeless"),dieProfession.count("homeless") ) ) 
    print("Doctors saved:", liveProfession.count("doctor"), "Doctors died:", dieProfession.count("doctor"),"Percent live:", calcRatio( liveProfession.count("doctor"),dieProfession.count("doctor") ) )
    print("Pregnant Saved:", livePregnant.count(True), "Pregnant Died:", diePregnant.count(True),"Percent live:", calcRatio( livePregnant.count(True),diePregnant.count(True) ) )
    print("Males Saved:", liveGender.count("male"), "Males Died:", dieGender.count("male"), "Percent live:", calcRatio( liveGender.count("male"),dieGender.count("male") ) )
    print("Females Saved:", liveGender.count("female"), "Females Died:", dieGender.count("female"), "Percent live:", calcRatio( liveGender.count("female"),dieGender.count("female") ) )
    print( "You Ratio:", calcRatio(liveCharType.count("you"),dieCharType.count("you")) )
    print( "Dog Ratio:", calcRatio(liveCharType.count("dog"),dieCharType.count("dog")) )
    print( "Baby Ratio:", calcRatio(liveAge.count("baby"),dieAge.count("baby")) )
    print( "Child Ratio:", calcRatio(liveAge.count("child"),dieAge.count("child")) )
    print( "Adult Ratio:", calcRatio(liveAge.count("adult"),dieAge.count("adult")) )
    print( "Elderly Ratio:", calcRatio(liveAge.count("elderly"),dieAge.count("elderly")) )


def calcRatio(live, die):
    ratio = live/(live + die)
    percent = round(ratio * 100, 2)
    return percent;


if __name__ == '__main__':
    audit()
