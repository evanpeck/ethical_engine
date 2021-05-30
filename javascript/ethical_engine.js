function main(){

    console.log("===========================================")
    console.log("THE ETHICAL ENGINE")
    console.log("===========================================")
    const scene = new Scenario()
    console.log(scene.stringRep())
    const result = decide(scene)
    console.log("I chose to save the ", result)
}

function Scenario(passengers, pedestrians, youInCar, legalCrossing, pedsInLane, sameNum=false){

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

    this.stringRep = function(){
        let readable = ''
        readable += this.charType + " | " 
        readable += " age:" + this.age + " | " 
        readable += " gender:" + this.gender + " | " 
        readable += "body-type:" + this.bodyType + " | " 
        readable += "pregnant:" + this.pregnant + " | " 
        readable += "profession:" + this.profession  
        
        return(readable)
    }


}



function decide(scenario){

    //Properties you have access to in scenario:
    // scenario.pedsInLane (if true pedestrians are in same lane as car)
    // scenarion.legalCrossing (if true pedestrians are crossing legally)
    // scenario.passengers and scenario.pedestrians (arrays of person objects)
    // person.charType, person.age, person.gender, person.bodyType, person.pregnant

    let utilityPassengers = 0
    let utilityPedestrians = 0
    let utilityPassPregnant = 0
    let utilityPedesPregnant = 0
    let virtuePass = 0
    let virtuePedes = 0
    let personValue ={
        'baby': 4,
        'child': 3,
        'adult': 2, 
        'elderly': 1
    }
    for (x=0; x < scenario.passengers.length; x++) {
        let person = scenario.passengers[x]
        if (personValue[person.age]){
            utilityPassengers = utilityPassengers + personValue[person.age]
        }
        if (person.charType == "you"){
            utilityPassengers = utilityPassengers + 5
        }
        if (person.pregnant){
            utilityPassPregnant = utilityPassPregnant + 1
        }
        if (person.profession == "homeless"){
            virtuePass = virtuePass + 1
        }
    }
    for (x=0; x < scenario.pedestrians.length; x++) {
        let person = scenario.pedestrians[x]
        if(personValue[person.age]){
            utilityPedestrians = utilityPedestrians + personValue[person.age]
        }
        if (person.pregnant){
            utilityPedesPregnant = utilityPedesPregnant + 1
        }
        if (person.profession == "homeless"){
            virtuePedes = virtuePedes + 1
        }
    }

    // Keep for auditing purposes
    // console.log("Pass:", utilityPassengers, "Pedes", utilityPedestrians)

    if ((scenario.pedsInLane == false) && ((utilityPassengers - utilityPedestrians) < 2)){
        // pedestrians are in other lane
        return "pedestrians"
    }  
    else{
        // pedestrians are in same lane
        if (utilityPedestrians < utilityPassengers){
            return "passengers"
        }else if (utilityPedestrians > utilityPassengers){
            return "pedestrians"
        }else{
            if (utilityPedesPregnant < utilityPassPregnant){
                return "passengers"
            } else if (utilityPedesPregnant > utilityPassPregnant){
                return "pedestrians"
            } else{
                if (virtuePedes < virtuePass ){
                    return "passengers"
                } else if (virtuePedes > virtuePass ){
                    return "pedestrians"
                }else{
                    return "pedestrians"
                }
            }
        }
    }
 

    // if (utilityPassengers > utilityPedestrians){
    //     return "passengers"
    // }else{
    //     return "pedestrians"
    // }



}

