// pages/index.tsx
import { GetStaticProps } from 'next';
import { connectToDatabase } from '../mongodb';

interface Product {
  _id: string;
  name: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToDatabase();
  const collection = db.collection('produtos');
  const products = await collection.find({}).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
