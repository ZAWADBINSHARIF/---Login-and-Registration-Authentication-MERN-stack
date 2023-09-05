import mongoose from "mongoose"

async function dbConnection() {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.log({error})
    }
}

export default dbConnection