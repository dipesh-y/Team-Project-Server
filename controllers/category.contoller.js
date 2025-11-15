import CategoryModel from  "../models/category.model";
import { v2 as cloudinary} from "cloudinary"
import { error } from "console";
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.clodinary_config_cloud_name,
    api_key: process.env.clodinary_config_api_key,
    api_secret : process.env.clodinary_config_api_secret,
    secure : true
})
 
var imagesArr = []
export async function uploadImages(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId; // auth middleware
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return response.status(500).json({
                message: "User not found",
                error: true,
                success: false
            })
        }

        // first remove image from cloudinary
        const imgUrl = user.avatar;

        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];

        const imageName = avatar_image.split(".")[0];


        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {
                    // console.log(error,res)
                }
            );
        }



        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {

            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {

                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                    // console.log(request.files[i].filename)
                }
            );
        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avatar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// create category 
export async function createCategory  (request ,response){
    try {
        let category = new CategoryModel ({
            name : request .body.name,
            image : request .body.image,
            color : request .body.color,
            parentCatname : request .body.parentCatname,
            prentId : request .body.parentId
        })
        if (!category){
            response.status(500).json({
                message : "Unable to create category",
                'error' : err,
                success : false
            });
            
        }
        category =await category.save();

        imagesArr =[];
        return response.status(200).json({
           message : "Category created successfully",
           error : false ,
           success : true,
           'category' : category

                })

    }catch (error) {
    return response.satus(500).json({
        message : error.message || error,
        error : true ,
        success : false
    })
}
}
 
// get category
export async function getCategory(request,response) {
try{
    const categories = await CategoryModel.find();
    const categorymap = {};
    categories.forEach(cat =>{
        categoriesmap[cat.id] = {...cat._doc , children: [] } 
        
    });
    const rootCategories =[]
    categories.forEach(cat => {
        if (cat.parentId){
            categoriesmap[cat.parentId].children.push(categorymap[cat.id])
        }else{
            rootCategories.push(categoriesmap[cat._id]);
        }
    })
    return response.satus(200).json({
        error : false,
        success : true
    })

} catch (error) {

    return response.satus(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
}
}

//get category count 

export async function getCategoryCount (request , response){
    try {
        const getCategoryCount = await category.countDocuments({prentid : undefined });
        if (!getCategoryCount){
            res.status(500).json({
                success : false
            })
        }else{
            response.send({
                categoryCount : categoryCount
            });
        }

    }
    catch (error){
        return response.status(500).json({
            message : error.message || error,
            error : true ,
            success : false

        })
    }
}
//  get Subcategory 

export async function getSubCategoryCount (request , response){
    try {
        const categories = await category.CategoryModel.find();

        if (!categories){
            res.status(500).json({
                success : false
            })
        }else{
            const subcatList = []
            for (let categories of categoryCount){
                if (cat.prentId== undefined){
                    subcatList.push(cat)
                }
            }
                response.send({
                SubcategoryCount : categoryCount,
                    });
        }

    }
    catch (error){
        return response.status(500).json({
            message : error.message || error,
            error : true ,
            success : false

        })
    }
}

// get single category by id
export async function getCategoryById (request ,response){
    try {
        const category = await CategoryModel.findById(request.params.id);
        if(!category){
            res 
                .status(500)
                .json(
                    {
                        message : "zthe category with the given id is not found",
                        error :true ,
                        success : false

                    }
                     );
        }

        return response.status(200).json({
            error : false,
            success : true,
            category : category
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true ,
            success : false

        
    })
}

}

export async function delecteCategory (request , response){
    const category = await CategoryModel.findById(request.params.id);

    const images = category.image
    const img = "";

        for (img of images){
        const imgUrl = img
        const urlArr = imgUrl.split("/")
        const image_name = urlArr[urlArr.length -1];
        const imageId = image_name.split(".")[0]
    
    if (imageId){
        cloudinary.uploader.destroy(imageName, (error ,result) => {

        })
    }}
    }


export async function updateCategory (request , response){
    const category = await CategoryModel.findByIdAndUpdate(request.params.id);
    request.params.id,{
        name : request.body.name,
        images : request.body.images,
        parentId : request.body.parentId,
        parentCatname : request.body.parentCatname



    },   {new : true}

    if (!category){
        return response.status(500).json({
            message : "the category cannot be updated",
            error : true ,
            success : false
        })
    }

     imagesArr =[];
     response.satus(200).json({
        message : "category updated successfully",
        error : false ,
        success : true,
        category : category
     })
    
    
    }