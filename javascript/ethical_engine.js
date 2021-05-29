// The following variable just used to pass a default variable to arguments...
// const None = "N";

function main(){
    const scene = new scenario()
    console.log(scene)
    // print()
    const result = decide(scene)
    console.log("I chose to save the ", result)
}

// passengers=None, pedestrians=None, youInCar=None, legalCrossing=None, pedsInLane=None,
function scenario(passengers, pedestrians, youInCar, legalCrossing, pedsInLane, sameNum=false){

    const MIN_PASSENGERS = 0
    const MAX_PASSENGERS = 4
    const MIN_PEDESTRIANS = 1
    const MAX_PEDESTRIANS = 4

    const YOU_CHANCE = [true, false, false, false]
    const LEGAL_CROSSING_CHANCE = [true, true, false]
    const PEDS_IN_LANE_CHANCE = [true, false]

    this.passengers = []

    // function randomNumber(min, max) { 
    //     return Math.random() * (max - min) + min;
    // }

    // const numPedestrians = random.randint(MIN_PEDESTRIANS, MAX_PEDESTRIANS)
    const numPedestrians = Math.round(Math.random() * (MAX_PEDESTRIANS - MIN_PEDESTRIANS) + MIN_PEDESTRIANS);

    let numPassengers = 0;
    if (sameNum){
        numPassengers = numPedestrians
    }else{
        numPassengers = Math.round(Math.random() * (MAX_PASSENGERS - MIN_PASSENGERS) + MIN_PASSENGERS);
    }
    console.log("SameNum", sameNum, "MinMaxPass", MIN_PASSENGERS, MAX_PASSENGERS, "Passengers", numPassengers, "Pedes", numPedestrians)
    for (let index = 0; index < numPassengers; index++) {
        const person = new Person()
        this.passengers.push(person)
   
    }

//     if not sameNum:
//     numPassengers = random.randint(self.MIN_PASSENGERS, self.MAX_PASSENGERS)
// else:
//     numPassengers = numPedestrians

// # DETERMINE THE PASSENGERS
// if passengers is not None:
//     self.passengers = passengers
// else:
//     # Create randomly generated people for passengers
//     self.passengers = [Person() for numPeople in range(numPassengers)]


}

function Person(charType, age, profession, gender, bodyType, pregnant){

    // Choose between a human or animal
    const CHAR_TYPES = ["human", "human", "human", "animal", "human"]
    // If it's an animal, choose between cat or dog
    const ANIMAL_TYPES = ["cat", "dog"]
    // Possible ages of humans
    const AGE_TYPES = ["baby", "child", "adult", "adult", "adult", "elderly"]
    // Possible professions of adults
    const PROF_TYPES = ["doctor", "CEO", "criminal", "homeless", "unemployed", "unknown", "unknown", "unknown"]
    // Possible genders of humans
    const GENDER_TYPES = ["male", "female"]
    // Select whether a female is pregnant (currently 25% chance)
    const PREGNANT_CHANCE = [true, false, false, false]
    // PREGNANT_CHANCE = [True, True, True, True]
    // Select the bodytype of each non-child.
    const BODYWEIGHT_CHANCE = ["overweight", "athletic", "average", "average"]
    console.log("chartype", charType)
    if (typeof charType == 'undefined'){
        this.charType = "human"
    }

    
    this.profession = profession
    this.age = age
    this.gender = gender
    this.bodyType = bodyType
    this.pregnant = pregnant
}

// function item(task, priority) {
//     this.task = task;
//     this.priority = priority;
//     this.assign = function () {
//       if (Math.random() > .5) {
//         return 'Bob';
//       } else {
//         return 'Joe';
//       }
//     }
//     this.owner = this.assign();
// }

function decide(scenario){
    console.log("pass:  ",scenario.passengers.length)
    if (scenario.passengers.length > 2){
        return "passengers"
    }else{
        return "pedestrians"
    }
}