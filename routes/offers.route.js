const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')

const fileUpload = require('express-fileupload');
router.use(fileUpload({}));




router.post('/upload', [],

    async (req, res) => {
        try {

            if(req.files){
                req.files.image.mv('uploads/'+req.files.image.name);
                // res.end(req.files.image.name);
                let fileName = Date.now().toString()+req.files.image.name
                res.end('Image upload')
            } else {
                const {title, description, userId,appartamentNumber,firstName,lastName,date,content} = req.body
                const post = await new Post({
                    title,
                    owner: userId,
                    description,
                    appartamentNumber:appartamentNumber,
                    firstName:firstName ,
                    lastName: lastName,
                    active: true,
                    date: date,
                    numberFor:1,
                    numberOf:0,
                    voted: true,
                    content: content

                })

                await post.save()

                res.json(post)
                res.status(200).json({message: 'post created'})
            }


        } catch (error) {
            console.log(error)
        }
    })

router.get('/upload', async (req,res)=>{
    try {
        const {userId} = req.query
        const post = await Post.find().sort({_id:-1})

        res.json(post)


    } catch (error) {
        console.log(error)
    }
})

router.put('/numberFor/:id', async (req,res)=>{
    try {
        const {numberFor,id,userId} =req.body
        const post = await Post.findOne({_id:id})
        post.numberFor = numberFor
        post.whoVoted = [...post.whoVoted,userId]
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
    }
})

router.put('/numberOf/:id', async (req,res)=>{
    try {
        const {numberOf,id,userId} =req.body
        const post = await Post.findOne({_id:id})
        post.numberOf = numberOf
        post.whoVoted = [...post.whoVoted,userId]
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
    }
})


router.put('/editing/:id', async (req,res)=>{
    try {
        const {title,des,content,id} =req.body
        const post = await Post.findOne({_id:id})
        post.title = title
        post.description = des
        post.content = content
        await post.save()
        res.json(post)


    } catch (error) {
        console.log(error)
    }
})


module.exports = router