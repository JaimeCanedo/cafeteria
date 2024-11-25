import React from "react";

const Card = (props) => {
  const { img, nombre, descripcion, precio, categoria, agregarAlCarrito } = props;

  return (
    <div className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300">
      <img
        src={img}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full"
      />
      <p className="text-xl">{nombre}</p>
      <p className="text-gray-400">{descripcion}</p>
      <span className="text-gray-400">${precio}</span>
      <p className="text-gray-600">Categoria: {categoria}</p>
      <button
        onClick={agregarAlCarrito}
        className="bg-[#ec7c6a] text-white py-2 px-4 rounded-lg mt-4"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default Card;
