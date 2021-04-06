import { useMutation } from '@apollo/client';
import React from 'react'
import { useHistory } from 'react-router-dom';
import loader from '../loader.gif'


export default function CardHome({data}) {
  
  const history = useHistory()

  const handleDetail = (_id) => {
    if (data.__typename === 'Movie') {
      history.push(`/movie/${_id}`)
    } else if (data.__typename === 'TvSeries') {
      history.push(`/tvSeries/${_id}`)
    }
  }

  return (
    <>
      <div className="my-1 px-1 w-full md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4">	
        <article className="overflow-hidden rounded-lg shadow-lg">    
          
          <img alt={data.title} className="block h-96 w-full" src={data.poster_path}/>
          
          
          <header className="leading-tight p-2 md:p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg">
                <p className="text-black">
                  {data.title}
                </p>
              </h1>
              <button type="button" className="no-underline hover:underline text-white">
                
                <i className="far fa-heart text-red-600 items-center text-4xl animate-bounce"></i>
              </button>
            </div>
          </header>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            
            <div className=''>
              <h3 className="font-bold text-xs" >TAGS</h3>    
              <div className='my-3 flex flex-wrap -m-1'>
                {
                  data?.tags?.map((tags, idx) => (
                    <span key={idx} className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xs font-bold mr-3">{tags}</span>
                    ))
                  }  
              </div>
              <button onClick={() => handleDetail(data._id)} type="button" className="mx-2 py-2 px-4 bg-transparent text-white font-semibold rounded bg-blue-600 hover:bg-blue-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 transform hover:scale-110">Detail</button>
              </div>
          </footer>

        </article>

      </div>
      
  </>
  )
  
}