import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { login } from "../API/login";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, dispatch] = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch({
        type: 'SET',
        payload: data
      });
      navigate("/");
    },
    onError: (err) => {
      setError(err.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-spearmint flex flex-col items-center justify-center px-4 py-10">
      <h1
        onClick={() => navigate('/')}
        className="font-playwrite font-bold text-4xl text-center cursor-pointer my-10"
      >
        book store
      </h1>
      <h2 className="text-stone-500 text-lg mb-4 text-center">Sign in to book store</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 rounded-3xl py-2 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border-2 rounded-3xl py-2 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-hotpink text-white h-10 rounded-3xl mt-4 hover:opacity-90 transition"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 mt-6 text-sm text-center">
        <p className="text-stone-500">
          Forgot{" "}
          <span
            onClick={() => navigate('/reset-password')}
            className="text-hotpink cursor-pointer"
          >
            Password?
          </span>
        </p>
        <p className="text-stone-500">
          Don't have an account?{" "}
          <span
            onClick={() => navigate('/signup')}
            className="text-hotpink cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
