// models/Listing.js
import mongoose from 'mongoose';

// Check if the Listing model already exists to prevent overwriting
const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this item'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  categoryId: {
    type: String,
    required: [true, 'Please specify a category']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  campus: {
    type: String,
    required: [true, 'Please specify a campus']
  },
  pickupInfo: {
    type: String,
    required: [true, 'Please provide pickup information']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Use mongoose.models to check if the model exists already
export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
