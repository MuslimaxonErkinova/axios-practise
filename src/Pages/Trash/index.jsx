import React, { useEffect, useState } from "react";
import { instance } from "../../Utils/axios";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Trash = () => {
  const [trash, setTrash] = useState([]);
  useEffect(() => {
    instance.get("/trash").then((res) => {
      setTrash(res.data);
    });
  }, []);
  console.log(trash);
  const handleDelete = (id) => {
    instance.delete(`/trash/${id}`).then((res) => {
      toast.dark("Delete Successfully");
      setTrash((trash) => trash.filter((item) => item.id !== id));
    });
  };
  return (
    <div>
      <div className="flex justify-center items-center gap-5 flex-wrap mt-5">
        {trash.map((item) => (
          <div
            key={item.id}
            className="w-[300px]  p-5 gap-2 flex flex-col border-2 shadow-xl text-center text-yellow-500  border-yellow-500"
          >
            <h1>{item?.title}</h1>
            <img src={item?.image} alt="" />
            <h1>{item?.email}</h1>
            <h1>{item?.description}</h1>
            <h1>{item?.password}</h1>

            <div className="flex gap-2 items-center justify-center">
              <Link>
                <Button
                  className="border-2 border-green-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trash;
