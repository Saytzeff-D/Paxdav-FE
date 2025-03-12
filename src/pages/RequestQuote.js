import * as React from 'react'
import QuoteImage from '../assets/request_quote.png'
import { useFormik } from 'formik'
import { quoteSchema } from '../schema'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'

const RequestQuote = (props)=>{
    const navigate = useNavigate()
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#000000',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const { uri } = props
    const [isLoading, setIsLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [response, setResponse] = React.useState('')
    const {handleBlur, handleChange, handleSubmit, handleReset, errors, touched, values} = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            title: ''
        },
        validationSchema: quoteSchema,
        onSubmit: (values)=>{
            setResponse('')            
            handleOpen(true)            
        }
    })
    const requestQuote = (values, type)=>{
        values.type = type
        console.log(values)
        setIsLoading(true)
        axios.post(
            `${uri}quote/create`,
            values
        ).then(res=>{            
            setIsLoading(false)
            type == 'Upwork' ?
            window.open('https://upwork.com') : navigate(`/chat-room/${res.data.saved._id}`)
        }).catch(err=>{
            setResponse('An error has occured')
            setIsLoading(false)
        })
    }
    return (
        <div className='container py-5'>
            <p className='text-white fs-1'>
                Request a quote 
            </p>
            <div className='row'>
                <div className='col-md-5 mb-4'>
                    <p className='fs-5'>
                        Website Design + SEO Optimization
                    </p>
                    <div className='px-2'>
                        <div className='bg-quote-form rounded-xl py-5 px-3'>
                            <p className='quote-form-text fs-4 fw-light'>
                                Enter Request
                            </p>
                            <input name='fullname' onChange={handleChange} onBlur={handleBlur} id='quote-input' className={`form-control form-control-lg mb-4 bg-quote-form ${errors.fullname && touched.fullname ? 'is-invalid' : touched.fullname && !errors.fullname && 'is-valid'}`} placeholder='Full Name' />
                            <input name='email' onChange={handleChange} onBlur={handleBlur} id='quote-input' className={`form-control form-control-lg mb-4 bg-quote-form ${errors.email && touched.email ? 'is-invalid' : touched.email && !errors.email && 'is-valid'}`} placeholder='Email Address' />
                            <input name='title' onChange={handleChange} onBlur={handleBlur} id='quote-input' className={`form-control form-control-lg mb-4 bg-quote-form ${errors.title && touched.title ? 'is-invalid' : touched.title && !errors.title && 'is-valid'}`} placeholder='Project Title' />
                            <button onClick={handleSubmit} className='btn-block rounded-pill btn bg-quote text-white w-100 mb-4'>
                                Request Quote
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-md-7 mb-4 p-5'>
                    <img src={QuoteImage} className="img-fluid" />   
                </div>
            </div>

            <Modal
                open={open}                
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Would you like to continue on Upwork?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Get a fast and secure quote on your preferred platform.
                </Typography>
                <div className='d-flex justify-content-around mt-4'>
                    <Button onClick={()=>requestQuote(values, 'Upwork')} disabled={isLoading} className='bg-quote text-white fw-bold'>continue on Upwork</Button>
                    <Button onClick={()=>requestQuote(values, 'Paxdav')} disabled={isLoading} className='fw-bold text-white'>stay on this platform</Button>
                </div>
                </Box>
            </Modal>
        </div>
    )
}

export default RequestQuote