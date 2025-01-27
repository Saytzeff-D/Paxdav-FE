import React from "react";
import Founder from '../assets/founder.png'
import CoFounder from '../assets/cofounder.png'
import WhoWeAre from '../assets/whoweare.png'
import OurMission from '../assets/mission.png'
import WhyChooseUs from '../assets/whychoose.png'
import Badge from '../assets/Badge.png'

const AboutUs = ()=>{
    return (
        <div className="container py-5">
            <p className="text-center display-4 fw-500">
                About Us
            </p>
            <div className="row mx-auto py-5">
                <div className="col-md-5 px-5">
                    <p className="display-6 fw-500 text-center my-0">Founder</p>
                    <img src={Founder} className="img-fluid" />
                    <p className="text-center my-0 fs-4">Promise S. Ajadi</p>
                    <p className="text-center fs-4">A Shopify Developer</p>
                </div>
                <div className="col-md-7 px-4">
                    <p className="fw-500 fs-3">
                        Meet Promise Silas Ajadi
                    </p>
                    <div className="text-muted fs-4">
                        <p>
                            As a multifaceted professional, I excel in diverse fields. With a strong foundation in medical and healthcare practices, honed from my studies at Ladoke Akintola University of Technology, I bring a unique perspective to our team.
                        </p>
                        <p>
                            Beyond healthcare, I'm a skilled Shopify developer, graphic designer, and video editor, leveraging technology to drive innovative solutions. With 6 years of experience as a freelancer, I've refined my expertise and adaptability.
                        </p>
                        <p>
                            At 22, I'm driven by my passion for delivering exceptional results. As a God-fearing individual, I'm committed to integrity, compassion, and excellence in all aspects of my work.
                        </p>
                        <p>
                            I'm excited to bring my skills and experience to our team, driving success and making a meaningful impact.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mx-auto py-5">
                <div className="col-md-7 px-4">
                    <p className="fw-500 fs-3">
                        Meet David O. Atanda
                    </p>
                    <div className="text-muted fs-4">
                        <p>
                            David Ololade Atanda is a multifaceted individual with a strong passion for pharmaceutical sciences and web development. As an undergraduate student of Pharmacy at Obafemi Awolowo University, he is driven to make a meaningful impact in the field of drug development.
                        </p>
                        <p>
                            Beyond his academic pursuits, David is a skilled web developer with a knack for crafting intuitive and user-friendly websites for businesses and organizations. His expertise in web development has enabled him to provide innovative solutions for clients seeking to establish a strong online presence.
                        </p>
                        <p>
                            Currently, he serves as the Backend Engineer at Achilles Drill, an Edutech company  dedicated to providing cutting-edge educational resources for medical students in Nigeria. Through his work, he aims to leverage technology to enhance the learning experience and improve healthcare outcomes.
                        </p>                        
                    </div>
                </div>
                <div className="col-md-5 px-5">
                    <p className="display-6 fw-500 text-center my-0">Co-Founder</p>
                    <img src={CoFounder} className="img-fluid" />
                    <p className="text-center my-0 fs-4">David O. Atanda</p>
                    <p className="text-center fs-4">A Website Developer</p>
                </div>
            </div>

            <div className="row mx-auto py-5">
                <div className="col-md-6 px-5">
                    <img src={WhoWeAre} className="img-fluid" />                                           
                </div>
                <div className="col-md-6 px-5">
                    <p className="display-6 fw-500">Who We Are</p>
                    <p className="text-muted fs-3">
                        At PaxDav, we’re a team of passionate creators, strategists, and problem-solvers dedicated to bringing your ideas to life. From crafting cutting-edge websites to designing eye-catching visuals and driving online growth, we’re here to transform your vision into tangible results.
                    </p>
                </div>
            </div>

            <div className="row mx-auto py-5">
                <div className="col-md-5 px-5">
                    <p className="display-6 fw-500">Our Mission</p>
                    <p className="text-muted fs-4">
                        To empower businesses of all sizes by delivering exceptional digital solutions that inspire growth, spark innovation, and build lasting relationships.
                    </p>
                </div>
                <div className="col-md-7 px-5">
                    <img src={OurMission} className="img-fluid" />                                           
                </div>
            </div>

            <div className="row mx-auto py-5">
                <div className="col-md-6 px-5">
                    <img src={WhyChooseUs} className="img-fluid" />                                           
                </div>
                <div className="col-md-6 px-5">
                    <p className="display-6 fw-500">Why Choose Us</p>
                    <div className="d-flex">
                        <div className='pe-3'>
                            <img src={Badge} width='100px' height='100px' className='img-fluid' />
                        </div>
                        <div>
                            <p className="text-muted fs-5">
                                Tailored Solutions: Every business is unique, and so are our strategies. We don’t believe in one-size-fits-all approaches.
                            </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className='pe-3'>
                            <img src={Badge} width='100px' height='100px' className='img-fluid' />
                        </div>
                        <div>
                            <p className="text-muted fs-5">
                                Expertise Across Niches: From web development to social media management, our team has the expertise to cover all your digital needs.
                            </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className='pe-3'>
                            <img src={Badge} width='60px' height='60px' className='img-fluid' />
                        </div>
                        <div>
                            <p className="text-muted fs-5">
                                Results-Driven: We measure success by the value we create for your business.
                            </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className='pe-3'>
                            <img src={Badge} width='80px' height='80px' className='img-fluid' />
                        </div>
                        <div>
                            <p className="text-muted fs-5">
                                Collaborative Process: We work hand-in-hand with our clients to ensure their vision is at the core of every solution.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
