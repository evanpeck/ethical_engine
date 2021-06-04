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

    const MIN_PASSENGERS = 1
    const MAX_PASSENGERS = 7
    const MIN_PEDESTRIANS = 1
    const MAX_PEDESTRIANS = 7

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
    // attributes in each person object:
    // person.charType: human, dog, cat 
    // person.age: baby, child, adult, elderly 
    // person.gender: male, female 
    // person.bodyType: overweight, athletic, average  
    // person.pregnant: true, false
    // person.profession: doctor, CEO, criminal, homeless, unemployed, unknown 

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

    if ((scenario.pedsInLane == false)){
        // pedestrians are in other lane
        if ((utilityPassengers - utilityPedestrians) > 5){
            //favor pedestrians except for extreme differences
            return "passengers"
        }else{
            return "pedestrians"
        }
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
 
    // for a simple demo of the decide function just use this:
    // if (utilityPassengers > utilityPedestrians){
    //     return "passengers"
    // }else{
    //     return "pedestrians"
    // }



}

function audit(){
    let auditMe = new Audit()
    auditMe.runSimulation()
    auditMe.outputResults()
}

function Audit(){
    this.biasMetrics = {
        pedestrians : {live:0,die:0},
        passengers : {live:0,die:0},
    
        //charType
        human : {live:0,die:0},
        you : {live:0,die:0},
        dog : {live:0,die:0},
        cat : {live:0,die:0},

        //age
        baby : {live:0,die:0},
        child : {live:0,die:0},
        adult : {live:0,die:0},
        elderly : {live:0,die:0},
    
        //gender
        female : {live:0,die:0},
        male : {live:0,die:0},
        
        //bodyType
        overweight : {live:0,die:0},
        athletic : {live:0,die:0},
        average : {live:0,die:0},
    
        //pregnant
        pregnant : {live:0,die:0},

        //profession
        doctor : {live:0,die:0},
        CEO : {live:0,die:0},
        criminal : {live:0,die:0},
        homeless : {live:0,die:0},
        unemployed : {live:0,die:0},
        unknown : {live:0,die:0},

        //
        pedsInLaneTrue : {live:0,die:0}, // this only counts pedestrian lives and deaths 
        pedsInLaneFalse : {live:0,die:0}, // this only counts pedestrian lives and deaths 


        undefined : {live:0,die:0} // this attribute aggregates data like pregnant.undefined profession.undefined etc 
    }

    this.simulations = 0

    this.runSimulation = function(){
        while(this.simulations < 10000){
            let scenario = new Scenario()
            result = decide(scenario)

            let pedsInLaneKey = ""
            if (scenario.pedsInLane){
                
                pedsInLaneKey = "pedsInLaneTrue"
            }else{

                pedsInLaneKey = "pedsInLaneFalse"
            }

            if (result == "passengers"){
                for (x=0; x < scenario.passengers.length; x++) {
                    let person = scenario.passengers[x]
                    this.aggregateResults("live",person)
                    this.biasMetrics.passengers.live += 1
                    //this.biasMetrics[pedsInLaneKey].live += 1
                }
                for (x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("die",person)
                    this.biasMetrics.pedestrians.die += 1
                    this.biasMetrics[pedsInLaneKey].die += 1
                }
            }
            else{
                for (x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("live",person)
                    this.biasMetrics.pedestrians.live += 1
                    this.biasMetrics[pedsInLaneKey].live += 1
                }
                for (x=0; x < scenario.passengers.length; x++) {
                    let person = scenario.passengers[x]
                    this.aggregateResults("die",person)
                    this.biasMetrics.passengers.die += 1
                    //this.biasMetrics[pedsInLaneKey].die += 1
                }
            }

            this.simulations = this.simulations + 1
            console.log("Simulations: ", this.simulations)
        }
        for (var identity in this.biasMetrics) {
            this.biasMetrics[identity].percentLive = this.biasMetrics[identity].live / (this.biasMetrics[identity].live + this.biasMetrics[identity].die)
        }
    }

    this.aggregateResults = function (liveDie, person){
        for (var identity in person) {
            if(typeof person[identity] == "string"){
                // run on all keys except for person.stringRep function and person.pregnant boolean
                this.biasMetrics[person[identity]][liveDie] += 1
            }
            if(typeof person[identity] == "boolean"){
                // run on person.pregnant boolean
                this.biasMetrics.pregnant[liveDie] += 1
            }
        }
    }


    this.outputResults = function(){
        console.log("Live/Die Ratio Sorted By Most Likely To Die To Least Likely")
        console.log("(Note: All ratios calculated using passengers and pedestrians lives and deaths")
        console.log("except for ratios titled 'pedsInLaneFalse, pedsInLaneTrue, passengers, pedestrians')")
        let sortable = []
        for (var identity in this.biasMetrics) {
            sortable.push([identity,this.biasMetrics[identity].percentLive])
        }
        sortable.sort(function(a,b){
            return a[1] - b[1]
        })
        sortable.forEach(e =>{
            if (e[0] != "undefined"){
                console.log(e[0], e[1].toFixed(2))
            }            
        })

    }

}

// Utility Functions
function randomChoice(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}





