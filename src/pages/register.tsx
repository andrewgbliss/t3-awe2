import TextField from "../components/form/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

type FormData = {
  email: string;
  password: string;
  password2: string;
};

export default function Register() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const mutation = trpc.user.create.useMutation();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await mutation.mutate({
        email: data.email,
        password: data.password,
      });
      console.log("Success", user);
      // router.push("/login");
    } catch (e) {
      console.error(e);
    }
  });
  return (
    <div className="full-screen page container mx-auto">
      <div className="paper-form">
        <form onSubmit={onSubmit}>
          <h6 className="text-center">Register</h6>
          <div className="pb-4">
            <TextField
              id="email"
              type="text"
              label="Email Address"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={errors.email && "Email is required"}
            />
          </div>
          <div className="pb-4">
            <TextField
              id="password"
              type="password"
              label="Password"
              {...register("password", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "must be 6 - 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "must be 6 - 20 characters",
                },
              })}
              error={errors.password && "Password is required"}
            />
          </div>
          <div className="pb-4">
            <TextField
              id="password2"
              type="password"
              label="Re-enter Password"
              {...register("password2", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "must be 6 - 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "must be 6 - 20 characters",
                },
                validate: (value) =>
                  value === watch("password") || "passwords must match",
              })}
              error={errors.password2 && "Passwords must match"}
            />
          </div>
          <div className="text-center py-6">
            <button className="btn btn-primary text-white w-full" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
