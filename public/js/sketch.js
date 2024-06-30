// Sequence permette di triggerare a tempi regolari, non modulabili

let mySynth;
let panner;
let mySeq;

//  Beats      1     2                         3                     4             1       2                    3                     4            1            2                    3                      4                    5
let notes = ["D4", ["F4", null, null, "D4"], [null,"D4", "G4",null],["D4", "C4"], ["D4"],["A4",null,null,"D4"],[null,"D4","Bb4",null],["A4","F4",],["D4","A4"],["D5",null,"D4","C4"],[null,"C4","A3",null],["E4",null,"D4",null],[null,null,null,null]];
let amp;

function setup() {

                frameRate(30)
                createCanvas(windowWidth,windowHeight)
                background(200);


// ----------------------------- Algoritmo di sintesi (definizione strumenti)
    
                panner  = new Tone.Panner().toDestination();
                mySynth = new Tone.Synth({
                                          oscillator: {
                                                        type: "square" 
                                                        },
                                          envelope: { 
                                                      attack:  0.02, 
                                                      decay:   0.05,  
                                                      sustain: 0.5,
                                                      release: 0.8  
                                                      }
                                          }).connect(panner);

// ----------------------------- Definizione sequencing
    
                                                  
                mySeq = new Tone.Sequence(      // beat  arg   valuta la funzione ad ogni beat 
                                          function(time, note) { 
                                                                amp  = 0.6;
                                                                
                                                                mySynth.triggerAttackRelease(note, 0.1, time, amp)
                                                                }, 
                                                                notes, '4n'); 
                                                //               arg    beat  (arg della funzione)

                Tone.Transport.bpm.value = 140;  // Setta i BPM
                Tone.Transport.start();         // Accende il Clock 

              // var myCanvas = createCanvas(windowWidth,windowHeight)
              // myCanvas.parent("canvas")
}

// 16n: sedicesimi (4 per beat)
// 8n: ottavi (2 per beat)
// 4n: quarti (1 per beat)
// 2n: metà (2 beats per nota)
// 1n: intero (4 beats per nota)
// Pause: null


let write = ["Benvenuto","Welcome","Bievenue","Bienvenido"]

function welcome(nome,x_pos,y_pos){

                                    // ctx.strokeWeight(2)
                              textSize(50)
                              fill(100)
                              stroke(0)
                              strokeWeight(2)
                              text(nome,x_pos,y_pos)
}

let a = 1
function draw() {

                let x = Math.floor(Math.random()*4);
                let x2 = Math.floor(Math.random()*4);


                if (a <= 100){
                  welcome(write.at(x),random(-100,windowWidth),random(-100,windowHeight+100));

                  a = a + 1

                }else if(a == 101){
                  background(200)
                  a = 1
                }


}

let toneStart = 0;

function mousePressed(){   
                        if (toneStart = 0){
                                           Tone.start();
                                           toneStart = 1;
                                           }
                        mySeq.start();
}

function mouseReleased(){  
                         mySeq.stop();
}

