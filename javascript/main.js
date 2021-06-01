import {decide} from './engine.js'
import {Scenario} from './scenario.js'

function runSimulation(){
    console.log("===========================================")
    console.log("THE ETHICAL ENGINE")
    console.log("===========================================")
    const scene = new Scenario()
    console.log(scene.stringRep())
    const result = decide(scene)
    console.log("I chose to save the ", result)
}

document.getElementById('run-once').addEventListener('click', runSimulation);
