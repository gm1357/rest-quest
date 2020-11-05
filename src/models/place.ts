import { Schema, model } from 'mongoose';

const placeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    north: { type: Schema.Types.ObjectId, ref: 'Route' }
});

export default model('Place', placeSchema);