const Profile = require('../../models/Profile')

const index = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    if (
      profile.network.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Already send a network request' });
    }
    profile.network.unshift({ user: req.user.id });
    await profile.save();
    res.json(profile.network);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const deleteNetworkRequest = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (
      profile.network.filter(friend => friend.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: "Haven't send a request yet" });
    }
    const removeIndex = profile.network
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    profile.network.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.network);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

module.exports = { index, deleteNetworkRequest } 
