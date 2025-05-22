import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String },
    }
);

export const User = models.User || mongoose.model('User', userSchema);
