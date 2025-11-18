import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import { createCategory, deleteCategory, getCategory, getCategoryCount, getSubCategoryCount, getCategoryById, updateCategory, uploadImages }  from '../controllers/categorycontoller.js'
import { create } from 'domain'
import { getEnabledCategories } from 'trace_events'
import { removeImageFromCloudinary } from '../controllers/usercontroller.js'


const categoryRouter = express.Router()

categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadImages)

categoryRouter.post('/create', auth, createCategory)

categoryRouter.get('/', getCategory)

categoryRouter.get('/get/count', getCategoryCount)

categoryRouter.get('/get/count/subCat', getSubCategoryCount)

categoryRouter.get('/:id', getCategoryById)

// categoryRouter.delete('/delete/:id', auth, removeImageFromCloudinary)

categoryRouter.delete('/:id', auth, deleteCategory)

categoryRouter.put('/:id', auth, updateCategory)

export default categoryRouter;


