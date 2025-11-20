import CategoryModel from "../models/categorymodel.js";
import UserModel from "../models/usermodel.js";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from '../config/cloudinaryconfig.js';
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.clodinary_config_cloud_name,
//   api_key: process.env.clodinary_config_api_key,
//   api_secret: process.env.clodinary_config_api_secret,
//   secure: true,
// });

var imagesArr = [];

export async function uploadImages(request,response){
  try{
    imagesArr =[];
    const image = request.files;

    const options = {
      use_filename : true,
      unique_filename : false,
      overwrite: false,
    };
    for (let i =0; i < image?.length; i++){
            const img = await cloudinary.uploader.upload(
                     image[i].path,
                     options,
                     function (error, result) {
                         imagesArr.push(result.secure_url);
                         fs.unlinkSync(`uploads/${request.files[i].filename}`);
                     }
                 );  
    }

    return response.status(200).json({
      images : imagesArr
    });
  }
  catch (error){
      return response.status(500).json({
      message: error.message | error,
      error: true,
      success: false,
    });
  }
}




export async function createCategory(request, response) {
  try {

    

    const category = new CategoryModel({
      name: request.body.name,
      image: request.body.imagesArr,
      color: request.body.color,
      parentCatName: request.body.parentCatName,
      parentId: request.body.parentId || null,
    });

    const saved = await category.save();

    if(!saved){
      return response.status(500).json({
      message: "Category creation failed",
      error: true,
      success: false,
    });
    }
    imagesArr = [];

    return response.status(201).json({
      message: "Category created successfully",
      success: true,
      category: saved,
    });
  }
   catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export async function getCategory(request, response) {
  try {
    const categories = await CategoryModel.find();

    const map = {};
    categories.forEach((cat) => {
      map[cat._id] = { ...cat._doc, children: [] };
    });

    const rootCategories = [];

    categories.forEach((cat) => {
      if (cat.parentId) {
        map[cat.parentId].children.push(map[cat._id]);
      } else {
        rootCategories.push(map[cat._id]);
      }
    });

    return response.status(200).json({
      error: false,
      success: true,
      categories: rootCategories,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message | error,
      error: true,
      success: false,
    });
  }
}

export async function getCategoryCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      parentId: null,
    });

    return response.status(200).json({
      categoryCount,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}


export async function getSubCategoryCount(request, response) {
  try {
    const categories = await CategoryModel.find();

    let subcategories = categories.filter((cat) => cat.parentId !== null);

    return response.status(200).json({
      SubcategoryCount: subcategories.length,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export async function getCategoryById(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);

    if (!category) {
      return response.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

export async function deleteCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id);

    if (!category) {
      return response.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    if (category.image) {
      const urlArr = category.image.split("/");
      const last = urlArr[urlArr.length - 1];
      const publicId = last.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

    await CategoryModel.findByIdAndDelete(request.params.id);

    return response.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}


export async function updateCategory(request, response) {
  try {
    const updated = await CategoryModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        image: request.body.image,
        parentId: request.body.parentId,
        parentCatName: request.body.parentCatName,
      },
      { new: true }
    );

    if (!updated) {
      return response.status(404).json({
        message: "Category cannot be updated",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Category updated successfully",
      success: true,
      category: updated,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}
