const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);