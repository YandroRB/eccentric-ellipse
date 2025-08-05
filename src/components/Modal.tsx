import React, { useRef, type ReactNode } from "react";
import Spinner from "./icons/Spinner";
import type { EstadoType } from "./Formulario";
import SuccessCheckmark from "./icons/SuccessCheckmark";
import ErrorCross from "./icons/ErrorCross";
interface ModalProps {
  estado: EstadoType;
  onClose: () => void;
}
type EstadoConMensaje = Extract<EstadoType, "exito" | "error">;

const estados: Record<
  EstadoConMensaje,
  { componente: ReactNode; mensaje: string }
> = {
  exito: {
    componente: <SuccessCheckmark />,
    mensaje: "Se ha enviado exitosamente su correo.",
  },
  error: {
    componente: <ErrorCross />,
    mensaje:
      "Surgió un problema al enviar su correo, por favor intente mas tarde.",
  },
};

function Modal({ estado, onClose }: ModalProps) {
  return (
    estado !== "idle" && (
      <div className=" absolute inset-0 flex items-center justify-center bg-black/45">
        {estado == "cargando" ? (
          <Spinner className=" size-[64px] text-emerald-700 " />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-7 text-textpo rounded-sm bg-background-box shadow-main md:w-[450px] md:h-[370px] h-[312px] md:p-14 p-7 text-xl text-center ">
            {estados[estado].componente}
            <p>{estados[estado].mensaje}</p>
            <div
              className="btn2"
              onClick={onClose}
            >
              Cerrar
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Modal;
