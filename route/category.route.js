import {route} from  'express'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import { createCategory, delecteCategory, getCategory, getCategoryCount }  from '../controllers/category.contoller.js'
import { create } from 'domain'
import { getEnabledCategories } from 'trace_events'
import { removeImageFromCloudinary } from '../controllers/usercontroller.js'


const categoryRouter = router ()
categoryRouter.Post('/uploadImages',auth ,upload.array('images') , uploadcreateImages)
categoryRouter.Post('/create',auth , createCategory)
categoryRouter.get('/', getCategory)
categoryRouter.get('get/count', getCategoryCount)
categoryRouter.get('get/count/subCat',getSubCategoryCount)
categoryRouter.get('/:id',getCategoryById )
categoryRouter.delecte('/delete/:id',auth , removeImageFromCloudinary)
categoryRouter.delecte('/id',auth , delecteCategory)
categoryRouter.put('/:id',auth ,updateCategory)

export default categoryRouter;
