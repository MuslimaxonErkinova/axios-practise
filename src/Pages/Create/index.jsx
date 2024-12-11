import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Utils/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubmit = (data) => {
    instance.post("/films", data)
      .then((res) => {
        nav("/");
        toast.apply("Created successfully");
      })
      .catch((error) => {
        toast.error("Error creating film");
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[450px] mx-auto p-14 flex flex-col justify-center items-center gap-3"
      >
        <Input label="Tittle" placeholder="Title" {...register("title", { required: true })} />
        {errors.title && <span>Title is required</span>}
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          {...register("userNameEmail", { required: true })}
        />
        {errors.userNameEmail && <span>Email is required</span>}
        <Input
        label="Image"
          type="text"
          placeholder="Image URL"
          {...register("image", { required: true })}
        />
        {errors.image && <span>Image URL is required</span>}
         <Input
          label="Description"
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>Description is required</span>}

        <Input
          label="Password"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
