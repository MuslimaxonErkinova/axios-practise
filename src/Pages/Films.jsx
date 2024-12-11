import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
// import Update from "../Update";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../Utils/axios";

export default function Films() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    instance.get("/films").then((res) => {
      setFilms(res.data);
    });
  }, []);

  const nav = useNavigate();
  const handleDelete = (id) => {
    instance.delete(`/films/${id}`).then((res) => {
      instance
        .post(
          "/trash",
          films.find((film) => film.id == id)
        )
        .catch((e) => console.log(e));
      toast.dark("Delete Successfully");
      setFilms((films) => films.filter((film) => film.id !== id));
    });
  };

  return (
    <div className="flex justify-center items-center gap-5 flex-wrap mt-5">
      {films.map((film) => (
        <div
          key={film.id}
          className="w-[300px]  p-5 gap-2 flex flex-col border-2 shadow-xl text-center text-yellow-500  border-yellow-500"
        >
          <h1>{film?.title}</h1>
          <img src={film?.image} alt="" />
          <h1>{film?.email}</h1>
          <h1>{film?.description}</h1>
          <h1>{film?.password}</h1>

          <div className="flex gap-2 items-center justify-center">
            <Link>
              <Button
                className="border-2 border-green-600"
                onClick={() => handleDelete(film.id)}
              >
                Delete
              </Button>
            </Link>
            <Link to={`/films/update/${film.id}`}>
              <Button className="border-2 border-green-600">Update</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
