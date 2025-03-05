"use client";
import { useState, useEffect } from "react";
import { BackgroundBeamsWithCollision } from "../../../components/background-beams-with-collision";
import { useSearchParams } from "next/navigation";

export default function SearchUser() {
    const searchParams = useSearchParams();
    const initialUsername = searchParams.get("username") || "";

    const [username, setUsername] = useState(initialUsername);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/user/?name=${username}`);
            const data = await res.json();
            setUserDetails(data[0] || null);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-search when username is provided in URL
    useEffect(() => {
        if (initialUsername) {
            handleSearch();
        }
    }, [initialUsername]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BackgroundBeamsWithCollision className="flex items-center justify-center min-h-screen p-4 pt-20">
            <div className="w-full max-w-4xl flex flex-col bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl p-4 md:p-8">

                {/* Heading & Search Bar */}
                <form
                    className="mb-6 w-full"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Search User
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 text-white bg-neutral-800/90 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !username.trim()}
                            className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-purple-800 disabled:opacity-50"
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </form>

                {/* User Details Box */}
                <div className="flex-grow bg-neutral-800/90 border-2 border-neutral-700 rounded-lg p-4 md:p-6 min-h-[300px]">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : userDetails ? (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-white">{userDetails.name}</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-neutral-400">Status:</span>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${userDetails.status === "Active"
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                                        }`}
                                >
                                    {userDetails.status}
                                </span>
                            </div>
                            <p className="text-neutral-300 overflow-y-auto max-h-72 pr-2 leading-relaxed">
                                {userDetails.content}
                            </p>
                            {userDetails.pdfFile && (
                                <a
                                    href={`http://127.0.0.1:8000${userDetails.pdfFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block mt-4 bg-purple-600 text-center text-white py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-neutral-800"
                                >
                                    View PDF
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-neutral-400 text-center">
                                {username.trim() ? "No user found." : "Enter a username to search."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
}