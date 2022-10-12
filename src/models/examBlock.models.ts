import * as mongoose from 'mongoose';
import timeZone from 'mongoose-timezone';
import { ExamBlock } from '../interfaces/examBlock.interface';

const examSchema = new mongoose.Schema({
    point: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    data: {
        type: Object,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

examSchema.plugin(timeZone);
const examBlockModel = mongoose.model<ExamBlock & mongoose.Document>('ExamBlock', examSchema);

export default examBlockModel;