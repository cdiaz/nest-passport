import { FuseDB, FileAdapter } from "fusedb"

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      const dbConnection = FuseDB.setup({ 
        adapter : FileAdapter({
          path: "./database",
          database: "store" 
        }) 
      });
      return dbConnection;
    },
  },
];
