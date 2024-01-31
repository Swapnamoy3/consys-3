async function ModelLoader(){
    const PATH3 = "http://127.0.0.1:5500/crash_detection/temp/crash_detection/model.json";
    let model = await tf.loadLayersModel(PATH3)
    return model;
}

let model;
async function init(){
    model = await ModelLoader();
    // console.log(model)
}
init();


function inputHandeller(event){
    const inputEle = document.querySelector("input");
    const files = inputEle.files;
    makePrediction(files);
}

async function makePrediction(files){
    let reader = new FileReader();
    reader.onload =()=>{
        let dataUrl = reader.result;
        document.querySelector("img").src = dataUrl;
    }
    reader.readAsDataURL(files[0]);

    let img = document.querySelector("img");
    let tensor = tf.browser.fromPixels(img).expandDims();
    // console.log(tensor)
    let ans = await model.predict(tensor).data();
    if(ans[1]>.5)
    console.log("crash",ans[1]);
    else
    console.log("No crash",ans[0]);
}

const submit = document.querySelector("button");
submit.addEventListener("click",inputHandeller)









