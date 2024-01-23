import axios from "axios"

const styleDiv = {
    width:"15rem",
    height:"10rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"gray",
    borderRadius:"1rem",
}
const styleInput = {
    opacity:"0",
    height:"90%",
    width:"90%",
    zIndex:"1"
}

const iStyle ={
    color:"black",
    position:"absolute",
    fontSize:"5rem",
    zIndex:"0"
}

async function upLoadFiles(files){
    await axios.post("/data",files);
    console("done")
}

function inputHandeller(event){
    const files = event.target.files;
    upLoadFiles(files);
}

function dropHandeller(event){
    console.log("files dropd")
    event.preventDefault();
    
    const files = []; 
    [...event.dataTransfer.items].forEach((item,i)=>{
        if(item.kind=="file") files.push(item.getAsFile());
    })
    upLoadFiles(files)
    console.log(files)
}

function dragOverHandeller(event){
    event.preventDefault();
}

function Video(){
    return <div style={styleDiv}
            onDrop={dropHandeller}
            onDragOver={dragOverHandeller}>

            <input type="file" name="video" accept="video/*" capture="environment" multiple style={styleInput}
            onChange={inputHandeller}/>

            <i className="fa-solid fa-upload"
                style={iStyle}></i>

    </div>
}

export default  Video;