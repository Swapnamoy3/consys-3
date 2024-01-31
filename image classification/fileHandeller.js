let prev = 0; 

//handelling of file storing it and setting thumbnail
const input_box = document.querySelector(".input_box");
const drop = document.querySelector(".dropFiles");
const video = document.querySelector("video")
const input =  document.querySelector("input");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const h1 = document.querySelector("h1")
const h4 = document.querySelector("h4")
const reader = new FileReader();
      reader.onload=()=>{
        prev = 0;   
        let images = document.querySelectorAll("img");
        images = Array.from(images)
        images.map((ele)=>{ele.parentNode.removeChild(ele)})
          let dataUrl = reader.result;
          console.log(dataUrl)
          video.src = dataUrl;
      }


input_box.addEventListener("click",clickHandeller);
input.addEventListener("change",inputHandeller);
drop.addEventListener("drop",fileDropHandeller)
drop.addEventListener("dragover",fileDragDropHandeller)


///setting the video frame as background
function setBackground(){
    canvas.width = video.width;
    canvas.height = video.height;
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    const imageData = canvas.toDataURL("image/png");
    input_box.style.backgroundImage = `url(${imageData})` 
}
try{
    video.onloadeddata = setBackground;
} catch(err){
    console.log(err);
}


//click of the drop box triggers click of input box
function clickHandeller(){
    input.click();
}

//when input is clicked
function inputHandeller(){
    h4.hidden = true;
    h1.hidden = true;
    drop.style.border = "none";
    reader.readAsDataURL(input.files[0])
}

// when file is dropped
function fileDropHandeller(event){
    event.preventDefault();
    h4.hidden = true;
    h1.hidden = true;
    drop.style.border = "none";
    if(event.dataTransfer.items){
        const items = event.dataTransfer.items;
        if([...items].length>1) console.log("only one video will be processed at a time");
        const file = items[0].getAsFile();
        
        //read the file
        reader.readAsDataURL(input.files[0])
        
    }else{
        const items = event.dataTransfer.files;
        if([...items].length>1) console.log("only one video will be processed at a time");
        const file = items[0];
        
        
        //read the file
        reader.readAsDataURL(input.files[0])
    }

}


// to prevent default behivour of file dropping
function fileDragDropHandeller(event){
    event.preventDefault();
}



///starting the model

let list = [];




//loding model
async function lodeModel(){
    const PATH3 = "http://127.0.0.1:5500/crash_detection/temp/crash_detection/model.json";
    let model = await tf.loadLayersModel(PATH3)
    return model;
}




const start = document.querySelector("button");
start.onclick = async ()=>{
    console.log("wait");
    const model = await lodeModel();
    console.log("loding done");
    async function update(){
    
        if(model==undefined) return;
        if(video.paused == true) return;
        
        ctx.drawImage(video,0,0,256,256);
        let tensor = tf.browser.fromPixels(canvas).resizeNearestNeighbor([250,250]).expandDims();
        let ans = await model.predict(tensor).data();
        
        // console.log(ans);
        if(ans[0]>.999 ){
            console.log("an accident has occoured maybe")
            if(video.currentTime >prev + 2 ){
                prev = video.currentTime;
                list.push(video.currentTime);
            }
            
            if(video.currentTime === video.duration){
                return;
            }
        }
        requestAnimationFrame(update)
    }
    video.play();
     console.log("is predicting");
     await update();
}


video.onpause = ()=>{
    if(list.length>0) document.querySelector("h3").innerText = "Aaccident has occoured";
    // let prev = -1; 
    // for(i of list){
        // if(i-prev>=1){
            let img = document.createElement("img");
            video.currentTime = list[0];
            ctx.drawImage(video,0,0,video.height,video.width);
            const imageData = canvas.toDataURL("image/png");
            img.src = imageData;
            document.querySelector("body").appendChild(img);

            // prev = i;
        // }
    // }

}



