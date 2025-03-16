import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <div className="text-center space-y-6 px-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Welcome to <span className="text-yellow-300">ChatApp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Connect, chat, and share with your friends and colleagues in real-time.
          Secure, fast, and intuitive.
        </p>

        {/* Call-to-Action Button */}
        <div className="mt-6">
          <Link
            className="bg-yellow-400 z-10  pointer-events-auto cursor-pointer text-blue-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-500 transition-all duration-300"
            to={"/dashboard"}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Home;
