import {Router} from 'express'
import {registerUserController,verifyEmailController,loginUserController,logoutController} from '../controllers/usercontroller.js';
import auth from '../middlewares/auth.js';


const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verifyEmail', verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.get('/logout', auth, logoutController)

export default userRouter;