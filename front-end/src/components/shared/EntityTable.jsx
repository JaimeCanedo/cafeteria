import { useState, useEffect } from "react";

function EntityTable({ entityName, columns, apiUrl }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`Error al obtener los ${entityName}:`, error);
      }
    };
    fetchItems();
  }, [apiUrl]);

  const handleEditClick = (item) => {
    if (window.confirm(`¿Estás seguro de que deseas editar este ${entityName.toLowerCase()}?`)) {
      setSelectedItem(item);
      setShowModal(true);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar este ${entityName.toLowerCase()}?`)) {
      try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error(`Error al eliminar el ${entityName}:`, error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/${selectedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      });
      const updatedItem = await response.json();
      setItems(
        items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setShowModal(false);
    } catch (error) {
      console.error(`Error al actualizar el ${entityName}:`, error);
    }
  };

  return (
    <section className="bg-secondary-100 p-8 rounded-xl">
      <h2 className="text-2xl text-white mb-6">Lista de {entityName}</h2>
      <div className="overflow-x-auto">
        <div className="hidden md:grid grid-cols-7 gap-4 mb-4 text-gray-400 text-sm">
          {columns.map((col) => (
            <h5 key={col.key}>{col.label}</h5>
          ))}
          <h5>Acciones</h5>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl text-gray-300"
          >
            {columns.map((col) => (
              <span key={col.key}>{item[col.key]}</span>
            ))}
            <div>
              <button
                className="text-sm text-yellow-400 hover:text-yellow"
                onClick={() => handleEditClick(item)}
              >
                Editar
              </button>
              <br />
              <button
                className="text-sm text-red-400 hover:text-red"
                onClick={() => handleDeleteClick(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-secondary-100 p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl text-white mb-4">Editar {entityName}</h2>
            <form onSubmit={handleFormSubmit}>
              {columns.map((col) => (
                <div key={col.key} className="mb-4">
                  <label className="block text-gray-300">{col.label}</label>
                  <input
                    type={col.type || "text"}
                    className="w-full p-2 rounded bg-secondary-900 text-black"
                    value={selectedItem[col.key] || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        [col.key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded ml-4"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default EntityTable;
