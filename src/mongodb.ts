// src/mongodb.ts
import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
    const db = client.db('meu-ecommerce'); 
    await createCollections(db); 
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

async function createCollections(db: Db) {
  const collections = await db.listCollections().toArray();
  
  if (!collections.some((col: { name: string; }) => col.name === 'produtos')) {
    await db.createCollection('produtos'); 
  }
}

