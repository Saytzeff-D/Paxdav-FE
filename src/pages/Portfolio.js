import React from 'react'
import Port1 from '../assets/port_1.png'
import Port2 from '../assets/port_2.png'
import Port3 from '../assets/port_3.png'
import Port4 from '../assets/port_4.png'
import Port5 from '../assets/port_5.png'
import Port6 from '../assets/port_6.png'
import { useLocation } from 'react-router-dom'

const Portfolio = ()=>{
    const location = useLocation()
    const port = [
        {type: 'Education', image: Port1},
        {type: 'Business', image: Port2},
        {type: 'Portfolio', image: Port3},
        {type: 'Healthcare', image: Port4},
        {type: 'Real Estate', image: Port5},
        {type: 'E-commerce', image: Port6}
    ]
    return (
        <div>
            {
                location.pathname == '/portfolio'
                &&
                <p className='text-center text-white h1 pt-5'>
                    Portfolio
                </p>
            }
            <div className='row mx-auto w-100 my-5 px-5'>
                <div className='col-md-6'>
                    <p className='text-white display-4 fw-semibold'>
                        Building brands that stand the test of time 
                    </p>
                </div>
                <div className='col-md-6'>
                    <p className='text-muted py-4 px-md-4'>
                        At PaxDav, we don't just build websites and create designs—we craft experiences that solve real business problems and drive measurable success. Explore how our solutions have helped businesses like yours grow, engage, and stand out in their industry.
                    </p>
                </div>
            </div>
            <div className='container my-5'>
                <div className='row mx-auto w-100'>
                    {
                        port.map((each, i)=>(
                            <div key={i} className='col-md-6 my-4'>
                                <div className="card bg-dark">
                                    <img className="card-img-top" src={each.image} alt="Card image" />
                                    <div className="card-img-overlay">
                                        <div className='port-caption bg-white text-dark fs-5 text-uppercase fw-semibold px-2 py-3 rounded'>
                                            {each.type} Website
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Portfolio