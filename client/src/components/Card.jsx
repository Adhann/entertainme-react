import { useMutation } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { DELETE_MOVIES, GET_MOVIES } from '../graphql/movies'
import { DELETE_TVSERIES, GET_TVSERIES } from '../graphql/tvSeries'
import { favoritesVar } from '../graphql/vars'
import loader from '../loader.gif'


export default function CardHome({data, loading, error}) {
  // console.log(data, '<<<<<<< DATA MOVIE' );

  const [deleteMovie] = useMutation(DELETE_MOVIES)
  const [deleteTvSeries] = useMutation(DELETE_TVSERIES)
  
  const history = useHistory()

  const handleDeleteMovie = (_id) => {
    if (data.__typename === 'Movie') {
      deleteMovie({ variables: { _id }, refetchQueries: [{ query: GET_MOVIES }] })
    } else if (data.__typename === 'TvSeries') {
      deleteTvSeries({ variables: { _id }, refetchQueries: [{ query: GET_TVSERIES }] })
    }
  }

  const handleDetailMovie = (_id) => {
    history.push(`/movie/${_id}`)
  }

  function handleAddToFavorites() {
    const existingFavorites = favoritesVar()

    const newData = {
      _id: data._id,
      title: data.title,
      overview: data.overview,
			poster_path: data.poster_path,
			popularity: data.popularity,
			tags: data.tags
    }

    favoritesVar([newData, ...existingFavorites])
    // history.push(`/favorites`)
  }


  if (error) {
    return (
      <div className="flex h-full justify-center items-center">
        <p className="font-semibold">Oops, its looks like you're encounter an Error...</p>
      </div>
    )
  }
  return (
    <>
    {
      loading ? (
        <div className="my-1 px-1 w-full md:w-1/4 lg:my-4 lg:px-4 lg:w-1/4 animate-pulse">
          <article className="overflow-hidden rounded-lg shadow-md">

            <div className="mb-2 h-60 w-full bg-gray-200 overflow-hidden">
              <img alt={loader} className="block h-64 w-full" src={loader}/>

            </div>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <div className="mb-2 h-5 w-full bg-gray-200 overflow-hidden rounded-full">
          
              </div>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              <div className="mb-2 h-5 w-40 bg-red-300 overflow-hidden rounded-full">
              
              </div>
            </footer>

          </article>
        </div>
      ) : (
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
                <button onClick={handleAddToFavorites} type="button" className="no-underline hover:underline text-white">
                  {/* <svg className="h-8 w-8 mt-2 text-red-400 hover:text-red-500 fill-current animate-bounce mt-5" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg> */}
                  <i className="far fa-heart text-red-600 items-center text-4xl animate-bounce"></i>
                </button>
              </div>
            </header>

            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              {/* <a className="flex items-center no-underline hover:underline text-black" href="/#"> */}
              
              <div className=''>
                <h3 className="font-bold text-xs" >TAGS</h3>    
                <div className='my-3 flex flex-wrap -m-1'>
                  {
                    data?.tags?.map((tags, idx) => (
                      <span key={idx} className="inline-block rounded-full text-gray-600 bg-gray-100 px-2 py-1 text-xs font-bold mr-3">{tags}</span>
                      ))
                    }  
                </div>
                <div className="">
                  <button onClick={() => handleDetailMovie(data._id)} type="button" className="mx-2 py-2 px-4 bg-transparent text-white font-semibold rounded bg-blue-600 hover:bg-blue-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 transform hover:scale-110">Detail</button>
                  <button onClick={() => handleDeleteMovie(data._id)} type="button" className="mx-2 py-2 px-4 bg-transparent text-white font-semibold rounded bg-red-600 hover:bg-blue-800 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 transform hover:scale-110">Delete</button>
                </div>
              </div>

              {/* </a> */}
            </footer>

          </article>

        </div>
      )
    }
      
  </>
  )
  
}