import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useSignupMutation } from "../redux-rtk-query/userApiEndpoint";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreviewImage(URL.createObjectURL(file)); // Set image preview
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }

    try {
      const { data } = await signup(formDataToSend);
      if (data?.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 animate-gradient">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-4xl font-bold text-center text-white mb-8 animate-fade-in">
          Join Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-in">
            <label htmlFor="username" className="block text-sm font-medium text-white/80">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="animate-slide-in delay-100">
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

          <div className="animate-slide-in delay-200">
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

          <div className="animate-slide-in delay-300">
            <label htmlFor="photo" className="block text-sm font-medium text-white/80">
              Profile Photo
            </label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-32 bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 text-white/50 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      ></path>
                    </svg>
                    <p className="text-sm text-white/50">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 animate-fade-in delay-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/80 animate-fade-in delay-700">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;