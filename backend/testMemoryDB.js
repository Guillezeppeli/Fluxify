import { connect, closeDatabase } from './utils/memoryDatabaseServer.js'

async function testConnection() {
  try {
    const uri = await connect();
    console.log(`Connected to in-memory DB with URI: ${uri}`);
    await closeDatabase();
    console.log('Connection closed');
  } catch (error) {
    console.error('Failed to connect to in-memory DB:', error);
  }
}

testConnection();
