import React from "react";
import { useQuery } from '@apollo/client'
import { GET_ALL } from '../graphql/index'
import CardHome from '../components/CardHome'


export default function Home() {
	
	const { loading, error, data } = useQuery(GET_ALL)

	return (
		<>
			<main className="container my-10 mx-auto px-4 md:px-12">
				{/* <div className="bg-red-500">{JSON.stringify(data)}</div> */}
				<p className="text-3xl">Movie</p>
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
					{
						data?.movies?.map((movie) =>(
							<CardHome key={movie._id} data={movie} loading={loading} error={error}></CardHome>
						))
					}
				</div>
				
				<p className="text-3xl mt-10">TV Series</p>
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
					{
						data?.series?.map((series) =>(
							<CardHome key={series._id} data={series} loading={loading} error={error}></CardHome>
						))
					}
				</div>
			</main>
			<footer className="h-10 bg-gray-800"></footer>
	</>
	)
}