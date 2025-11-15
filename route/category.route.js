import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import { createCategory, delecteCategory, getCategory, getCategoryCount, getSubCatergoryCount, getCategoryById, updateCategory, uploadcreateImages }  from '../controllers/category.contoller.js'
import { create } from 'domain'
import { getEnabledCategories } from 'trace_events'
import { removeImageFromCloudinary } from '../controllers/usercontroller.js'


const categoryRouter = express.Router()

categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadcreateImages)

categoryRouter.post('/create', auth, createCategory)

categoryRouter.get('/', getCategory)

categoryRouter.get('/get/count', getCategoryCount)

categoryRouter.get('/get/count/subCat', getSubCatergoryCount)

categoryRouter.get('/:id', getCategoryById)

categoryRouter.delete('/delete/:id', auth, removeImageFromCloudinary)

categoryRouter.delete('/id', auth, delecteCategory)

categoryRouter.put('/:id', auth, updateCategory)

export default categoryRouter;


