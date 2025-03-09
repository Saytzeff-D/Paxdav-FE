import * as yup from 'yup'

export const quoteSchema = yup.object().shape({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    title: yup.string().required()
})