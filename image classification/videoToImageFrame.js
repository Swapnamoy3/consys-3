const video = document.querySelector("video")
video.src = "http://127.0.0.1:5500/videoplayback.mp4"
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d");
video.hidden = true;
async function ModelLoader(){
    const PATH3 = "http://127.0.0.1:5500/crash_detection/temp/crash_detection/model.json";
    let model = await tf.loadLayersModel(PATH3)
    return model;
}

let model;
async function init(){
    model = await ModelLoader();
    console.log("model")
}
init().then(()=>{
    video.hidden = false;
    
    video.play();
    video.addEventListener("play",()=>{update(model)})
    
    
})

let st = true;
let list = [];
async function update(){
    
    if(model==undefined) return;
    if(video.paused == true) return;
    console.log("its working")
    
    ctx.drawImage(video,0,0,256,256);
    console.log("its working")
    let tensor = tf.browser.fromPixels(canvas).resizeNearestNeighbor([250,250]).expandDims();
    console.log("its working")
    let ans = await model.predict(tensor).data();
    console.log("its working")
    
    console.log(ans);
    if(ans[0]>.5 ){
        console.log("an accident has occoured maybe")
        list.push(video.currentTime);
        console.log(list);
        
    }
    requestAnimationFrame(update)
}

