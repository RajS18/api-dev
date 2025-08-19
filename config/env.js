import {config} from "dotenv";
config({ path:`.env.${process.env.NODE_ENV || 'development'}.local` });
export const { PORT, SERVER_URL, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_KEY, ARCJET_ENV, QSTASH_URL, QSTASH_TOKEN} = process.env;   //non default export

//when process.env.NODE_ENV is not set, it by default points to development configurations in .env.development.local
//If NODE_ENV is set in the environment, we will get production .env.
//This can be set using a script to export a variable with value 'production' for the running process. to load appropriate file for .env

//export NODE_ENV=production
//soource ~/.bashrc