import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    maxlength: [60, "Product name cannot be more than 60 characters"],
  },
  searchString: {
    type: String,
    required: [true, 'Product search string is required'],
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: [true, 'company id is required'],
  },
  code: {
    type: String,
    required: [true, 'Product code is required'],
    maxlength: [40, "Product code cannot be more than 40 characters"],
  },
  tags: {
    type: [String],
    required: [true, 'Product tags are required'],
  },
  hasExported: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  sellPrice: {
    type: Number,
    required: [true, 'Product pay price is required'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Product image url is required'],
  }
});

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
