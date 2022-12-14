import * as mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import { Exam } from '../interfaces/exam.interface';

const examSchema = new mongoose.Schema({
    timeLimit: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    code: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

examSchema.plugin(timeZone);
const examModel = mongoose.model<Exam & mongoose.Document>('Exam', examSchema);

export default examModel;