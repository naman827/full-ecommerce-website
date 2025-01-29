import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const userCtrl = {
  // Hash the password
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  // Create a new user instance
  createUser: async (name, email, password) => {
    const hashedPassword = await userCtrl.hashPassword(password);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  },

  // Register a user
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validate input fields
      if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      // Check if the user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "User already registered" });
      }

      // Create the user
      const newUser = await userCtrl.createUser(name, email, password);

      // Generate tokens
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      // Set the refresh token in a cookie
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refreshtoken",
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // Prevent CSRF attacks
      });

      // Return the user information and access token
      res.status(201).json({
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        accesstoken,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  // Refresh token
  refreshtoken: async (req, res) => {
    try {
      const rftoken = req.cookies?.refreshtoken; // Safely access the cookie

      if (!rftoken) {
        return res.status(400).json({ msg: "Please login or register" });
      }

      // Verify the refresh token
      jwt.verify(rftoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "Refresh token is invalid or expired" });
        }

        // Generate a new access token
        const accesstoken = createAccessToken({ id: user.id });

        // Respond with the new access token
        return res.json({ accesstoken });
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login:async(req,res)=>{
    try {
      const {email,password}=req.body
      const user =await Users.findOne({email})
      if(!user) return res.status(400).json({msg:"user doesn't exists"})

        const isMatch=bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"incorrect email or password"})

          const accesstoken=createAccessToken({id:user._id})
          const refreshtoken=createRefreshToken({id:user._id})

          res.cookie("refreshtoken", refreshtoken,{
            httpOnly:true,
            path:'/users/refreshtoken'
          });

        res.json({accesstoken})
    } catch (error) {
      res.status(500).json({msg:`error in logging user ${error.message}`})
    }
  },
  logout:async(req,res)=>{
    try {
      res.clearCookie('refreshtoken',{path:'/user/refreshtoken'})
      return res.json({msg:"user logout successfully"})
    } catch (error) {
      res.status(400).json({msg:`user does not logout${error.message}`})
    }
  },
  getuser:async(req,res)=>{
    try {
      const user = await Users.findById(req.user.id).select("-password")

      if(!user) return res.status(400).json({msg:"user not found!"})
      res.json(user)
    } catch (error) {
       return res.status(500).json({msg:error.message})
    }
  }
};

// Function to create an access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Function to create a refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export default userCtrl;
