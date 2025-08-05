import { useState, type FormEvent } from "react";
import Modal from "./Modal.tsx";

export type EstadoType="idle" | "cargando" | "exito" | "error";

export default function FormularioContacto() {
  const [estado, setEstado] = useState<EstadoType>("idle");

  const onClose=()=>{
    setEstado("idle");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    setEstado("cargando");
    const formData = {
      nombre: form.nombre?.value ?? '',
      correo: form.correo?.value ?? '',
      mensaje: form.mensaje?.value ?? ''
    };

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      });

      if (respuesta.ok) {
        setEstado("exito");
        form.reset();
      } else {
        setEstado("error");
      }
    } catch (error) {
      console.error(error);
      setEstado("error");
    }
  };

  return (
    <>
     <form
      id="formContacto"
      className="md:mx-auto  max-w-[425px] box shadow-main"
      onSubmit={handleSubmit}
    >
      <div className="input-box">
        <label htmlFor="nombre">Nombre:</label>
        <input
          className="input"
          type="text"
          id="nombre"
          name="nombre"
          required
        />
      </div>

      <div className="input-box">
        <label htmlFor="correo">Correo electrónico:</label>
        <input
          className="input"
          type="email"
          id="correo"
          name="correo"
          required
        />
      </div>

      <div className="input-box">
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          className="resize-none input"
          name="mensaje"
          id="mensaje"
          rows={5}
          cols={30}
          required
        ></textarea>
      </div>

      <button
        className="btn shadow-hover cursor-pointer"
        type="submit"
      >
        Enviar
      </button>
    </form>
    <Modal estado={estado} onClose={onClose}/>
    
    </>
   
  );
}
