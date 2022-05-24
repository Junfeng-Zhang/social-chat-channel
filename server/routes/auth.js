const express = require('express');

const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

/* 两条不同的路线； 两条路由都将是 post 路由，因为我们必须将数据从前端发送到后端；
并且只有使用 post 路由才能发送有效负载
*/

// 1. forward slash sign up
router.post('/signup', signup);
// 2. forward slash login
router.post('/login', login);

module.exports = router;