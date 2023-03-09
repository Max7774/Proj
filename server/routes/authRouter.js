const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const authRouter = express.Router();

authRouter
  .post('/login', async (req, res) => {
    console.log(req.body);
    try {
      const { password, name } = req.body;
      const validUser = await User.findOne({ where: { name } });
      if (!validUser) return res.status(401).send('Invalid user');
      const validPass = await bcrypt.compare(password, validUser.password);
      if (validPass) {
        req.session.user = validUser;
        return res.sendStatus(200);
      }
      return res.status(401).send('Password incorrect');
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .post('/register', async (req, res) => {
    console.log('============>', req.body);
    try {
      const { email, name, password } = req.body;
      const hashpass = await bcrypt.hash(password, 10);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          password: hashpass,
          name,
        },
      });
      if (!created) {
        return res.status(401).send('Email is already in use');
      }
      req.session.user = { name: user.name, id: user.id };
      return res.json(req.session.user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

authRouter.get('/check', async (req, res) => {
  if (req.session?.user?.id) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

authRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid').sendStatus(200);
});

module.exports = authRouter;
