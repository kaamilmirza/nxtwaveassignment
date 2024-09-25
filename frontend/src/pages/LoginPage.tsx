import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <form className="space-y-4">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button className="w-full">
        Log In
        <ArrowRight size={20} className="ml-2" />
      </Button>
      <div className="text-center space-y-2">
        <a href="#" className="text-sm text-blue-500 hover:underline block">
          Forgot password?
        </a>
        <Link to="/signup" className="text-sm text-blue-500 hover:underline block">
          Don't have an account? Sign Up
        </Link>
      </div>
    </form>
  );
};
