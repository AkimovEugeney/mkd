const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/registration',[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 8}),
] ,

async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Некорректные данные'})
        }

        const {firstName, lastName, frontDoor, appartamentNumber, email, password} = req.body

        const isUsed = await User.findOne({ email })

        if(isUsed){
            return res.status(300).json({message: 'Email is already used'})
        } 

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
            firstName,
            lastName,
            frontDoor,
            appartamentNumber,
            email,
            password: hashedPassword
        })
            

        await user.save()

        res.status(200).json({message: 'User created'})

    } catch (error) {
        console.log(error)
        res.status(200).json({message: 'User created'})
    }
})


router.post('/login',[
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists()
] ,

async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Некорректные данные'})
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })
        if (!user){
            return res.status(400).json({message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: 'Wrong password'})
        }

        const jwtSecret = 'eyJhbGciOiJIUz7648b3R12'

        const token = jwt.sign({id: user._id}, jwtSecret, {expiresIn: '1h'})

        res.json({token, id: user._id})



        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router