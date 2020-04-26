const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.send('We are on posts');
});

router.get('/sepecific', (req, res) => {
    res.send('We are on posts sepecific');
});

// Get all data from database for given model
router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({message: err});
    }
});

// Add posts to database
// Posts on localhost:3000/posts
router.post('/', (req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
});

// Add posts to database with async-await
// POST on localhost:3000/posts/with-async-await
router.post('/with-async-await', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message: err});
    }
});

// Get specific post from database
router.get('/:postId', async (req, res) => {
    console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({message: err});
    } 
});

// Delete post
router.delete('/:postId', async (req, res) => {
    console.log(req.params.postId);
    try {
        console.log(2);
        const removedPost = await Post.remove({_id: req.params.postId});
        console.log(3);
        res.json(removedPost);
        console.log(4);
    } catch (err) {
        console.log(5);
        res.json({message: err});
    }
});

// Update a post
router.patch('/:postId', async (req, res) => {

    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, 
            {$set: {
                title: req.body.title
            }});
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
    
});

module.exports = router;