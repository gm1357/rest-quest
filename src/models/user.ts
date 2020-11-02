import { Schema, model } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.plugin(passportLocalMongoose);

export default model('User', userSchema as PassportLocalSchema);