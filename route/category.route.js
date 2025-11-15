import {route} from  'express'

import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import { uploadImages } from '../controllers/category.contoller.js'

const categoryRouter = router ()
categoryRouter.Post('/uploadImages',auth ,upload.array('images') , uploadImages)
export default categoryRouter;
