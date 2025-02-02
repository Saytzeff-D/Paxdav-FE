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
                        <div className="col-md-4">
                            <div class="card border-none serv-card">
                                <img class="card-img-top" src={each} alt="Card image" />
                                <div class="card-body">
                                    <h4 class="card-title">Shopify Development</h4>
                                    <p class="card-text text-muted">
                                        Custom, responsive websites designed to make your brand shine online
                                    </p>
                                    <a class="btn bg-quote text-white rounded-pill px-4">Request Quote</a>
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