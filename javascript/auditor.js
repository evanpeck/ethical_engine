import {decide} from './engine.js'
import {Scenario} from './scenario.js'
import {scenesGlobal} from './main.js'

function audit(){
    let auditMe = new Audit()
    auditMe.runAudit('montecarlo')
    auditMe.outputResults()
}

function auditManualDecisions(){
    let auditMe = new Audit()
    auditMe.runAudit('manualDecisions')
    auditMe.outputResults()
}

function Audit(){
    this.biasMetrics = {
    
        //charType
        charType : {
            human : {live:0,die:0},
            you : {live:0,die:0},
            dog : {live:0,die:0},
            cat : {live:0,die:0},
        },

        //age
        age: {
            baby : {live:0,die:0},
            child : {live:0,die:0},
            adult : {live:0,die:0},
            elderly : {live:0,die:0},
        },


        //gender
        gender: {
            female : {live:0,die:0},
            male : {live:0,die:0},
        },


        //bodyType
        bodyType: {
            overweight : {live:0,die:0},
            athletic : {live:0,die:0},
            average : {live:0,die:0},
        },


        //pregnant
        pregnant: {
            true: {live:0,die:0},
            false: {live:0,die:0},
        },


        //profession
        profession: {
            doctor : {live:0,die:0},
            CEO : {live:0,die:0},
            criminal : {live:0,die:0},
            homeless : {live:0,die:0},
            unemployed : {live:0,die:0},
            unknown : {live:0,die:0},
        },

        misc: {
            pedestrians : {live:0,die:0},
            passengers : {live:0,die:0},
        }
    },

    this.scenarioCount = 0,
    this.auditNotDone = true,

    this.runAudit = function(auditType){
        const scenesGlobalClone = [...scenesGlobal];
        console.log("DDDDDDDDDDDDD")
        console.log(scenesGlobalClone.length)
        console.log(scenesGlobalClone)
        if(auditType == 'manualDecisions'){
            if(scenesGlobalClone.length == 0){
                alert('You dont have any manual decisions to audit. Create some or upload a file.')
                return false
            }
        }
        while(this.auditNotDone){
            let scenario = {}
            let result = ""

            if (auditType == 'montecarlo'){
                scenario = new Scenario()
                result = decide(scenario)
            } else {
                scenario = scenesGlobalClone.pop()
                result = scenario.decision
            }


            if (result == "passengers"){
                for (let x=0; x < scenario.passengers.length; x++) {
                    let person = scenario.passengers[x]
                    this.aggregateResults("live",person,"passengers")
                }
                for (let x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("die",person,"pedestrians")
                }
            }
            else{
                for (let x=0; x < scenario.pedestrians.length; x++) {
                    let person = scenario.pedestrians[x]
                    this.aggregateResults("live",person,"pedestrians")
                }
                for (let x=0; x < scenario.passengers.length; x++) {
                    let person = scenario.passengers[x]
                    this.aggregateResults("die",person,"passengers")
                }
            }

            this.scenarioCount = this.scenarioCount + 1
            console.log("Scenarios: ", this.scenarioCount)
            if(auditType == "montecarlo"){
                this.auditNotDone = this.scenarioCount < 100 ? true : false
            }else{
                this.auditNotDone = scenesGlobalClone.length > 0 ? true : false
            }


        }
        for (var attribute in this.biasMetrics) {
            for (var subAttr in this.biasMetrics[attribute]) {
                this.biasMetrics[attribute][subAttr].percentLive = this.biasMetrics[attribute][subAttr].live / (this.biasMetrics[attribute][subAttr].live + this.biasMetrics[attribute][subAttr].die)
                
            }
        }
    }

    this.aggregateResults = function (liveDie, person, passOrPedes){
        for (var attribute in person) {
            if(attribute != "stringRep"){
                // run on all keys except for person.stringRep function 
                this.biasMetrics[attribute][person[attribute]][liveDie] += 1
            }
            
        }
        this.biasMetrics.misc[passOrPedes][liveDie] += 1
    }


    this.outputResults = function(){
        console.log("Live/Die Ratio Sorted By Most Likely To Die To Least Likely")
        let sortable = []
        for (var attribute in this.biasMetrics) {
             for (var subAttr in this.biasMetrics[attribute]) {
                sortable.push([attribute + "=" + subAttr,this.biasMetrics[attribute][subAttr]])
            }
        }

        sortable.sort(function(a,b){
            return a[1].percentLive - b[1].percentLive
        })

        console.log("Attribute              % Saved  Encountered")
        console.log("---------              -------  -----------")
        sortable.forEach(e =>{
            if (e[0] != "undefined"){
                let attribute = e[0]
                let percentSaved = (e[1].percentLive *100).toFixed(0)
                let encountered = e[1].live + e[1].die
                let spaceNum = 21 - e[0].length
                let spaces = ""
                for(let x=0; x < spaceNum; x++){
                    spaces = spaces + " "
                }
                let spaceNum2 = 3 - percentSaved.length
                let spaces2 = ""
                for(let x=0; x < spaceNum2; x++){
                    spaces2 = spaces2 + " "
                }
                console.log(`${attribute}  ${spaces}   ${percentSaved}%   ${spaces2}     ${encountered}`)
            }            
        })
    }

}

document.getElementById('run-multiple').addEventListener('click', audit);
document.getElementById('audit-manual-decisions').addEventListener('click', auditManualDecisions);