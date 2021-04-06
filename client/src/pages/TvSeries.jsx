import React from "react";
import { useQuery } from '@apollo/client';
import { GET_TVSERIES } from '../graphql/tvSeries'
import Card from '../components/Card'


export default function Home() {
	
	const { loading, error, data } = useQuery(GET_TVSERIES)
	console.log(data, '<<<<<< DATA');

  if (loading) return (<p>Loading...</p>)
  if (error) return (<p>Error :</p>)

	return (
		<>
			<main className="container my-10 mx-auto px-4 md:px-12">
				{/* <div className="bg-red-500">{JSON.stringify(data)}</div> */}
				<p className="Movie">Series</p>
				<div className="flex flex-wrap -mx-1 lg:-mx-4">
				{
					data?.series?.map((tvSeries) =>(
						<Card key={tvSeries._id} data={tvSeries}></Card>
					))
				}
				</div>
							
			
			</main>
			<footer className="h-10 bg-gray-500"></footer>
	</>
	)
}