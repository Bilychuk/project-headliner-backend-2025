import { model, Schema } from 'mongoose';
import { EMAIL_PATTERN } from '../../constants/index.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [EMAIL_PATTERN, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'recipe',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', userSchema);
