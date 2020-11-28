import { Schema, model } from 'mongoose';

const placeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    north: { type: Schema.Types.ObjectId, ref: 'Route' },
    south: { type: Schema.Types.ObjectId, ref: 'Route' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

placeSchema.virtual('northArea', {
    ref: 'Route',
    localField: 'north',
    foreignField: '_id',
    justOne: true,
});

placeSchema.virtual('southArea', {
    ref: 'Route',
    localField: 'south',
    foreignField: '_id',
    justOne: true,
});

placeSchema.virtual('itemsArea', {
    ref: 'Item',
    localField: 'items',
    foreignField: '_id'
});

export default model('Place', placeSchema);