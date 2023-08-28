const { User } = require("../models/User");

exports.fetchUserByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(id);
    let user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};
exports.UpdateUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};