function audit(){
    let liveProfession = []
    let livePregnant = []
    let liveGender = []
    let liveCharType = []
    let liveAge = []

    let dieProfession = []
    let diePregnant = []
    let dieGender = []
    let dieCharType = []
    let dieAge = []

    let pedestriansSaved = 0
    let passengersSaved = 0

    let simulations = 0

    while(simulations < 10000){
        let scenario = new Scenario()
        result = decide(scenario)
        if (result == "passengers"){
            for (x=0; x < scenario.passengers.length; x++) {
                let person = scenario.passengers[x]
                liveProfession.push(person.profession)
                livePregnant.push(person.pregnant)
                liveGender.push(person.gender)
                liveCharType.push(person.charType)
                liveAge.push(person.age)
                passengersSaved += 1
            }
            for (x=0; x < scenario.pedestrians.length; x++) {
                let person = scenario.pedestrians[x]
                dieProfession.push(person.profession)
                diePregnant.push(person.pregnant)
                dieGender.push(person.gender)
                dieCharType.push(person.charType)
                dieAge.push(person.age)
            }
        }
        else{
            for (x=0; x < scenario.pedestrians.length; x++) {
                let person = scenario.pedestrians[x]
                liveProfession.push(person.profession)
                livePregnant.push(person.pregnant)
                liveGender.push(person.gender)
                liveCharType.push(person.charType)
                liveAge.push(person.age)
                pedestriansSaved += 1
            }
            for (x=0; x < scenario.passengers.length; x++) {
                let person = scenario.passengers[x]
                dieProfession.push(person.profession)
                diePregnant.push(person.pregnant)
                dieGender.push(person.gender)
                dieCharType.push(person.charType)
                dieAge.push(person.age)
            }
        }
        simulations = simulations + 1
        console.log("Simulations: ", simulations)
    }
    console.log("Passengers Saved:", passengersSaved)
    console.log("Pedestrians Saved", pedestriansSaved)
    console.log("Homeless saved:", liveProfession.count("homeless"), "Homeless died:", dieProfession.count("homeless"),"Percent live:", calcRatio( liveProfession.count("homeless"),dieProfession.count("homeless") ) ) 
    console.log("Doctors saved:", liveProfession.count("doctor"), "Doctors died:", dieProfession.count("doctor"),"Percent live:", calcRatio( liveProfession.count("doctor"),dieProfession.count("doctor") ) )
    console.log("Pregnant Saved:", livePregnant.count(true), "Pregnant Died:", diePregnant.count(true),"Percent live:", calcRatio( livePregnant.count(true),diePregnant.count(true) ) )
    console.log("Males Saved:", liveGender.count("male"), "Males Died:", dieGender.count("male"), "Percent live:", calcRatio( liveGender.count("male"),dieGender.count("male") ) )
    console.log("Females Saved:", liveGender.count("female"), "Females Died:", dieGender.count("female"), "Percent live:", calcRatio( liveGender.count("female"),dieGender.count("female") ) )
    console.log( "You Ratio:", calcRatio(liveCharType.count("you"),dieCharType.count("you")) )
    console.log( "Baby Ratio:", calcRatio(liveAge.count("baby"),dieAge.count("baby")) )
    console.log( "Child Ratio:", calcRatio(liveAge.count("child"),dieAge.count("child")) )
    console.log( "Adult Ratio:", calcRatio(liveAge.count("adult"),dieAge.count("adult")) )
    console.log( "Elderly Ratio:", calcRatio(liveAge.count("elderly"),dieAge.count("elderly")) )

}





// Utility Functions
function randomChoice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

// add a python like count method to the Javascript Array object
Array.prototype.count = function(value) {
    let count = 0;
    this.forEach(item => {
	if (item === value) {
	    count++;
	}
    });
    return count;
}

function calcRatio(live,die){
    let ratio = live/(live + die)
    let percent = Math.round(ratio * 100, 2)
    return percent
}

// function aggregateResults(liveDie, person){
//     if(liveDie == "live"){
//         liveProfession.push(person.profession)
//         livePregnant.push(person.pregnant)
//         liveGender.push(person.gender)
//         liveCharType.push(person.charType)
//         liveAge.push(person.age)
//     }else{
//         dieProfession.push(person.profession)
//         diePregnant.push(person.pregnant)
//         dieGender.push(person.gender)
//         dieCharType.push(person.charType)
//         dieAge.push(person.age)
//     }
// }