"use client";
import { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "../../../components/background-beams-with-collision";
import { useRouter } from "next/navigation";

export default function AllUsers() {
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getUsers = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/`);
      const data = await res.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleUserClick = (username: string) => {
    router.push(`/searchUser?username=${encodeURIComponent(username)}`);
  };

  return (
    <BackgroundBeamsWithCollision className="flex items-center justify-center min-h-screen p-4 pt-20">
      <div className="w-full max-w-6xl p-4 md:p-8 space-y-6 bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl text-transparent font-bold text-center mb-8 bg-clip-text  bg-gradient-to-r from-purple-400 to-pink-600">
          All Users
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : userDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDetails.map((user) => (
              <div
                key={user.id}
                className="bg-neutral-800 border-2 border-neutral-700 rounded-lg p-6 space-y-4 transform transition-all duration-300 hover:scale-105 hover:border-purple-500 cursor-pointer"
                onClick={() => handleUserClick(user.name)}
              >
                <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${user.status === "Active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                  >
                    {user.status}
                  </span>
                </div>

                {user.pdfFile && (
                  <a
                  href={`http://127.0.0.1:8000/media/${user.pdfFile}`}      
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 relative overflow-hidden group"
                    onClick={(e) => e.stopPropagation()} // Prevent parent click from triggering
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                    <span className="relative z-10 block py-2 text-center text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg group-hover:bg-transparent transition-all duration-300">
                      View PDF
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-400 text-center py-16">No users found.</p>
        )}
      </div>
    </BackgroundBeamsWithCollision>
  );
}