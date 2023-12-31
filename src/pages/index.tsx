import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ProductView from '@/components/ProductView'
import WriteReview from '@/components/WriteReview'
import { getProductsAndReviews } from './api/product';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

	console.log(props)
	return (
		<>
			<Head>
				<title>Gear Reviews</title>
				<meta name="description" content="お気に入りの機材を共有しましょう🥺" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={`${styles.main} ${inter.className}`}>
				<h1
					style={{
						display: "flex",
						flexDirection: 'column',
						alignItems: 'center',
						marginBottom: '40px',
						fontSize: '24px',
						fontWeight: '500'
					}}
				>Gear Review</h1>

				{props.products.slice().reverse().map((product, index) => (
					<ProductView key={index} id={product.id} name={product.name} brand={product.brand} cat={product.category} reviews={product.reviews} />
				))}

				<div
					style={{
						position: 'fixed',
						bottom: '32px',
						right: '32px',
						fontSize: '24px',
					}}
				>

					<WriteReview />
				</div>

			</main>
		</>
	)
}

export async function getStaticProps() {
  try {
    const products = await getProductsAndReviews();

    return {
      props: {
        products,
      },
      revalidate: 10, // 10秒ごとに再生成
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      }
    };
  }
}





