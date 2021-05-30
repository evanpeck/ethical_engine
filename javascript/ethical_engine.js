// The following variable just used to pass a default variable to arguments...
// const None = "N";

function main(){

    // const foo = new Person("you")
    // console.log("foo", foo)
    console.log("===========================================")
    console.log("THE ETHICAL ENGINE")
    console.log("===========================================")
    const scene = new scenario()
    console.log(scene.stringRep())
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
    this.pedestrians = []
    this.legalCrossing = legalCrossing; // true or false
    this.pedsInLane = pedsInLane; // true or false
    
    const numPedestrians = Math.round(Math.random() * (MAX_PEDESTRIANS - MIN_PEDESTRIANS) + MIN_PEDESTRIANS);

    let numPassengers = 0;
    if (sameNum){
        numPassengers = numPedestrians
    }else{
        numPassengers = Math.round(Math.random() * (MAX_PASSENGERS - MIN_PASSENGERS) + MIN_PASSENGERS);
    }
    // console.log("SameNum", sameNum, "MinMaxPass", MIN_PASSENGERS, MAX_PASSENGERS, "Passengers", numPassengers, "Pedes", numPedestrians)
    
    // DETERMINE THE PASSENGERS
    if (typeof passengers != 'undefined'){
        this.passengers = passengers
    }else{
        // Create randomly generated people for passengers
        for (let index = 0; index < numPassengers; index++) {
            const person = new Person()
            this.passengers.push(person)
        }
        // If you are a passenger in the car, replace one of the passengers wih you.
        // 25% chance of you being in car
        if (typeof youInCar != 'undefined'){
            self.youInCar = youInCar
        }else{
            self.youInCar = randomChoice(YOU_CHANCE)
        }
        if (self.youInCar){
            // Feel free to change these attributes if you'd like
            let youPerson = new Person("you")
            if (numPassengers > 0){
                this.passengers[0] = youPerson
            }else{
                this.passengers.push(youPerson)
            }
        }
    }
    // DETERMINE THE PEDESTRIANS
    if (typeof pedestrians != 'undefined'){
        this.pedestrians = pedestrians
    }else{   
        for (let index = 0; index < numPedestrians; index++) {
            const person = new Person()
            this.pedestrians.push(person)
        }
    }    

    //Determine if the pedestrians are crossing during a walk sign
    if (typeof legalCrossing != 'undefined'){
        this.legalCrossing = legalCrossing
    }else{   
        this.legalCrossing = randomChoice(LEGAL_CROSSING_CHANCE)
    } 

    //Determine if the pedestrians are in the car's CURRENT lane
    if (typeof pedsInLane != 'undefined'){
        this.pedsInLane = pedsInLane
    }else{   
        this.pedsInLane = randomChoice(PEDS_IN_LANE_CHANCE)
    }

    this.stringRep = function(){
        let readable = 'Passengers:\n'
        this.passengers.forEach(p => {
            readable += '  ' + p.stringRep() + '\n'
        });
        readable += 'Pedestrians:\n'
        this.pedestrians.forEach(p => {
            readable += '  ' + p.stringRep() + '\n'
        });

        if (this.legalCrossing){
            readable += 'Crossing is legal (legalCrossing = true)\n'
        }else{
            readable += 'Crossing is illegal (legalCrossing = false)\n'
        }
        if (this.pedsInLane){
            readable += 'Pedestrians are in your lane. (pedsInLane = true)'
        }else{
            readable += 'Pedestrians are NOT in your lane. (pedsInLane = false)'
        }    
        return(readable)
    }
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
    
    // set charType (human, animal or you) 
    if (typeof charType != 'undefined'){
        this.charType = charType // if person("you") is instantiated the charType will be you
    }else{
        this.charType = randomChoice(CHAR_TYPES)
    }

    // If it's an animal, choose which type
    if (this.charType == "animal"){
        this.charType = randomChoice(ANIMAL_TYPES)
    }
    // If it's a person, set the characteristics
    if (this.charType == "human"){
        this.age = randomChoice(AGE_TYPES)
        this.gender = randomChoice(GENDER_TYPES)

        // Set adult characteristics
        if (this.age == "adult"){
            this.bodyType = randomChoice(BODYWEIGHT_CHANCE)
            if (this.gender == "female"){
                this.pregnant = randomChoice(PREGNANT_CHANCE)
            }
            this.profession = randomChoice(PROF_TYPES)
        }
    }

    
    
    // this.profession = profession
    // this.age = age
    // this.gender = gender
    // this.bodyType = bodyType
    // this.pregnant = pregnant

    this.stringRep = function(){
        let readable = ''
        readable += this.charType + " | " 
        readable += " age:" + this.age + " | " 
        readable += " gender:" + this.gender + " | " 
        readable += "body-type:" + this.bodyType + " | " 
        readable += "pregnant:" + this.pregnant + " | " 
        // readable += '\n '
        return(readable)
    }


}



function decide(scenario){
    //console.log("pass:  ",scenario.passengers.length)
    if (scenario.passengers.length > scenario.pedestrians.length){
        return "passengers"
    }else{
        return "pedestrians"
    }
}

//Utility Functions
function randomChoice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }