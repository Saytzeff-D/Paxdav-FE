import React from "react";
import Serv1 from '../assets/serv_1.png'
import Serv2 from '../assets/serv_2.png'
import Serv3 from '../assets/serv_3.png'
import Serv4 from '../assets/serv_4.png'
import Serv5 from '../assets/serv_5.png'
import Serv6 from '../assets/serv_6.png'

const Expertise = ()=>{
    const serv = [Serv1, Serv2, Serv3, Serv4, Serv5, Serv6]
    return (
        <div className="container">
            <p className="text-white h1 pt-5">
                Our <span className="">|</span> Expertise
            </p>     
            <div className="row mx-auto w-100">
                {
                    serv.map((each, i)=>(
                        <div key={i} className="col-md-4">
                            <div className="card border-none serv-card">
                                <img className="card-img-top" src={each} alt="Card image" />
                                <div className="card-body">
                                    <h4 className="card-title">Shopify Development</h4>
                                    <p className="card-text text-muted">
                                        Custom, responsive websites designed to make your brand shine online
                                    </p>
                                    <a className="btn bg-quote text-white rounded-pill px-4">Request Quote</a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>       
        </div>
    )
}

export default Expertise