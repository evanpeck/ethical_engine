import random

class Scenario():
    """ Packages all of the information needed to create an ethical scenario.

    Automatically construct a random scenario in which an autonomous car must
    decide whether to save the car passengers or the pedestrians.

    Args:
        sameNum (bool, optional): if True, enforces that the number of
            pedestrations is the same as the number of car passengers.

    Attributes:
        numPedestrians (int): the number of pedestrians in the crosswalk
        numPassengers (int): the number of passengers in the car
        passengers (list): list of passengers (Person objects) in the car
        pedestrians (list): list of pedestrians (Person objects) in the crosswalk
        youInCar (bool): True if you are one of the passengers in the car
        legalCrossing (bool): True if pedestrians are legally crossing
        pedsInLane (bool): True if car is currently in the same lane as
            the pedestrians (would need to switch lanes to avoid them)
    """
    # The minimum/maximum number of car passengers and pedestrians
    MIN_PASSENGERS = 0
    MAX_PASSENGERS = 4
    MIN_PEDESTRIANS = 1
    MAX_PEDESTRIANS = 4

    # The following variables are lists that represent the probabilities of
    # each feature happening. For example, in YOU_CHANCE, there is a 1 in 4
    # chance that that 'you' are in the vehicle. Similarly, in LEGAL_CROSSING_CHANCE,
    # there is a 2 in 3 chance that the pedestrians are crossing the street
    # legally (the walk sign is on)
    YOU_CHANCE = [True, False, False, False]
    LEGAL_CROSSING_CHANCE = [True, True, False]
    PEDS_IN_LANE_CHANCE = [True, False]

    def __init__(self, passengers=None, pedestrians=None, youInCar=None,
            legalCrossing=None, pedsInLane=None, sameNum=True):
        # Create a random number of pedestrians in the crosswalk
        numPedestrians = random.randint(self.MIN_PEDESTRIANS, self.MAX_PEDESTRIANS)

        # If sameNum is true, create the same number of passengers in the car
        # Otherwise, create a random number of passengers
        if not sameNum:
            numPassengers = random.randint(self.MIN_PASSENGERS, self.MAX_PASSENGERS)
        else:
            numPassengers = numPedestrians

        # DETERMINE THE PASSENGERS
        if passengers is not None:
            self.passengers = passengers
        else:
            # Create randomly generated people for passengers
            self.passengers = [Person() for numPeople in range(numPassengers)]
            # If you are a passenger in the car, replace one of the passengers wih you.
            # 25% chance of you being in car
            if youInCar is not None:
                self.youInCar = youInCar
            else:
                self.youInCar = random.choice(self.YOU_CHANCE)

            if self.youInCar is True:
                # Feel free to change these attributes if you'd like.
                youPerson = Person("you")
                if numPassengers > 0:
                    self.passengers[0] = youPerson
                else:
                    self.passengers += [youPerson]

        # DETERMINE THE PEDESTRIANS
        if pedestrians is not None:
            self.pedestrians = pedestrians
        else:
            self.pedestrians = [Person() for numPeople in range(numPedestrians)]

        # Determine if the pedestrians are crossing during a walk sign
        if legalCrossing is not None:
            self.legalCrossing = legalCrossing
        else:
            self.legalCrossing = random.choice(self.LEGAL_CROSSING_CHANCE)

        # Determine if the pedestrians are in the car's CURRENT lane
        if pedsInLane is not None:
            self.legalCrossing = legalCrossing
        else:
            self.pedsInLane = random.choice(self.PEDS_IN_LANE_CHANCE)

    def __repr__(self):
        """ Method that helps python understand how to print a Scenario

        For example, you can now create a scenario in your code somewhere:
            scenario = Scenario()

        and then print that scenario:
            print(scenario)

        This will print a readable form of the scenario in your program
        """
        readable = 'Passengers: \n'
        for passenger in self.passengers:
            readable += '-' + str(passenger) + '\n'

        readable += '\n'
        readable += 'Pedestrians: \n'
        for pedestrian in self.pedestrians:
            readable += '-' + str(pedestrian) + '\n'
        readable += '\n'

        if self.legalCrossing:
            readable += 'Crossing is legal\n'
        else:
            readable += 'Crossing is illegal\n'

        if self.pedsInLane:
            readable += 'Pedestrians are in your lane.'
        else:
            readable += 'Pedestrians are NOT in your lane.'

        return readable

