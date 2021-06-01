import {decide} from './engine.js'
import {Scenario} from './scenario.js'

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
            let result = decide(scenario)

            let pedsInLaneKey = ""
            if (scenario.pedsInLane){
                
                pedsInLaneKey = "pedsInLaneTrue"
            }else{

                pedsInLaneKey = "pedsInLaneFalse"
            }

            if (result == "passengers"){
                for (let x=0; x < scenario.passengers.length; x++) {
                    let person = scenario.passengers[x]
                    this.aggregateResults("live",person)
                    this.biasMetrics.passengers.live += 1
                    //this.biasMetrics[pedsInLaneKey].live += 1
                }
                for (let x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("die",person)
                    this.biasMetrics.pedestrians.die += 1
                    this.biasMetrics[pedsInLaneKey].die += 1
                }
            }
            else{
                for (let x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("live",person)
                    this.biasMetrics.pedestrians.live += 1
                    this.biasMetrics[pedsInLaneKey].live += 1
                }
                for (let x=0; x < scenario.passengers.length; x++) {
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
        console.log("(Note: Ratios calculated using all passengers and pedestrians lives and deaths,")
        console.log("except for: 1) Ratios titled 'pedsInLaneFalse, pedsInLaneTrue,  pedestrians' which just")
        console.log("use pedestrians lives and deaths. 2) Ratio titled 'passengers' which just uses passengers lives and deaths)")
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

document.getElementById('run-multiple').addEventListener('click', audit);