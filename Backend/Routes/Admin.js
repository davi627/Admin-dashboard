import express from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../Models/Admin.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check the current number of registered admins
        const adminCount = await Admin.countDocuments();
        if (adminCount >= 5) {
            return res.status(400).json({ msg: "Registration limit reached" });
        }

        // Check if the email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ msg: "Admin already exists" });
        }

        // Hash the password and save the new admin
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            email,
            password: hashedPassword,
        });
        await admin.save();

        return res.json({ message: "User created" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error });
    }
});
router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check the admin email
        const admin = await Admin.findOne({ email });

        // Check if the admin exists
        if (!admin) {
            return res.status(400).json({ msg: "Admin does not exist" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate the token
        const token = jwt.sign({ email: admin.email }, process.env.KEY, { expiresIn: '1h' });

        // Send the token in a cookie
        res.status(200).cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({
            status: true,
            message: "Logged in",
            admin: { email: admin.email }
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});
router.post('/forgotpassword',async(req,res)=>{
    const {email}=req.body;
    try{
      const loggedInUser= await Admin.findOne({email})
      if(!loggedInUser){
        return res.status(404).json({message:"User not found"})
      }
  
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'davidmbita001@gmail.com',
          pass: 'jtfq pvyu memx szjh'
        }
      });
      const token =jwt.sign({id:loggedInUser._id},process.env.KEY,{expiresIn:'5m'})
      
      var mailOptions = {
        from: 'davidmbita001@gmail.com',
        to: email,
        subject: 'Reset password',
        text:`http://localhost:5173/reset/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        return res.status(200).cookie('token',token,{httpOnly:true,maxAge:360000}).json({ status:true,message: "Email sent" });
      });
    } catch (err){
      console.log(err)
    }
  })
  router.post('/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    try {
      // Verify the token and decode the user ID
      const decoded = await jwt.verify(token, process.env.KEY);
      const id = decoded.id;
      
      //hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      
      const updatedUser = await Admin.findByIdAndUpdate(id, { password: hashedPassword });
      console.log(updatedUser);
      return res.json({ status: true, message: "Password updated successfully" });
    } catch (err) {
      return res.status(400).json({ status: false, message: 'Invalid or expired token' });
    }
  
  })

export { router as AdminRouter };
