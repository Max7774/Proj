const express = require('express');
const { Op } = require('sequelize');
const { Post, User } = require('../db/models');

const postsRouter = express.Router();

postsRouter
  .route('/')
  .get(async (req, res) => {
    const posts = await Post.findAll({
      order: [['updatedAt', 'DESC']],
      include: User,
    });
    res.json(posts);
  })
  .post(async (req, res) => {
    try {
      const newPost = await Post.create({ ...req.body.input });
      // const postWithUser = await Post.findByPk(newPost.id, { include: User });
      res.json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

postsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.params.id }, include: User });
      res.json(post);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  })
  .delete(async (req, res) => {
    console.log('+_+_+_+__+_+_+_+_+_+_+_+_', req.params);
    try {
      await Post.destroy({ where: { id: req.params.id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

postsRouter.route('/edit/:id').patch(async (req, res) => {
  try {
    const newPost = await Post.findOne({ where: { id: req.params.id } });
    newPost.body = req.body.body;
    newPost.title = req.body.title;
    newPost.save();
    res.json(newPost);
  } catch (error) {
    console.log(error);
  }
});

postsRouter.route('/search').post(async (req, res) => {
  try {
    const { input } = req.body;
    const foundPosts = await Post.findAll({
      where: {
        body: {
          [Op.substring]: input,
        },
      },
    });
    res.json(foundPosts);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = postsRouter;
