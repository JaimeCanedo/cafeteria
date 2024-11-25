import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const Header = ({ setSelectedCategory }) => {
  return (
    <header>
      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl text-gray-300">Skimo Café</h1>
          <p className="text-gray-500">25 noviembre 2024</p>
        </div>
        <form>
          <div className="w-full relative">
            <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              className="bg-[#1F1D2B] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      {/* Tabs */}
      <nav className="text-gray-300 flex items-center justify-between md:justify-start md:gap-8 border-b mb-6">
        <button
          onClick={() => setSelectedCategory("Todos")}
          className="py-2 pr-4 focus:outline-none text-[#ec7c6a]"
        >
          Todos
        </button>
        <button
          onClick={() => setSelectedCategory("Bebidas Frias")}
          className="py-2 pr-4 focus:outline-none"
        >
          Bebidas Frias
        </button>
        <button
          onClick={() => setSelectedCategory("Bebidas Calientes")}
          className="py-2 pr-4 focus:outline-none"
        >
          Bebidas Calientes
        </button>
        <button
          onClick={() => setSelectedCategory("Crepas")}
          className="py-2 pr-4 focus:outline-none"
        >
          Crepas
        </button>
        <button
          onClick={() => setSelectedCategory("Postres")}
          className="py-2 focus:outline-none"
        >
          Postres
        </button>
      </nav>
    </header>
  );
};

export default Header;
