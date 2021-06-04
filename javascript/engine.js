// import {scenario} from './scenario.js'


function decide(scenario){
    // Properties you have access to in scenario:
    // scenario.pedsInLane (if true pedestrians are in same lane as car)
    // scenarion.legalCrossing (if true pedestrians are crossing legally)
    // scenario.passengers and scenario.pedestrians (arrays of person objects)
    // attributes in each person object:
    // person.charType: human, dog, cat, you 
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
    for (let x=0; x < scenario.passengers.length; x++) {
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
    for (let x=0; x < scenario.pedestrians.length; x++) {
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

export{decide}