import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
}, {
  timestamps: true // This automatically adds createdAt and updatedAt
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
