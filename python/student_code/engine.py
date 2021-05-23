'''
Provides template code to automatically make decisions for the autonomous
car.
'''
from scenario import Scenario

def decide(scenario):
    """ Decides whether your car will save the passengers or pedestrians

    Args:
        scenario: a Scenario object defined in scenario.py. This object contains
            all of the information about the scenario. You can see some
            examples below in the sample code.

    Returns:
        A string indicating whether you are saving "passengers" or
        "pedestrians". Note that your method MUST make a decision for
        ANY potential scenario.
    """

    # NOTE: YOU NEED TO REPLACE ALL OF THE CODE BELOW!!!
    # This simply demonstrates how to access information from the scenario.
    # print("Are the pedestrians crossing legally?", scenario.legalCrossing)
    # print("Is the car in the same lane as the pedestrians?", scenario.pedsInLane)
    # print("Are you in car?", scenario.youInCar)
    #
    # print("Print whether each pedestrian is a human, animal, or you")
    # for person in scenario.pedestrians:
    #     print(person.charType)


    # Your program must choose to save either pedestrians or passengers.
    # This is an overly simple rule that only saves the passengers if there are
    # more passengers than pedestrians.

    # if len(scenario.passengers) > len(scenario.pedestrians):
    #     return "passengers"
    # else:
    #     return "pedestrians"
    # print(scenario)
    # for attr in dir(scenario):
    #     print("scenario.%s = %r" % (attr, getattr(scenario, attr)))

        #     for passenger in self.passengers:
        #     readable += '-' + str(passenger) + '\n'

        # readable += '\n'
        # readable += 'Pedestrians: \n'
        # for pedestrian in self.pedestrians:
        #     readable += '-' + str(pedestrian) + '\n'
    # print("----------------")
    # print(scenario.passengers)
    utilityPassengers = 0
    utilityPedestrians = 0
    utilityPassPregnant = 0
    utilityPedesPregnant = 0
    virtuePass = 0
    virtuePedes = 0
    personValue ={
        'baby': 4,
        'child': 3,
        'adult': 2, 
        'elderly': 1
    }

    for person in scenario.passengers:
        utilityPassengers = utilityPassengers + personValue.get(person.age, 0)
        if person.charType == "you":
            utilityPassengers = utilityPassengers + 5
        if person.pregnant:
            utilityPassPregnant = utilityPassPregnant + 1
        if person.profession == 'homeless':
            virtuePass = virtuePass + 1


    for person in scenario.pedestrians:
        utilityPedestrians = utilityPedestrians + personValue.get(person.age, 0) 
        if person.pregnant:
            utilityPedesPregnant = utilityPedesPregnant + 1
        if person.profession == 'homeless':
            virtuePedes = virtuePedes + 1

    # The following 3 lines helpful for auditing. Uncomment them to see what utility the  algorithm 
    # assigns to the pedestrians and the passengers: 
    # print("UtilityPassengers:", utilityPassengers, "UtilityPedestrians:", utilityPedestrians)
    # print("UtilityPassPregnant:", utilityPassPregnant, "UtilityPedesPregnant:", utilityPedesPregnant)
    # print("Peds are in vehicle lane:", scenario.pedsInLane)

    if (scenario.pedsInLane == False) and ((utilityPassengers - utilityPedestrians) < 2):  
        # if the pedestrians are not in the vehicle's lane always favor them unless there are at least two
        # more people in the vehicle than in the crosswalk
        return "pedestrians" 
    else:
        if utilityPedestrians < utilityPassengers:
            return "passengers"
        elif utilityPedestrians > utilityPassengers:
            return "pedestrians"
        else:
            if utilityPedesPregnant < utilityPassPregnant:
                return "passengers"
            elif utilityPedesPregnant > utilityPassPregnant:
                return "pedestrians"
            else:
                if virtuePedes < virtuePass:
                    return "passengers"
                elif virtuePedes > virtuePass:
                    return "pedestrians"
                else:
                    return "pedestrians" 
