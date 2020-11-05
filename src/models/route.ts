import { Schema, model } from 'mongoose';

const routeSchema = new Schema({
    description: { type: String, required: true, trim: true },
    nextArea: { type: Schema.Types.ObjectId, ref: 'Place' }
});

export default model('Route', routeSchema);