import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/redux/authActions";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  return (
    <main className="app space-y-12 px-1 md:px-0">
      <h1 className="head-text mt-40">
        <span className="purple-gradient">Welcome</span> to{" "}
        <span className="blue-gradient">Your</span>{" "}
        <span className="primary-gradient">Account</span>
      </h1>
      <div className="w-full max-w-md mx-auto">
        <LoginForm />
      </div>
    </main>
  );
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser({ email, password }) as any);
    }else{
      alert("Please enter your email and password");
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="w-full" onClick={handleLogin}>
        Log In
        <ArrowRight size={20} className="ml-2" />
      </Button>
      <div className="text-center space-y-2">
        <Link to="/signup" className="text-sm text-blue-500 hover:underline block">
          Don't have an account? Sign Up
        </Link>
      </div>
    </form>
  );
};
