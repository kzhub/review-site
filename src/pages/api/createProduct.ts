import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { productData, reviewData } = req.body; //いらない

			const existingProduct = await prisma.product.findMany({
				where: {
					name: {
						equals: req.body.name  // 商品名が "Rhodes" を検索
					},
				},
			});
			
      if (existingProduct.length === 0) {
        // 商品が存在しない場合、新しい商品をデータベースに作成
        const newProduct = await prisma.product.create({
					data: {
						name: req.body.name,
						brand: req.body.brand,
						category: req.body.cat,
						url: "https"
					}
        });

        // 新しい商品のIDを取得
        const productId = newProduct.id;

        // レビューをデータベースに作成
        const newReview = await prisma.review.create({
          data: {
						rating:req.body.satisfaction,
						comment:req.body.comment,
            product_id: productId,
          },
        });

        res.status(201).json({ product: newProduct, review: newReview });
      } 
			else {
        // 商品が存在する場合、その商品のIDを取得
        const productId = existingProduct[0].id;

        // レビューをデータベースに作成（既存の商品と関連付け）
        const newReview = await prisma.review.create({
          data: {
						rating:req.body.satisfaction,
						comment:req.body.comment,
            product_id: productId, // 既存の商品と関連付けるために商品のIDを指定
          },
        });

        res.status(201).json({ review: newReview });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}