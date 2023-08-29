import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import WriteReview from "./WriteReview";
import { Tag } from '@chakra-ui/react'

const ProductView = (props) => {
	const [reviewsViewState, setReviewsViewState] = useState(false)

	return (
		<div
			style={{
				display: "flex",
				flexDirection: 'column',
				alignItems: 'center',
				marginBottom: '64px',
				cursor: 'pointer'
			}}
		>
			<div
				onClick={() => setReviewsViewState(!reviewsViewState)}
				style={{
					display: "flex",
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Image
					src={`/${props.cat}.png`}
					width={90}
					height={90}
					alt={props.cat}
				/>
				<h2>{props.name}-{props.brand}</h2>
				<div>
					<Tag variant='solid' colorScheme='teal'>{props.cat}</Tag>
				</div>

				{reviewsViewState && (
					<>
						<ul
							style={{
								marginBottom: '24px'
							}}
						>
							{props.reviews.slice(0, 2).map((review) => (
								<li>
									<p>{review.rating}</p>
									<p>{review.comment}</p>
								</li>
							))}
						</ul>
					</>
				)}

			</div>
			{reviewsViewState && (
				<>
					{/* {props.reviews.length > 2 && (
				<Link href={`/product/${props.id}`}>
					detail
				</Link>
			)} */}
					<WriteReview name={props.name} brand={props.brand} cat={props.cat} />
				</>

			)}
		</div>
	);
}

export default ProductView;