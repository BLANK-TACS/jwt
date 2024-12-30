const express = require('express')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {cookieOptions} = require('../configs/cookieConfig')

const router = express.Router()

router.get('/login', async (req, res) => {
    res.render('auth/login')
})

router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', (req, res) => {
    const user = {...req.body}

    const signupSchema = Joi.object({
        username: Joi.string().min(6).required().label('Username').messages({
            'string.empty': '{#label} is required',
            'string.min': '{#label} must be at least {#limit} long',
        }),
        password: Joi.string().min(6).required().label('Password').messages({
            'string.empty': '{#label} is required',
            'string.min': '{#label} must be at least {#limit} long',
        }),
        confirmPass: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .label('Confirm Password')
            .messages({
                'any.only': '{#label} must match with password',
            }),
    })

    const {error} = signupSchema.validate(req.body)

    if (error) {
        return res.render('auth/signup', {
            data: {...req.body},
            error: error.details[0],
        })
    }

    res.cookie('token', 'bla', cookieOptions)
    res.render('auth/signup')
})

router.post('/login', (req, res) => {
    console.log(req.cookies)
    res.sendStatus(200)
})

module.exports = router
