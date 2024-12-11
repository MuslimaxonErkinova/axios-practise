import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { instance } from '../../Utils/axios';
import { Button } from '@material-tailwind/react';

const SingleFilm = () => {
  const {id} = useParams()
  const [film, setFilm] = useState({})
  useEffect(() =>{
    instance.get(`/films/${id}`).then((res) =>{
      setFilm(res.data)
    }, [id])
  })
  console.log(film);
  
  if(!film) return <p>Loading...</p>
  return (
    <div className='flex justify-center items-center mt-7'>
      <div className='flex flex-wrap justify-center gap-8 mt-5 p-5 border-yellow-500 border-2 w-[500px] items-center rounded-lg'>
       <div>
       <img src={film.image} alt={film.title} className="h-60 w-60 object-cover rounded-lg" />
       </div>
      <div className='flex flex-col gap-2'>
      <h2 className="text-4xl font-bold text-yellow-500 ">{film.title}</h2>
      <p className="text-lg text-gray-800 mt-3">{film.description}</p>
      <p className="text-sm text-gray-500 mt-1">{film.password}</p>
      <Link to={'/'}>
      <Button className='bg-white text-yellow-500 border-2 border-yellow-500'>Back</Button>
      </Link>
      </div>
    </div>
    </div>
  )
}

export default SingleFilm
