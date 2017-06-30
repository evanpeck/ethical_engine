'''
Provides template code to automatically make decisions for the autonomous
car.
'''
from scenario import Scenario

def decide(scenario):
    """ Decides whether your car will save the passengers or pedestrians

    This method is typically called from a DIFFERENT python file. Given
    any scenario

    Args:
        scenario: a scenario object from scenario.py. This object contains
            all of the information about the scenario. You can see some
            examples below in the sample code.

    Returns:
        A string which indicates whether you are saving "passengers" or
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
    if len(scenario.passengers) > len(scenario.pedestrians):
        return "passengers"
    else:
        return "pedestrians"
