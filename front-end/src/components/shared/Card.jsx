import React from "react";

const Card = (props) => {
  const { img, nombre, descripcion, precio, categoria } = props;

  return (
    <div className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300">
      <img
        src={img}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full"
      />
      <p className="text-xl">{nombre}</p>
      <p className="text-gray-400">{descripcion}</p>
      <span className="text-gray-400">${precio}</span>
      <p className="text-gray-600">Categoria: {categoria} </p>
    </div>
  );
};

export default Card;
