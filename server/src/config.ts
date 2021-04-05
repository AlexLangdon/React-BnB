interface Config {
	JWT_SECRET: string;
	DB_URI: string;
}

// In production process.env will refer to variables in the deployed instance provider i.e. Config Vars
// In development process.env variables will be set from the root ".env" file by calling "node -r dotenv/config"
export default {
	JWT_SECRET: process.env.JWT_SECRET,
	DB_URI: process.env.DB_URI
} as Config;