import React, { useState } from "react";
import { NavLink } from "react-router-dom"

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  return (

    <>
      <nav className="bg-gray-800 flex px-10 py-3 justify-between items-center">
        <div className="flex items-center text-white">
          {/* <span className="text-2xl">Pokemon</span> */}
          {/* <img src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt=""/> */}
        </div>
        <ul className="flex items-center">
          <li className="mx-5">
            <NavLink className="text-white hover:text-gray-900 hover:underline active" to="/">Home</NavLink>
          </li>
          <li className="mx-5">
            <NavLink className="text-white hover:text-gray-900 hover:underline" to="/movie">Movie</NavLink>
          </li>
          <li className="mx-5">
            <NavLink className="text-white hover:text-gray-900 hover:underline" to="/tvSeries">TV Series</NavLink>
          </li>
          <li className="mx-5">
            <NavLink className="text-white hover:text-gray-900 hover:underline" to="/favorites">Favorites</NavLink>
          </li>
          <li className="mx-5">
            <NavLink className="text-white hover:text-gray-900 hover:underline" to="/add-data">Add Data Movie</NavLink>
          </li>
          <li className="mx-5">
            <button
              type="button"
              className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal(true)}
            >
            Add Data Modal
            </button>
          </li>
        </ul>
      </nav>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}