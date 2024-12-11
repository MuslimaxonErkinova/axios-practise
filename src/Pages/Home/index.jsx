import { useEffect, useState } from "react";
import { instance } from "../../Utils/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    instance.get("/films").then((res) => {
      setFilms(res.data);
    });
  }, []);

  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap mt-5" >
      {films.map((film) => (
      <Link to={`/films/single/${film.id}`}>
        <div
          key={film.id}
          className=" w-[300px] p-5 m-4 gap-2 flex flex-col flex-wrap  border-2 shadow-xl text-center text-yellow-500 border-yellow-500 hover:bg-amber-50  hover:rounded-lg group"
        >
          <img src={film.image} alt={film.title} className="h-40 w-full object-cover" />
          <h3 className="text-lg font-bold">{film.title}</h3>
          <h4 className="text-green-200 group-hover:text-yellow-500 group-hover:font-bold">{film.description}</h4>
          <p className="text-gray-500 group-hover:text-yellow-500 group-hover:font-bold">{film.password}</p>
        </div></Link>
      ))}
    </div>
  );
}
