import mongoose, { Schema, models } from 'mongoose';

const noteSchema = new Schema({
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileCategory: { type: String, required: true },
    format: { type: String, required: true },
    author: { type: String, required: true },
    link: { type: String, required: true },
});

export const Note = models.Note || mongoose.model('Note', noteSchema);
