import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema({
  content: {
    type: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product id is required'],
        },
        size: {
            type: String,
            required: [true, 'Product size is required'],
        },
        color: {
            type: String,
        }
    }],
    required: [true, "Shipment content is required"],
  },
  status: {
    type: String,
    required: [true, "Shipment status is required"],
    default: 'pending',
    enum: ['pending', 'done'],
  },
  externalId: {
    type: String,
    required: [true, 'External id is required'],
    unique: true,
  },
  notes: {
    type: String,
  },
  total: {
    type: Number,
    required: [true, "Total is required"],
  },
  shipmentFees: {
    type: Number,
    required: [true, "Shipment fees are required"],
  }
});

export const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", ShipmentSchema);
