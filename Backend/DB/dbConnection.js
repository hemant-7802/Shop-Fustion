import mongoose from "mongoose";

const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.DBURL)
        console.log("Db Connected")
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default connectToDataBase;