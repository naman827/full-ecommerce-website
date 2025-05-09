import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication" });

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export default auth;
