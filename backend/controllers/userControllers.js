const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModels.js");

exports.home = (req, res) => {
  return res.status(200).json({
    message: "Everything runs good",
  });
};

exports.signup = async (req, res) => {
  let { name, email, password, bio } = req.body;

  if (!name || !email || !password || !bio) {
    return res.status(400).json({
      success: false,
      message: "Every fields are necessary",
    });
  }

  const validate = emailValidator.validate(email);
  if (!validate) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  try {
    password = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password, bio });
    res.status(200).json({
      success: true,
      message: "User signup successfully",
      data: user,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        success: false,
        message: "Account already exist",
      });
    }
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is neccessary",
    });
  }

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user || (await !bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid credintials",
      });
    }

    const token = user.JwtToken()
    user.password = null


    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: 'Lax', // Use 'Lax' for local development
      secure: false // false for local development (HTTP)
    };
    

    console.log('Token:', token);
    console.log('Cookie Options:', cookieOptions);

    res.cookie("token",token,cookieOptions)
    return res.status(200).json({
        success : true,
        data : user
    })

  } catch (err) {
    return res.status(400).json({
        success : false,
        message : err.message
    })
  }
};


exports.getUser = async (req, res) => {
  const userId = req.user?.id;
  console.log('User ID:', userId);
  
  if (!userId) {
      return res.status(400).json({
          success: false,
          message: "User ID is not available"
      });
  }

  try {
      const user = await userModel.findById(userId);
      console.log("User:", user);
      res.status(200).json({
          success: true,
          data: user
      });
  } catch (err) {
      return res.status(400).json({
          success: false,
          message: err.message
      });
  }
};



exports.logOut = (req,res)=>{
    try{
        res.cookie("token",null)
        res.status(200).json({
            success : true,
            message : "User logged out"
        })
    }
    catch(err){
        return res.status(400).json({
            success : false,
            messsage : err.message
        })
    }
}