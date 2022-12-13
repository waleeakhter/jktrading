import mongoose from 'mongoose';
import { seedAdmin, seedCategories } from './seeders';

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
        }
        const env = process.env.NODE_ENV;
        let url = ""
        if (env == "development") {
            url = process.env.L_DB_URI
        }
        else if (env == "production") {
            url = process.env.DB_URI
        }

        cached.promise = mongoose.connect(url,
            opts).then(mongoose => {
                seedAdmin()
                seedCategories()
                return mongoose
            })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect