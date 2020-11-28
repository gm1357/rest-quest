import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
});

export default model('Item', itemSchema);