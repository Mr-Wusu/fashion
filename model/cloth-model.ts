import mongoose, {Schema} from "mongoose";

const clothSchema = new Schema(
  {
    image: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    altTag: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

const Cloth = mongoose.models.Cloth || mongoose.model("Cloth", clothSchema);
export default Cloth;
