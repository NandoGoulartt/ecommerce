import { connectToDatabase } from "../mongodb";

export async function getProducts(res: any) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('produtos');
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os produtos' });
      }
  return res;
}

export async function postProducts(req:any, res: any) {
    try {
        const { name } = req.body;
  
        if (!name) {
          return res.status(400).json({ error: 'O campo "name" é obrigatório' });
        }
  
        const db = await connectToDatabase();
        const collection = db.collection('produtos');
        const newProduct = { name };
        await collection.insertOne(newProduct);
  
        res.status(201).json({ message: 'Produto criado com sucesso' });
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o produto' });
      }
  return res;
}

