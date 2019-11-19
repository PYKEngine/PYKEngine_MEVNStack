const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const { generateJWT } = require("../../services/admin-service")
const Admin = require("../../models/Admin")
const Profile = require("../../models/Profile")
const Post = require("../../models/Posts")
const { validationResult } = require('express-validator/check')

const index = async (req, res) => {
  if (req.user.is_admin) {
    try {
      const admin = await Admin.findById(req.user.id).select("-password")
      return res.status(200).json({ message: admin });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else {
    return res.status(500).json({ msg: 'You must be an admin to do this action' });
  }
}

const registerAdmin = async (req, res) => {
  if (req.user.is_admin) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let admin = await Admin.findOne({ email })
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })
      admin = new Admin({
        name,
        email,
        avatar,
        password
      });
      const salt = await bcrypt.genSalt(10)
      admin.password = await bcrypt.hash(password, salt)
      await admin.save()
      const token = generateJWT(admin)
      return res.status(200).json({ token: token })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  } else {
    return res.status(500).json({ msg: 'You must be an admin to do this action' });
  }
}

const loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }
    const token = generateJWT(admin);
    return res.status(200).json({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
}

const deleteById = async (req, res) => {
  if (req.user.is_admin) {
    try {
      // Remove user posts
      await Post.deleteMany({ user: req.params.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.params.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.params.id });

      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    return res.status(500).json({ msg: 'You must be an admin to do this action' });
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
}

const deletePost = async (req, res) => {
  if (req.user.is_admin) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      await post.remove();
      res.json({ msg: 'Post removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
  } else {
    return res.status(500).json({ msg: 'You must be an admin to do this action' });
  }
}

module.exports = {
  index,
  loginAdmin,
  registerAdmin,
  getAllProfiles,
  getProfileById,
  deleteById,
  getAllPosts,
  getPostById,
  deletePost
} 