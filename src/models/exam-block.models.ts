import * as mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import { ExamBlock } from '../interfaces/exam-block.interface';

const examBlockSchema = new mongoose.Schema({
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

examBlockSchema.plugin(timeZone);
const examBlockModel = mongoose.model<ExamBlock & mongoose.Document>('ExamBlock', examBlockSchema);

export default examBlockModel;