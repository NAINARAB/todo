import React from "react";
import { Link } from "react-router-dom";

function Stock(){
    return(
        <div><h2>hi from Home</h2>
        <Link to="/customer"><button>customer</button></Link></div>
    );
}

export default Stock;