import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ADD_MOVIE, GET_MOVIES } from '../graphql/movies'
import { GET_MOVIE_BY_ID, EDIT_MOVIES } from '../graphql/movies'

export default function FormAdd() {
  const [addMovie] = useMutation(ADD_MOVIE)

  const history = useHistory();

  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, { variables: { id }})  
  const [editMovie] = useMutation(EDIT_MOVIES)

 
  // console.log(data?.movie?._id , '<<<<<<<< DATA');
  // console.log(data, '<<<<<<<< DATA');
  // console.log(editMoviesData, '<<<<<<<< EDIT');

  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: []
  })

  const onChangeForm = (e) => {
    let { name, value } = e.target
    if (name === "popularity") {
      value = parseFloat(value)
    }
    if (name === "tags") {
      // const newInput = JSON.parse(JSON.stringify(formData))
      // let newTags = newInput.tags
      // if (newTags.length) {
      //   newTags = newTags.split(" ")
      //   newTags.push(value)
      // }
      // // newTags.push(value)
      // // console.log(value, '<<< value');
      // // console.log(newTags, '<<< new tags');
      // // value = value.split(" ")
      // setFormData({
      //   ...formData,
      //   tags: newTags
      // })
    }
    // console.log(formData, '<<<<<<<<<<<');
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const initTags = ['animation', 'fantasy', 'action', 'horror', 'sci-fi']
  initTags.sort()
  
  const submitMovie = (e) => {
    e.preventDefault()
    editMovie({ variables: { input: formData }, refetchQueries: [{ query: GET_MOVIES }] })
    console.log(formData, '<<<<<<<< DATA BARU');
    // history.push(`/`)
  }

  useEffect(() => {
    setFormData({
      title: data?.movie?.title,
      overview: data?.movie?.overview,
      poster_path: data?.movie?.poster_path,
      popularity: data?.movie?.popularity,
      tags: data?.movie?.tags
    })
  }, [data])

  return (
    <>
    <main className="container my-10 mx-auto px-4 md:px-12">

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <form onSubmit={submitMovie}>
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Edit Movie</h2>
                <h2 className="leading-relaxed">{JSON.stringify(formData)}</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={onChangeForm} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title"/>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Overview</label>
                  <textarea name="overview" value={formData.overview} onChange={onChangeForm} className="h-24 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Overview" />
                  </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Poster Path URL</label>
                  <input type="text" name="poster_path" value={formData.poster_path} onChange={onChangeForm} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Poster Path URL"/>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Popularity</label>
                  <input type="number" name="popularity" value={formData.popularity} onChange={onChangeForm} step="0.1" min="0" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Popularity"/>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Tags</label>
                  <input type="text" name="tags" value={formData.tags} onChange={onChangeForm} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Tags"/>
                  {/* {
                    initTags.map((e, idx) => (
                      <label
                        key={idx}
                        className="mx-1 capitalize"
                      >
                        <input
                          type="checkbox"
                          name="tags"
                          className="mr-1"
                          onChange={onChangeForm}
                          checked={formData.tags.includes(e)}
                          value={e}
                        />
                        {e}
                      </label>
                    ))
                  } */}
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                  <button type="submit" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <div className="bg-red-500"></div>
    </>
  )
}