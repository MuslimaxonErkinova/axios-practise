import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../Utils/axios'; // Axios instantsiyasi
import { useForm } from 'react-hook-form';
import { Button, Input } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const Update = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Ma'lumotlarni olish
    instance.get(`/films/${id}`)
      .then((res) => {
        reset(res.data); // Form ma'lumotlarini yuklash
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching film data");
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = (data) => {
    instance.put(`/films/${id}`, data)
      .then(() => {
        toast.success("Updated successfully");
        nav("/films"); // Yo'naltirish
      })
      .catch(() => {
        toast.error("Error updating film");
      });
  };

  if (loading) return <p>Loading...</p>; // Yuklanish holati

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] mx-auto p-20 flex flex-col justify-center items-center gap-5"
      >
        <Input
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <span>{errors.title.message}</span>}
        
        <Input
          type="email"
          placeholder="Email"
          {...register("userNameEmail", { required: "Email is required" })}
        />
        {errors.userNameEmail && <span>{errors.userNameEmail.message}</span>}
        
        <Input
          type="text"
          placeholder="Image URL"
          {...register("image", { required: "Image URL is required" })}
        />
        {errors.image && <span>{errors.image.message}</span>}

        <Input
          type="text"
          placeholder="Description"
          {...register("description", { required: "Password is required" })}
        />

        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />         
        {errors.password && <span>{errors.password.message}</span>}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Update;
