import { MongoClient } from "mongodb";

const uri = process.env.DATABASE!;
const options = {};

if (!process.env.DATABASE)
    throw new Error("process.env.DATABASE is undefined");

let client: MongoClient;

export async function mongoDatabase() {
    if (client) return client.db();
    client = new MongoClient(uri, options);
    client = await client.connect();
    return client.db();
}
