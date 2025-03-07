import React from "react";
import Portfolio from "./Portfolio";
import Expertise from "../components/Expertise";
import Contact from "../components/Contact";
import Header from "../components/Header";

const Home = ()=>{
    return (
        <div>
            <div className="">      
                <Header />          
                <Expertise />
                <Portfolio />
                <Contact />
            </div>
        </div>
    )
}

export default Home