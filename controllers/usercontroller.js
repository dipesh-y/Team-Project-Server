import  UserModel from './../models/usermodel';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {sendEmail} from '../config/emailService.js';

export async function registerUserController(req, res) {
    try {
        let user;

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return resp.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        user = await UserModel.findOne({ email: email });

        if (user) {
            return res.json({
                message: "User already registered with this email!",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(1000+Math.random()*900000).toString();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        
        user = new UserModel({
            email: email,
            password: hashPassword,
            name: name,
            otp: verifyCode,
            otpExpires: Date.now() + 600000
        });

        await user.save();

//         //send verification email
          const verifyEmail = await sendEmail({
            sendTo :email,
            subject : "Verify email from Ecommerce App",
            html : verifyEmailTemplate({
                name,
                urrl : VerifyEmailUrl
            })
          })

        //Create a JWT token for verification purposes
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        );

        return res.status(200).json({
            success: true,
            error: false,
            message: "User Registered successfully! Please verify your email.",
            token: token, // Optional: include this if needed for verification.s
        });



    } catch (error) {
        return res.status(500).json({ 
           message: error.message || error,
           error: true,
           success: false
         })
    }
}