const {Router} = require('express');
const router = Router();
const Questions = require('../models/Questions');


router.post('/send', [],

    async (req, res) => {
        try {
            const {title, des, userId} = req.body
            const questions = await new Questions({
                userId,
                title,
                des,
            })

            await questions.save()

            res.json(questions)
            res.status(200).json({message: 'Question send'})
        }
        catch
            (error)
        {
            console.log(error)
        }
    })


module.exports = router;