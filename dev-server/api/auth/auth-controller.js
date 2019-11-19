const bcrypt = require("bcryptjs")
const { generateJWT } = require("../../services/auth-service")
const User = require("../../models/Users")
const { validationResult } = require('express-validator/check')

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    return res.status(200).json({ message: user });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const token = generateJWT(user);
    return res.status(200).json({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = { index, login } 