const express = require('express');
const cors = require('cors');

// 添加登录和注册路线
const authRoutes = require("./routes/auth.js");

const app = express();
// 为后端指定端口号
const PORT = process.env.PORT || 5000;

// 允许在节点应用程序内部调用环境变量
require('dotenv').config();

// 通过 app.use 来设置中间件。 这允许提出跨域请求
app.use(cors());
// 多了一个中间件，允许将 json 有效负载从前端传递到后端
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));