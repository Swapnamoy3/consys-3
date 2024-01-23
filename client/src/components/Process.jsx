import AccidentClip from "./AccidentClip";
import VehicleInvolved from "./VehicleInvolved";
import Video from "./Video";
import FeedBack from "./FeedBack";

const style = {
    display:"flex",
    width:"100swh",
    backgroundColor:"green",
    padding:"2rem",
    justifyContent:" space-between"
}


function Process(){
    return <div style={style}>
        <Video/>
        <AccidentClip/>
        <VehicleInvolved/>
        <FeedBack/>
    </div>
}

export default Process