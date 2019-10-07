import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';

import { initFirebase } from './firebase.js';

const db = initFirebase();

function writeCommand(command) {
    db.collection("commands").doc("current")
    .set({
        timestamp: Date.now(),
        command: command
    })
    .then((docRef) => {
        // console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const startButtonEl = document.getElementById('start');

startButtonEl.addEventListener('click', () => {
    console.log("Start button clicked");
    setup();
})

// window.onload = () => {
//     const startButtonEl = document.getElementById('start');
//     console.log(startButtonEl);
// }

// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
const modelJson = 'https://storage.googleapis.com/tm-speech-commands/cathyTest2/model.json';
const metadataJson = 'https://storage.googleapis.com/tm-speech-commands/cathyTest2/metadata.json';

const recognizer = speechCommands.create(
    'BROWSER_FFT',
    undefined,
    modelJson,
    metadataJson);


async function setup() {
    await recognizer.ensureModelLoaded();

    // See the array of words that the recognizer is trained to recognize.
    console.log(recognizer.wordLabels());

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    recognizer.listen(result => {
    // - result.scores contains the probability scores that correspond to
    //   recognizer.wordLabels().
    // - result.spectrogram contains the spectrogram of the recognized word.
        console.log(result);

        const neutral = result.scores[2];
        const prev = result.scores[0];
        const next = result.scores[1];

        if (prev > next && prev > neutral) {
            writeCommand("previous")
            prevButton.classList.toggle("active");

            setTimeout(function(){ 
                prevButton.classList.toggle("active");
            }, 1000);
        }
        else if(next > prev && next > neutral) {
            writeCommand("next")
            nextButton.classList.toggle("active");

            setTimeout(function(){ 
               nextButton.classList.toggle("active");
            }, 1000);
        }


    }, {
        includeSpectrogram: false,
        probabilityThreshold: 0.80,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
    });
}
