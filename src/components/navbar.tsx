"use client";
import { useRouter } from "next/navigation";
import { House, QrCode } from "lucide-react";

export function Navbar() {
  const router = useRouter();

  const navItems = [
    {
      label: "Home",
      icon: House,
      path: "/",
    },
    {
      label: "Create QR",
      icon: QrCode,
      path: "/create_qr",
    },
  ];

  return (
    <nav className="bg-black h-14 px-4 flex items-center justify-between shadow-md">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/favicon.ico" alt="Logo" className="h-7 invert" />
        <span className="text-white text-lg font-bold tracking-tight">
          QR Generator
        </span>
      </div>

      <div className="flex gap-6">
        {navItems.map(({ label, icon: Icon, path }) => (
          <div
            key={label}
            onClick={() => router.push(path)}
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icon size={18} />
            <span className="pl-1 text-md font-medium">{label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
