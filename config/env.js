import {config} from "dotenv";
config({ path:`.env.${process.env.NODE_ENV || 'development'}.local` });
export const { PORT , NODE_ENV , DB_URI } = process.env;

//when process.env.NODE_ENV is not set, it by default points to development configurations in .env.development.local
//If NODE_ENV is set in the environment, we will get production .env.
//This can be set using a script to export a variable with value 'production' for the running process. to load appropriate file for .env

//export NODE_ENV=production
//soource ~/.bashrc