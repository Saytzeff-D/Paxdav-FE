import React from "react";
import ContactBanner from '../assets/about_banner.png'

const Contact = ()=>{
    return (
        <div className="container py-4">
            <p className='text-center text-white h1 pt-5'>
                About Us
            </p>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <p className="text-center text-muted">
                        We specialize in transforming ideas into impactful digital solutions. Our team is dedicated to delivering excellence through innovative designs, seamless development, and tailored strategies.
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn bg-quote rounded-pill fw-bold text-white px-4 text-white">
                    Request Quote
                </button>
            </div>
            <img src={ContactBanner} className="img-fluid my-5" />
            <p className='text-center text-white h1 pt-5'>
                Contact Us
            </p>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <p className="text-center text-muted">
                        Ready to bring your ideas to life? Let’s get started!
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center my-4">
                <div className="d-flex justify-content-between flex-md-row flex-column">
                    <div className="text-white mx-md-5 my-4 contact border p-4">
                        <p className="py-0 my-0">Email</p>
                        <p>paxdav.tech@gmail.com</p>
                    </div>
                    <div className="text-white mx-md-5 my-4 contact border p-4">
                        <p className="my-0">Phone</p>
                        <p>+234 803 9459 694</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact