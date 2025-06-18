const { MongoClient } = require("mongodb")

export async function createMongoClient() {
  const uri = "mongodb://root:flashcat.cloud@10.99.1.110:37017"
  const client = new MongoClient(uri)
  await client.connect()
  return client
}
