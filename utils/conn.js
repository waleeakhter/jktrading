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

        cached.promise = mongoose.connect('mongodb://127.0.0.1:27017/jk-trading',
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
