"use client";

import Link from "next/link";

export default function Header() {
  const links = [
    { href: "/favorite", label: "Favorites", icon: "bi bi-heart" },
    { href: "/basket", label: "Basket", icon: "bi bi-bag" },
  ];

  return (
    <header className="">
      <div className="container">
        <div className="flex items-center justify-between py-4 mb-5">
          <Link href="/" className="text-[26px] font-bold text-[#7000FFFF]">
            Online Market
          </Link>

          <div className="max-w-130 flex items-center w-full h-12 border border-gray-300 rounded-lg">
            <input
              type="text"
              className="border-none pl-6 outline-none w-full"
              placeholder="Search..."
            />
            <button className="h-12 text-white bg-[#7000FFFF] rounded-r-lg w-22">
              <i className="text-[20px] bi bi-search"></i>
            </button>
          </div>

          <nav className="flex items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center cursor-pointer gap-3 p-[5px_20px]"
              >
                <i className={`${link.icon} text-[20px]`}></i>
                <span className="text-[18px] font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
