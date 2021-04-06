import React from "react";
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../graphql/movies'
import Card from '../components/Card'


export default function Home() {
	
	const { loading, error, data } = useQuery(GET_MOVIES)
	console.log(data, '<<<<<< DATA');

  if (loading) return (<p>Loading...</p>)
  if (error) return (<p>Error :</p>)

	return (
		<>
			<main className="container my-10 mx-auto px-4 md:px-12">
				{/* <div className="bg-red-500">{JSON.stringify(data)}</div> */}
				<p className="Movie">Movie</p>
				
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
				{
					data?.movies?.map((movie) =>(
						<Card key={movie._id} data={movie}></Card>
					))
				}
				</div>
							
			
			</main>
			<footer className="h-10 bg-gray-500"></footer>
	</>
	)
}