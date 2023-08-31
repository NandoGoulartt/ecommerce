import { getProducts, postProducts } from "@/lib/produtos";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    await getProducts(res);
  } else if (req.method === "POST") {
    await postProducts(req, res);
  } else {
    res.status(405).end();
  }
}
