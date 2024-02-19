const {Router} = require('express');
const router = Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const {userId}  = req.query
        const user = await User.find({_id: userId})

        res.json(user)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;