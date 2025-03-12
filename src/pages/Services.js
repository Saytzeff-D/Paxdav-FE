import React from "react";
import Serv1 from '../assets/serv_1.png';
import Serv2 from '../assets/serv_2.png';
import Serv3 from '../assets/serv_3.png';
import Serv4 from '../assets/serv_4.png';
import Serv5 from '../assets/serv_5.png';
import Serv6 from '../assets/serv_6.png';

const Services = () => {
    const baseServices = [
        { title: "Shopify Development", text: "Custom, responsive websites designed to make your brand shine online" },
        { title: "E-commerce Solutions", text: "Seamless e-commerce solutions tailored to grow your business" },
        { title: "SEO Optimization", text: "Boost your online presence with cutting-edge SEO strategies" }
    ];

    const images = [Serv1, Serv2, Serv3, Serv4, Serv5, Serv6];

    // Map images to the base services (duplicates the services for pairing)
    const services = images.map((img, index) => ({
        img,
        title: baseServices[index % baseServices.length].title,
        text: baseServices[index % baseServices.length].text
    }));

    return (
        <div>
            <p className='text-center text-white h1 pt-5'>
                Our Services
            </p>
            <div className="container py-5">
                <div className="row mx-auto w-100">
                    {services.map((service, i) => (
                        <div className="col-md-4" key={i}>
                            <div className="card border-none serv-card">
                                <img className="card-img-top" src={service.img} alt="Card image" />
                                <div className="card-body">
                                    <h4 className="card-title">{service.title}</h4>
                                    <p className="card-text text-muted">{service.text}</p>
                                    <a className="btn bg-quote text-white rounded-pill px-4">Request Quote</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;