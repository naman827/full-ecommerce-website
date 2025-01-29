import Users from "../models/userModel.js";

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role === 0)
      return res.status(400).json({ msg: "Admin Access Denied" });

    next();
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export default authAdmin