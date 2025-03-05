"use client";
import { useRouter } from "next/navigation";
import { WavyBackground } from "../../components/wavy-background";
import './globals.css'

export default function Dashboard() {
  const router = useRouter();

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="flex flex-col items-center gap-4 p-10">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center mb-24">
        Dashboard
      </p>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={() => router.push("/upload")}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Upload User Details
          </span>
        </button>
        <div className="flex gap-6">

          <button className="cursor-pointer inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => router.push("/getDetails")}
          >
            All User
          </button>
          <button className="cursor-pointer inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => router.push("/searchUser")}
          >
            Search User
          </button>


        </div>

      </div>
    </WavyBackground>
  );
}