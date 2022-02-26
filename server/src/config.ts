interface Config {
	JWT_SECRET: string;
	DB_URI: string;
	CLOUDINARY_NAME: string;
	CLOUDINARY_KEY: string;
	CLOUDINARY_SECRET: string;
}

// In production process.env will refer to variables in the deployed instance provider i.e. Config Vars
// In development process.env variables will be set from the root ".env" file by calling "node -r dotenv/config"
export default {
	JWT_SECRET: process.env.JWT_SECRET,
	DB_URI: process.env.DB_URI,
	CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
	CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
	CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
} as Config;