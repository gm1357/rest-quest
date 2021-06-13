import { Schema, model } from 'mongoose';

const routeSchema = new Schema({
    description: { type: String, required: true, trim: true },
    blocked: { type: String, required: false, trim: true },
    requiredItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    nextArea: { type: Schema.Types.ObjectId, ref: 'Place' }
});

routeSchema.virtual('place', {
    ref: 'Place',
    localField: 'nextArea',
    foreignField: '_id'
});

routeSchema.virtual('itemsRequired', {
    ref: 'Item',
    localField: 'requiredItems',
    foreignField: '_id'
});

export default model('Route', routeSchema);