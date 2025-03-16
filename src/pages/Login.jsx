import { useEffect, useState } from "react";
import { baseUrl } from "../utils/BaseUrl";
import { toast, Toaster } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data.message, data);
      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 animate-gradient">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8 animate-fade-in">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-in">
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="animate-slide-in delay-100">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 animate-fade-in delay-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Logging In...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80 animate-fade-in delay-300">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;