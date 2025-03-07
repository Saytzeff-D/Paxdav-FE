import React from 'react'

const Header = ()=>{
    return (
        <div className='header py-md-5'>
            <div className='d-md-none d-block '>
                <div className='d-flex justify-content-center'>
                    <div className='col-md-6 py-md-5 mt-md-5'>
                        <p className='display-1 text-center fw-bold pt-5 px-md-0 px-4'>
                            Creating <span className='text-paxdav'>brands</span> and digital <span className='text-paxdav'>solutions</span>
                        </p>
                        <p className='text-center'>
                            We design exceptional brands, products, web apps, websites for  startup and enterprises. 
                        </p>
                        <div className='d-flex justify-content-center my-5'>
                            <button className="btn bg-quote rounded-pill fw-bold py-2 px-4 mx-2 rounded-0 text-white">
                                Request Quote
                            </button>
                            <button className="btn btn-light py-2 px-4 mx-2 rounded-pill fw-bold rounded-0">
                                View Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>            
            <div className='d-md-block d-none'>
                <div className='d-flex justify-content-center'>
                    <div className='py-md-5 mt-md-5 col-md-6'>
                        <p className='text-center display-1 fw-bold pt-4'>
                            Creating <span className='rounded-pill bg-quote px-5 py-0'>brands</span>
                        </p>
                        <div className='d-flex justify-content-center'>
                            <div className='col-md-8'>
                                <p className='text-center display-1 fw-bold'>
                                    and digital
                                </p>
                            </div>
                            <div className='col-md-4 d-md-block d-none'>
                                <p className=''>
                                    We design exceptional brands, products, web apps, websites for  startup and enterprises. 
                                </p>
                            </div>
                        </div>                
                        <p className='text-center display-1 fw-bold'>
                            <span className='rounded-pill bg-quote px-5 py-0'>solutions</span>
                        </p>
                        <div className='d-flex justify-content-center my-5'>
                            <button className="btn bg-quote rounded-pill fw-bold py-2 px-4 mx-2 rounded-0 text-white">
                                Request Quote
                            </button>
                            <button className="btn btn-light py-2 px-4 mx-2 rounded-pill fw-bold rounded-0">
                                View Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-3'>
                <div className='d-flex flex-wrap justify-content-around text-dark'>
                    <p><i className='fa fa-star text-paxdav'></i> Web Development</p>
                    <p><i className='fa fa-star text-paxdav'></i> Shopify Development</p>
                    <p><i className='fa fa-star text-paxdav'></i> Graphics Design</p>
                    <p><i className='fa fa-star text-paxdav'></i> Social Media Development</p>
                    <p><i className='fa fa-star text-paxdav'></i> UI/UX Design</p>
                    <p><i className='fa fa-star text-paxdav'></i> App Development</p>
                </div>
            </div>
        </div>
    )
}

export default Header