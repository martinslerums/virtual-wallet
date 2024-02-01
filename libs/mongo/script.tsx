import mongoose from 'mongoose'

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.tr5zj0y.mongodb.net/VirtualWallet`


const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to monogdb");
    } catch (error) {
        console.error("Error on connecting MongoDatabase: ", error);
    }
}

export default connectMongoDB;