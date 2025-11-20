import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {createProduct, getAllFeaturedProducts, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLevelCatId, getAllProductsByThirdLevelCatName, getProductsCount, deleteProduct, getProduct, uploadImages, removeImageFromCloudinary, updateProduct} from '../controllers/productcontroller.js';

const productRouter = Router();

productRouter.post('/uploadImages',auth,upload.array('images'),uploadImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLevelCat/:id',getAllProductsByThirdLevelCatId);
productRouter.get('/getAllProductsByThirdLevelCatName',getAllProductsByThirdLevelCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getProductsCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,updateProduct);



export default productRouter;