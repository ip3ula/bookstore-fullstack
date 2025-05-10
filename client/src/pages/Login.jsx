import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { mutate, isError } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
    mutate({ email, password });
    if (isError) {
      setError('Invalid email or password');
      setTimeout(() => {
        setError(null);
      }, 3000);
      setEmail('');
      setPassword('');
      return;
    }
  };

  return (
    <div className="bg-spearmint flex flex-col items-center justify-center px-8 min-h-[calc(100vh-60px)]">
      <h1
        className="font-playwrite font-bold text-4xl text-center cursor-pointer mb-5"
      >
        book store
      </h1>
      <h2 className="text-stone-500 text-lg mb-4 text-center">Sign in to book store</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
      <form
        className="flex flex-col gap-5 w-full max-w-sm mt-15"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 rounded-3xl py-3 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border-2 rounded-3xl py-3 px-4 border-rosewater focus:outline-none text-sm font-mono"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-hotpink text-white h-12 rounded-3xl mt-10 hover:opacity-90 transition"
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
