import {Router} from 'express'
import {registerUserController,verifyEmailController,loginUserController,logoutController} from '../controllers/usercontroller.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { removeImageFromCloudinary } from "../controllers/usercontroller.js";
import { userAvatarController } from '../controllers/usercontroller.js';
import { updateUserDetails } from '../controllers/usercontroller.js';
import { forgotPasswordController } from '../controllers/usercontroller.js';
import { verifyForgotPasswordOtp } from '../controllers/usercontroller.js';
import { resetPassword } from '../controllers/usercontroller.js';
import { refreshToken } from '../controllers/usercontroller.js';
import { userDetails } from '../controllers/usercontroller.js';


const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verifyEmail', verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
userRouter.put('/:id', auth, updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp)
userRouter.post('/reset-password', resetPassword)
userRouter.post('/refresh-token', refreshToken)
userRouter.get('/user-details', auth, userDetails);

export default userRouter;