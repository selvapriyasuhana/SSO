const express = require('express');
const passport = require('passport');
const { googleLogin, googleCallback, profile } = require('../Controller/controller');

const router = express.Router();

router.get('/auth/google', googleLogin);
router.get('/auth/google/callback', googleCallback);
router.get('/profile', profile);

module.exports = router;
