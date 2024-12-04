import { useState, useEffect } from "react";
import {
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";
import Sidebar from "../../components/shared/Sidebar";
import EntityTable from "../../components/shared/EntityTable";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("products");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Column configurations for each entity
  const entityConfigurations = {
    products: {
      columns: [
        { key: "id", label: "ID" },
        { key: "nombre", label: "Nombre" },
        { key: "descripcion", label: "Descripción" },
        { key: "precio", label: "Precio" },
            ],
      apiUrl: "http://localhost:8085/api/products",
    },
    users: {
      columns: [
        { key: "id", label: "ID" },
        { key: "nombre", label: "Usuario" },
        { key: "email", label: "Correo" },
      ],
      apiUrl: "http://localhost:8085/api/users",
    },
    customers: {
      columns: [
        { key: "id", label: "ID" },
        { key: "nombre", label: "Nombre" },
        { key: "telefono", label: "Teléfono" },
      ],
      apiUrl: "http://localhost:8085/api/customers",
    },
    orders: {
      columns: [
        { key: "id", label: "ID" },
        { key: "fecha_pedido", label: "Fecha" },
        { key: "estado", label: "Estado" }, 
        { key: "total_pedido", label: "Total" },
      ],
      apiUrl: "http://localhost:8085/api/orders",
    },
  };

  const currentEntityConfig = entityConfigurations[activeTab];

  return (
    <div className="bg-[#262837] w-full min-h-screen flex">
      <Sidebar showMenu={showMenu} />
      <div className={`flex-1 lg:pl-32 p-4`}>
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-white">Good morning, Admin!</h1>
          <button
            onClick={toggleMenu}
            className="text-white lg:hidden text-3xl p-2"
          >
            {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </header>

        {/* Pestañas */}
        <nav className="flex gap-4 mb-8">
          {Object.keys(entityConfigurations).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded ${
                activeTab === tab ? "bg-red-500 text-white" : "bg-gray-500 text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Tabla dinámica */}
        <EntityTable
          entityName={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          columns={currentEntityConfig.columns}
          apiUrl={currentEntityConfig.apiUrl}
        />
      </div>
    </div>
  );
}

export default Dashboard;