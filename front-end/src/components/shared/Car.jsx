import React from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";

const Car = ({ showOrder, setShowOrder, carrito, eliminarDelCarrito }) => {
  const calcularSubtotal = () =>
    carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      <div className="relative pt-16 lg:pt-8 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
        />
        <h1 className="text-2xl my-4">Carrito</h1>
        <div>
          {carrito.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío</p>
          ) : (
            carrito.map((producto) => (
              <div
                key={producto.id}
                className="bg-[#262837] p-4 rounded-xl mb-4"
              >
                <div className="grid grid-cols-6 items-center mb-4">
                  <div className="col-span-4 flex items-center gap-3">
                    <img
                      src={producto.img}
                      className="w-10 h-10 object-cover"
                      alt={producto.nombre}
                    />
                    <div>
                      <h5 className="text-sm">{producto.nombre}</h5>
                      <p className="text-xs text-gray-500">
                        ${producto.precio}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span>{producto.cantidad}</span>
                  </div>
                  <div>
                    <span>${producto.precio * producto.cantidad}</span>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(producto.id)}
                  className="border border-red-500 p-2 rounded-lg"
                >
                  <RiDeleteBin6Line className="text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="bg-[#262837] absolute w-full bottom-0 left-0 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Subtotal</span>
            <span>${calcularSubtotal()}</span>
          </div>
          <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg">
            Continuar al pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Car;
