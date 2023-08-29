import { PrismaClient } from '@prisma/client';

export async function getProductsAndReviews() {
  const prisma = new PrismaClient();
  
  try {
    // Productデータを取得
    const products = await prisma.product.findMany();
    
    // Reviewデータを取得
    const reviews = await prisma.review.findMany();
    
    // ProductとReviewを結びつける
    const productsWithReviews = products.map((product) => {
      const productReviews = reviews.filter((review) => review.product_id === product.id);
      return { ...product, reviews: productReviews };
    });
    
    return productsWithReviews;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

