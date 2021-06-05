import {decide} from './engine.js'
import {Scenario, Person} from './scenario.js'

let scenesGlobal = []
let sceneGlobal = {}

function runSimulation(event){
    console.log("===========================================")
    console.log("THE ETHICAL ENGINE")
    console.log("===========================================")
    const scene = new Scenario()
    console.log(scene.stringRep())
    if(event.srcElement.id == "run-once"){
        // the ethical engine makes the decision: 
        const result = decide(scene)
        console.log(`%cThe ethics engine chose to save the ${result},`,  "background: red; color: white")
    } else {
        // the user manually makes the decision:
        sceneGlobal = scene;
        document.getElementById('run-manual').disabled = true
        document.getElementById('record-entry-passengers').disabled = false
        document.getElementById('record-entry-pedestrians').disabled = false
        document.getElementById('download-decisions').disabled = false
        document.getElementById('record-entry-pedestrians').disabled = false
        console.log("Who should live and who should die? Click the 'Passengers' or 'Pedestrians' button to record your decision")
    }
}

function recordUserDecision(event){
    if (event.srcElement.id == "record-entry-passengers"){
        sceneGlobal.decision = "passengers"
    }else{
        sceneGlobal.decision = "pedestrians"
    }
    scenesGlobal.push(sceneGlobal)
    runSimulation(event)
    document.getElementById('recorded-scenarios').innerHTML="Recorded scenarios: <span style='color: blue; font-size: 1.5em'>" + scenesGlobal.length + "</span>";
}

function download_txt() {
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(scenesGlobal));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Decisions.txt';
    hiddenElement.click();
}

function readFile(event) {
    let input = event.target;
    let file = input.files[0];
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      scenesGlobal = JSON.parse(reader.result);
      alert("The following number of scenarios/decisions are now ready to test: " + scenesGlobal.length)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function findDifferences(){
    
    let differences = 0;
    scenesGlobal.forEach(sceneJSON => {

        // begin needed because sceneJSON does not contain stringRep functions
        let target = new Scenario()
        const scene = Object.assign(target,sceneJSON)

        const personInst = new Person()
        scene.passengers.forEach(p => {
            p.stringRep = personInst.stringRep
        });

        scene.pedestrians.forEach(p => {
            p.stringRep = personInst.stringRep
        });
        // end

        let result = decide(scene);
        if (result != scene.decision){
            differences += 1
            console.log("-----------------------------------------------------")
            console.log("Difference number", differences, ":")
            console.log(scene.stringRep())
            console.log("Engine chose", result, ". You chose ", scene.decision)
            console.log("-----------------------------------------------------")
            
        }
    });
    console.log("Number of differences found:", differences)
}

function displayUpload(){
    document.getElementById('read-file').style.display='block';
}

document.getElementById('run-once').addEventListener('click', runSimulation);
document.getElementById('run-manual').addEventListener('click', runSimulation);
document.getElementById('record-entry-passengers').addEventListener('click', recordUserDecision);
document.getElementById('record-entry-pedestrians').addEventListener('click', recordUserDecision);
document.getElementById('download-decisions').addEventListener('click', download_txt);
document.getElementById('read-file').addEventListener('change', readFile);
document.getElementById('find-differences').addEventListener('click', findDifferences);



