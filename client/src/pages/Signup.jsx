import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../API/signup";
import { useState } from "react";

const Signup = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      navigate('/login')
    }
  })

  const handleSignUp = (event) => {
    event.preventDefault()
    mutation.mutate({name, email, password})
  }

  return (
    <div className="min-h-[calc(100vh-60px)] bg-spearmint flex flex-col items-center justify-center px-8 ">
      <h1
        className="font-playwrite font-bold text-4xl text-center cursor-pointer mb-5"
      >
        book store
      </h1>
      <h2 className="text-stone-500 text-lg mb-4 text-center">Create Account</h2>

      <form className="flex flex-col gap-5 w-full max-w-sm mt-15" onSubmit={handleSignUp}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 rounded-3xl py-3 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="text"
          id="name"
          name="name"
          required
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded-3xl py-3 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-3xl py-3 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
        />
        <button
          className="bg-hotpink text-white h-12 rounded-3xl mt-10 hover:opacity-90 transition"
          type="submit"
        >
          Signup
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 mt-6 text-sm text-center">
        <p className="text-stone-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate('/login')}
            className="text-hotpink cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
