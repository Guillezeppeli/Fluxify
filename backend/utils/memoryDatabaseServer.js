import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

async function connect() {
  await mongod.start();
  const uri = mongod.getUri();
  return uri;
}

async function closeDatabase () {
  await mongod.stop()
}

async function clearDatabase () {
  const collections = mongod.getInstance().collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

export { connect, closeDatabase, clearDatabase }
