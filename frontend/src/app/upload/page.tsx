"use client";
import { useState } from "react";
import axios from "axios";
import { BackgroundBeamsWithCollision } from "../../../components/background-beams-with-collision";
import { useRouter } from "next/navigation";

export default function UploadUser() {
  const [name, setName] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    if (!pdfFile) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/post-file/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Reset form after successful upload
      setName("");
      setPdfFile(null);
      setFileName("No file chosen");
      router.push("/getDetails")

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setFileName(file.name);
    }
  };

  return (
    <BackgroundBeamsWithCollision className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-900/60 backdrop-blur-sm rounded-xl shadow-2xl">
        <p className="text-4xl text-white font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Upload PDF
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-neutral-700 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              id="pdf-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <label
              htmlFor="pdf-upload"
              className="flex items-center justify-between w-full px-4 py-3 border-2 border-dashed border-neutral-700 rounded-lg bg-neutral-800 text-neutral-400 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            >
              <span className="truncate max-w-[70%]">{fileName}</span>
              <span className="text-purple-500 hover:text-purple-400">
                Browse
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="relative z-10 block py-3 text-center text-white bg-neutral-800 border-2 border-neutral-700 rounded-lg group-hover:bg-transparent transition-all duration-300">
              Submit
            </span>
          </button>
        </form>
      </div>
    </BackgroundBeamsWithCollision>
  );
}