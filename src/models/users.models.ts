import * as mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import { User } from '../interfaces/users.interface';

const userSchema = new mongoose.Schema({
    tel: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

userSchema.plugin(timeZone);
const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
