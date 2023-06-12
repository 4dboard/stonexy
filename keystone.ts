import {config} from "@keystone-6/core";
import {lists} from "./src/keystone/schema";
import {seedDemoData} from "./src/keystone/seed";
import type {Context} from ".keystone/types";

export default config({
    // server: {
    //   cors: { origin: ["http://localhost:4000"], credentials: true },
    // },
    db: {
        provider: "sqlite",
        url: `file:${process.cwd()}/keystone.db`, // next.js requires an absolute path for sqlite
        onConnect: async (context: Context) => {
            await seedDemoData(context);
        },
    },
    lists,
});
