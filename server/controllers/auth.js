const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat; // stream-chat的实例
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
  try {
    const { fullName, username, password, phoneNumber } = req.body;

    // 创建 16 位十六进制数字的随机序列
    const userId = crypto.randomBytes(16).toString('hex');

    // 与stream建立连接，需要传递api的东西； 不应分享，要使用环境变量
    
    const serverClient = connect(api_key, api_secret, app_id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = serverClient.createUserToken(userId); // token for user

    // 将数据返回到前端
    res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    // 从数据库中查询与该特定用户名匹配的所有用户
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length) return res.status(400).json({ message: 'User not found' });

    const success = await bcrypt.compare(password, users[0].hashedPassword);

    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
    } else {
      res.status(500).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    ads
    console.log(error);

    res.status(500).json({ message: error });
  }
};



module.exports = { signup, login }