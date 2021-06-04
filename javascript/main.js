import {decide} from './engine.js'
import {Scenario, Person} from './scenario.js'

let scenes = []
let sceneGlobal = {}


function runSimulation(){
    console.log("===========================================")
    console.log("THE ETHICAL ENGINE")
    console.log("===========================================")
    const scene = new Scenario()
    console.log(scene.stringRep())
    const result = decide(scene)
    console.log(`%cI chose to save the ${result},`,  "background: red; color: white")
}

function runManualSimulation(){
    console.log("===========================================")
    console.log("THE ETHICAL ENGINE - Manual Simulation")
    console.log("===========================================")
    const scene = new Scenario()
    console.log(scene.stringRep())
    sceneGlobal = scene;
    document.getElementById('run-manual').style.display = 'none'
    document.getElementById('record-entry-passengers').style.display = 'inline-block'
    document.getElementById('record-entry-pedestrians').style.display = 'inline-block'
    console.log("Who should live and who should die? Click the 'Passengers' or 'Pedestrians' button to record your decision")
}

function recordEntry(event){
    // console.log(event.srcElement.id)
    if (event.srcElement.id == "record-entry-passengers"){
        sceneGlobal.decision = "passengers"
    }else{
        sceneGlobal.decision = "pedestrians"
    }
    scenes.push(sceneGlobal)
    runManualSimulation()
    // console.log(scenes)
    recordedScenarios()
}

function recordedScenarios(){
    document.getElementById('recorded-scenarios').innerHTML="Recorded scenarios: <span style='color: blue; font-size: 1.5em'>" + scenes.length + "</span>";
}

function download_txt() {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(JSON.stringify(scenes));
    hiddenElement.target = '_blank';
    hiddenElement.download = 'myFile.txt';
    hiddenElement.click();
}


function readFile(event) {
    let input = event.target;
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      console.log(reader.result);
      let temp = reader.result
      scenes = JSON.parse(temp);
      console.log(scenes, scenes.length)
      alert("The following number of scenarios/decisions are now ready to test: " + scenes.length)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  
  }



function findDifferences(){
    
    let differences = 0;
    scenes.forEach(sceneJSON => {

        // begin needed because sceneJSON does not contain stringRep functions
        let target = new Scenario()
        const scene = Object.assign(target,sceneJSON)
        console.log(scene)

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
document.getElementById('run-manual').addEventListener('click', runManualSimulation);
document.getElementById('record-entry-passengers').addEventListener('click', recordEntry);
document.getElementById('record-entry-pedestrians').addEventListener('click', recordEntry);
document.getElementById('save').addEventListener('click', download_txt);
document.getElementById('read-file').addEventListener('change', readFile);
document.getElementById('find-differences').addEventListener('click', findDifferences);
document.getElementById('upload').addEventListener('click', displayUpload);


function debugMe(){
    console.log("DDDDDDDDDDDDDDDD")
    console.log(scenes)
    console.log(scenes.length)
    console.log("ZZZZZZZZZZZZZZZZZZ")
}
document.getElementById('debugIt').addEventListener('click', debugMe);