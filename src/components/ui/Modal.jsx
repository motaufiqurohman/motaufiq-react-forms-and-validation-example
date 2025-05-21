import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

import { FaCheck } from "react-icons/fa6";

import Button from "./Button.jsx";

export default function Modal({ ref, message }) {
  const dialogRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  function handleClose() {
    const value = dialogRef.current.returnValue;
    console.log(value);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="p-6 mx-auto transition-all rounded-2xl outline-0 mt-50 max-w-100"
    >
      <div className="flex justify-center">
        <span className="text-xl text-green-500 bg-green-200 rounded-full p-7">
          <FaCheck />
        </span>
      </div>
      <h3 className="mt-4 font-semibold text-center text-gray-600">
        Successful
      </h3>
      <div className="mt-2 text-sm font-light text-center text-gray-500">
        <span>{message}</span>
      </div>
      <form method="dialog">
        <Button value="ok" className="w-full mt-7">
          OK
        </Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
