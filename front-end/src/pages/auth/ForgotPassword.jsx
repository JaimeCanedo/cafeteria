import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { RiMailLine } from "react-icons/ri";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    const userEmail = email;
    console.log(userEmail);

    try {
      const response = await fetch("http://localhost:8085/api/send-recovery-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Instrucciones enviadas. Revisa tu bandeja de entrada.");
        Navigate('/login');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("Hubo un problema al procesar tu solicitud.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Recuperar <span className="text-primary">contraseña</span>
        </h1>
        <form className="mb-8" onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
            >
              Enviar instrucciones
            </button>
          </div>
        </form>
        {message && (
          <p className="text-center text-white mt-4">{message}</p>
        )}
        <div className="flex flex-col items-center gap-4">
          <span className="flex items-center gap-2">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-gray-100 transition-colors"
            >
              Ingresa
            </Link>
          </span>
          <span className="flex items-center gap-2">
            ¿No tienes cuenta?{" "}
            <Link
              to="/registro"
              className="text-primary hover:text-gray-100 transition-colors"
            >
              Registrate
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;