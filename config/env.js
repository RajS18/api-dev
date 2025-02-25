import {config} from "dotenv";
config({ path:`.env.${process.env.NODE_ENV || 'development'}.local` });
export const { PORT , NODE_ENV } = process.env;

//when process.env.NODE_ENV is not set, it by default points to development configurations in .env.development.local