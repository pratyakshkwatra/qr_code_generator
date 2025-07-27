export default function Home() {
  return (
    <div className="relative bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black"></div>

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px] animate-pulse delay-200"></div>

      <div className="relative z-10 space-y-6 animate-fade-up">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]">
          Create Stunning QR Codes
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
          Sleek. Minimal. Powerful.
        </p>

        <a
          href="/create_qr"
          className="inline-block px-8 py-3 text-lg font-semibold bg-white text-black rounded-lg hover:bg-gray-200 transition transform hover:scale-105 shadow-lg"
        >
          Create QR Code
        </a>
      </div>

      <div className="absolute bottom-10 w-3/4 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20"></div>
    </div>
  );
}
