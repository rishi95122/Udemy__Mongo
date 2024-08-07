
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import registerSchema from "../mongo.js";
import dotenv from "dotenv"
dotenv.config()
var digits = "0123456789";
let OTP = "2";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass:  process.env.PASS,
  },
});

export const register = async (req, res) => {
  const exist = await registerSchema.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (exist) {
   
    return res.status(401).send("Username or email already registered!!");
  } else {
    const inserted = await registerSchema.insertMany({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      user: req.body.user,
    });
    if (inserted) return res.status(201).json("inserted");
    else {
      res.status(401).json("Error");
    }
  }
};
export const forgot = async (req, res) => {
  const result = await registerSchema.findOne({ email: req.body.email });
  if (!result) return res.status(401).send("User does not exist");
  const data = await registerSchema.findOne({ email: req.body.email });
  if (data.otp != req.body.otp) return res.status(401).send("Invalid Otp");
  else {
    const valid = await registerSchema.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } }
    );
    if (valid) return res.status(201).send("Password Updated");
  }
};

export const login = async (req, res) => {

  const data = await registerSchema.findOne({ email: req.body.email });

  if (data.otp != req.body.otp) return res.status(401).send("Invalid Otp");
  else {
    const result = await registerSchema.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!result) return res.status(401).send("Invalid Credentials");
  }
  const token = jwt.sign({ username: data.username }, "jwtkey");
  const { username, email, user } = data;
  const obj = { username, email, user };
 
  OTP = "";
 
	res.cookie("access_token", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000,
		httpOnly:true,
		secure:true,
		sameSite: 'None'
	});
	
	return res.status(200).json(obj);
};

export const logout = async (req, res) => {
	console.log("jdgfet",req.cookies.access_token)
	try {
			res.clearCookie("access_token", {
		httpOnly:true,
		secure:true,
		sameSite: 'None'});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const mail = async (req, res) => {
  const result = await registerSchema.findOne({ email: req.body.email });
  if (!result) return res.status(401).send("User does not exist");

  for (let i = 0; i < 5; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  const valid = await registerSchema.updateOne(
    { email: req.body.email },
    { $set: { otp: OTP } }
  );

  transporter.sendMail(
    {
      from: "Courses@gmail.com",
      to: req.body.email,
      subject: "Login",
      text: `Your Otp for verification is ${OTP}`,
    },
    (err, info) => {
      console.log(OTP);
      setTimeout(() => {
        OTP = "2";
      }, 20000);
    }
  );

  return res.status(200).json("sended")
};

export const getme= async(req,res)=>{

  const {username} =req.username
  const data = await registerSchema.find({username:username}).select("-password")
  return res.status(200).json(data[0])
}