import { House, QrCode } from "lucide-react";

export function Navbar() {
  return (
    <div className="px-4 h-12 bg-custom-purple flex justify-evenly items-center gap-4">
      <div className="flex justify-center items-center gap-1">
        <img src="favicon.ico" alt="" className="invert brightness-0 h-8" />
        <p className="text-white text-xl font-extrabold">QR Generator</p>
      </div>
      <div className="flex-1"></div>
      <div className="flex justify-center items-center gap-0.5">
        <House color="#a1a1a1" height={16}></House>
        <p className="text-neutral-400">Home</p>
      </div>
      <div className="flex justify-center items-center gap-0.5">
        <QrCode color="#a1a1a1" height={16}></QrCode>
        <p className="text-neutral-400">Create QR</p>
      </div>
    </div>
  );
}
