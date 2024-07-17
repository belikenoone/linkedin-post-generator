import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 left-0 h-12 bg-slate-400">
      <nav className="flex justify-between items-center w-full max-w-6xl mx-auto px-4 border-2 border-red-400">
        <span>Title</span>
        <Link href="/history">History</Link>
      </nav>
    </header>
  );
};

export default Navbar;
