import React from "react";
import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import CardFavorites from "../components/CardFavorites"

export default function Home() {

  const favorites = useReactiveVar(favoritesVar)
	

	return (
		<>
			<main className="container my-10 mx-auto px-4 md:px-12">
				{/* <div className="bg-red-500">{JSON.stringify(favorites)}</div> */}
				<p className="text-3xl">Favorite</p>
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
					{
						favorites?.map((favorite) =>(
							<CardFavorites key={favorite._id} data={favorite}></CardFavorites>
						))
					}
				</div>
				
			</main>
			<footer className="h-10 bg-gray-800"></footer>
	</>
	)
}