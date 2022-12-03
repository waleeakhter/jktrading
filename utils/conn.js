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

        cached.promise = mongoose.connect(`mongodb+srv://jktrading:jKtradinG.pT@cluster0.rtlavan.mongodb.net/?retryWrites=true&w=majority`,
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