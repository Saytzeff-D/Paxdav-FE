import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = ()=>{
    const [isSubscribing, setIsSubscribing] = useState(false)
    return (
        <div className="footer">
            <div className="container">
                <p className="display-2 fw-500 text-white">
                    Make Sure of Your Choice Then Discuss With Us
                </p>
                <div className="newsletter d-flex justify-content-center my-5">
                    <div className="col-md-8">                        
                        <div className="row w-100 mx-auto">
                            <div className="col-md-8 mb-2">
                                <input placeholder="Email Address" className="bg-quote-input form-control col-10" />                                
                            </div>
                            <div className="col-md-4 mb-2">
                                <button disabled={isSubscribing} className="btn bg-quote rounded-pill fw-bold text-white rounded-0 text-white">
                                    {
                                        isSubscribing
                                        ?
                                        'Subscribing...'
                                        :
                                        'Request Quote'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-auto my-5">
                    <div className="col-md-9">
                        <div className="col-md-6">
                            <p className="fw-bolder text-white display-3">
                                PaxDav Technologies
                            </p>
                            <p className="text-white">
                                PaxDav is a leading digital solutions provider, crafting innovative websites and online experiences tailored to elevate brands and drive success."
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="fs-6">
                            <div>
                                <p className="text-white fs-5 pb-1 my-0">Pages</p>
                            </div>
                            <div>
                                <Link className="text-white text-decoration-none pb-1" to={'services'}>
                                    Services
                                </Link>
                            </div>
                            <div>
                                <Link className="text-white text-decoration-none pb-1" to={'portfolio'}>
                                    Portfolios
                                </Link>
                            </div>
                            <div>
                                <Link to={'/about'} className="text-white text-decoration-none pb-1">About Us</Link>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center text-white py-3">
                CopyRight &copy; {new Date().getFullYear()}.
            </p>
        </div>
    )
}

export default Footer