import { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface User {
	username: string;
	email: string;
	password: string;
}

export interface UserDocument extends User, Document {
	hasSamePassword(password: string): boolean;
}

export const userSchema = new Schema<UserDocument>({
	username: {
		type: String,
		minLength: [4, "Invalid length. Minimum length is 4 characters"],
		maxLength: [32, "Invalid length. Maximum length is 32 characters"],
		required: "Username is required"
	},
	email: {
		type: String,
		minLength: [4, "Invalid length. Minimum length is 4 characters"],
		maxLength: [32, "Invalid length. Maximum length is 32 characters"],
		validate: [validator.isEmail, "invalid email"],
		required: "Email is required",
		unique: true, // Unique provides a unique index
		lowercase: true
	},
	password: {
		type: String,
		minlength: [4, "Invalid length! Minimum is 4 characters"],
		maxlength: [32, "Invalid length! Maximum is 32 characters"],
		required: "Password hash is required"
	}
});

userSchema.methods.hasSamePassword = function(providedPassword: string) {
	return bcrypt.compareSync(providedPassword, this.password);
};

userSchema.pre("save", function(next) {
	bcrypt.genSalt(10, (_, salt) => {
		bcrypt.hash(this.password, salt, (_, hash) => {
			this.password = hash;
			next();
		});
	});
});

export const UserModel = mongoose.model("User", userSchema);