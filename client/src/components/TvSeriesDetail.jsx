import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom';
import {GET_TVSERIES_BY_ID} from '../graphql/tvSeries'

export default function TvSeriesDetail() {
  
  let { id } = useParams();
  // console.log(id, ' <<<<<<<<<<<<<');
  const { loading, error, data } = useQuery(GET_TVSERIES_BY_ID, { variables: { id }})
  console.log(data, '<<<<');
  // const { loading, error, data } = useQuery(GET_SERIES_BY_ID, { variables: { id }})

  return (
    <>
      <main className="container my-10 mx-auto px-4 md:px-12">
        {/* <div className="bg-red-500">asdasd</div> */}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">	
          <article className="overflow-hidden rounded-lg shadow-lg">    
            
            <img alt={data?.serial?.title} className="block h-96 w-full" src={data?.serial?.poster_path}/>
            
            
            <header className="items-center leading-tight p-2 md:p-4">
              <div className="flex justify-between">
                <h1 className="text-lg">
                  <p className="text-black">
                    {data?.serial?.title}
                  </p>
                </h1>
                  <i className="fas fa-star text-yellow-600 text-black items-center text-lg">
                    {data?.serial?.popularity}
                  </i>
              </div>
              <p className="text-black mt-2">
                {data?.serial?.overview}
              </p>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              
              <div className=''>
                <h3 className="font-bold text-xs" >TAGS</h3>    
                <div className='my-3 flex flex-wrap -m-1'>
                  {
                    data?.serial?.tags.map((tags, idx) => (
                      <span key={idx} className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xs font-bold mr-3">{tags}</span>
                    ))
                  }
                  </div>
              </div>
            </footer>

          </article>

        </div>
      </main>
      <div className="bg-gray-800"></div>
    </>
  )
}