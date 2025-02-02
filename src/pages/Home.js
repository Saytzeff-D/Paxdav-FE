import React from "react";
import Portfolio from "./Portfolio";
import Expertise from "../components/Expertise";
import Contact from "../components/Contact";

const Home = ()=>{
    return (
        <div>
            <div className="">                
                <Expertise />
                <Portfolio />
                <Contact />
            </div>
        </div>
    )
}

export default Home