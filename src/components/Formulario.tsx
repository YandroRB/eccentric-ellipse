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
      className="md:mx-auto flex flex-col max-w-[425px] space-y-5 text-textp rounded-sm bg-background-page/55 shadow-[0_0_10px_rgba(4,120,87,0.3)] ring-1 ring-emerald-400/20 px-3 py-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="nombre">Nombre:</label>
        <input
          className="bg-background-box rounded-sm p-2"
          type="text"
          id="nombre"
          name="nombre"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="correo">Correo electrónico:</label>
        <input
          className="bg-background-box rounded-sm p-2"
          type="email"
          id="correo"
          name="correo"
          required
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          className="resize-none bg-background-box rounded-sm p-2"
          name="mensaje"
          id="mensaje"
          rows={5}
          cols={30}
          required
        ></textarea>
      </div>

      <button
        className="mx-auto w-fit inline-flex items-center gap-2 px-6 py-2 outline-2
        outline-textt/45 rounded-bl-md rounded-tr-md rounded-tl-xs rounded-br-xs
        bg-background-box text-textp font-semibold shadow-md hover:bg-textt/35 md:hover:shadow-emerald-700 transition-all duration-300
        hover:cursor-pointer"
        type="submit"
      >
        Enviar
      </button>
    </form>
    <Modal estado={estado} onClose={onClose}/>
    
    </>
   
  );
}
