import { useState, useEffect } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import Sidebar from "./components/shared/Sidebar";
import Car from "./components/shared/Car";
import Header from "./components/shared/Header";
import Card from "./components/shared/Card";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [productos, setProductos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos"); 
  const [carrito, setCarrito] = useState([]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/products");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== idProducto)
    );
  };

  // Filtrar productos según la categoría seleccionada
  const filteredProductos =
    selectedCategory === "Todos"
      ? productos
      : productos.filter((producto) => producto.categoria === selectedCategory);

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      <Car showOrder={showOrder} setShowOrder={setShowOrder} carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />
      <nav className="bg-[#1F1D2B] lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiUser3Line />
        </button>
        <button className="p-2">
          <RiAddLine />
        </button>
        <button onClick={toggleOrders} className="p-2">
          <RiPieChartLine />
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Header con la función para cambiar la categoría */}
          <Header setSelectedCategory={setSelectedCategory} />
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-xl text-gray-300">Productos disponibles</h2>
            <button className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg">
              <RiArrowDownSLine /> {selectedCategory}
            </button>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {filteredProductos.map((producto) => (
              <Card
                key={producto.id}
                img={producto.img}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                categoria={producto.categoria}
                agregarAlCarrito={() => agregarAlCarrito(producto)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
