"use client";
import { House, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <div className="px-4 h-12 bg-black flex justify-evenly items-center gap-4">
      <div
        className="flex justify-center items-center gap-1"
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <img src="favicon.ico" alt="" className="invert brightness-0 h-8" />
        <p className="text-white text-xl font-extrabold">QR Generator</p>
      </div>
      <div className="flex-1"></div>
      <div
        className="flex justify-center items-center gap-0.5"
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <House color="#a1a1a1" height={16}></House>
        <p className="text-neutral-400">Home</p>
      </div>
      <div
        className="flex justify-center items-center gap-0.5"
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/create_qr")}
      >
        <QrCode color="#a1a1a1" height={16} />
        <p className="text-neutral-400">Create QR</p>
      </div>
    </div>
  );
}
