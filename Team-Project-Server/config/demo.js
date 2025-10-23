import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.mongoose.URL){
    throw new Error(
        "Please provide MONGOOS_URL IN THE env file"

    )
    async function connectDB() {
        try{
            await mongoose.connect(process.env.mongoose_URL)
            console.log("conect db")
        } catch (error) {
            console.log("mongo connect error " ,error)
            process.exit(1)

        }
        
        
    }
}

export default connectDB