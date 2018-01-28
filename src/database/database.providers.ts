import { FuseDB, FileAdapter } from "fusedb";
import {DB_CONNECTION_TOKEN} from "../common/constants";

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      const dbConnection = FuseDB.setup({ 
        adapter : FileAdapter({
          path: process.env.FUSEDB_PATH,
          database: process.env.FUSEDB_DATABASE 
        }) 
      });
      return dbConnection;
    },
  },
];