#-------------------------------------------------------------------------------#

class Person():
    """ Packages all the info needed for a person.

    Every scenario is composed of characters - many of which are people. Each
    of those people can contain a variety of characteristics. The Person class
    will automatically create a random person or animal.

    Attributes:
        charType (string): 'human', 'you', 'cat', 'dog'
        age (string): humans can be a 'baby', 'child', 'adult' or 'elderly'
        profession (string): adults are assigned a profession: 'doctor', 'CEO',
            'criminal', 'homeless', 'unemployed', 'unknown'
        gender (string): 'male' or 'female' TODO: add more diverse options
        bodyType (string): adults are classified as 'average', 'athletic',
            or 'overweight'
        pregnant (bool): adult women may also be pregnant. True if pregant.

    """
    # The following variables not only contain the possibilities of different
    # attributes of people/animals, but also the probability with which they
    # appear. For example, CHAR_TYPES contains 'human' 4 times and 'animal'
    # just 1 time. That means that 'human' is 4x more likely to appear.

    # Choose between a human or animal
    CHAR_TYPES = ["human", "human", "human", "animal", "human"]
    # If it's an animal, choose between cat or dog
    ANIMAL_TYPES = ["cat", "dog"]
    # Possible ages of humans
    AGE_TYPES = ["baby", "child", "adult", "adult", "adult", "elderly"]
    # Possible professions of adults
    PROF_TYPES = ["doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"]
    # Possible genders of humans
    GENDER_TYPES = ["male", "female"]
    # Select whether a female is pregnant (currently 25% chance)
    PREGNANT_CHANCE = [True, False, False, False]
    # PREGNANT_CHANCE = [True, True, True, True]
    # Select the bodytype of each non-child.
    BODYWEIGHT_CHANCE = ["overweight", "athletic", "average", "average"]

    def __init__(self, charType=None, age=None, profession=None,
            gender=None, bodyType=None, pregnant=None):
        ''' Create a person by randomly selecting their attributes

        All of the parameters in this method are OPTIONAL. This means that by
        default, a random person is made if no information is given. For
        example:
            person = Person()

        However, you can also create a custom person by filling in any
        number of those parameters. For example, the following code would
        create an adult woman with an average body type, but still allow
        the program to randomly select her profession:
            person = Person(charType="human", age="adult", gender="female",
                        bodyType="average")
        '''
        self.charType = charType
        self.profession = profession
        self.age = age
        self.gender = gender
        self.bodyType = bodyType
        self.pregnant = pregnant

        # set type of character (human or animal?)
        if charType == None:
            self.charType = random.choice(self.CHAR_TYPES) # you is also a char type

        # If it's an animal, choose which type
        if self.charType == "animal":
            self.charType = random.choice(self.ANIMAL_TYPES)
        # If it's a person, set the characteristics
        if self.charType == "human":
            self.age = random.choice(self.AGE_TYPES)
            self.gender = random.choice(self.GENDER_TYPES)

            # Set adult characteristics.
            if self.age == "adult":
                self.bodyType = random.choice(self.BODYWEIGHT_CHANCE)
                if self.gender == "female":
                    self.pregnant = random.choice(self.PREGNANT_CHANCE)
                self.profession = random.choice(self.PROF_TYPES)

    def __repr__(self):
        """ Method that helps python understand how to print a Person

        For example, you can now create a person in your code somewhere:
            person = Person()

        and then print that person to see what charecteristics it has:
            print(person)
        """
        if self.charType == "human":
            readable = '['
            if self.bodyType:
                readable += self.bodyType + ' '
            if self.age:
                readable += self.age
            if self.gender:
                readable += ' ' + self.gender + ']'
            if self.profession:
                readable += ' job:' + self.profession
            if self.pregnant:
                readable += ', pregnant'
        else:
            readable = self.charType
        return readable

if __name__ == "__main__":
    main()
