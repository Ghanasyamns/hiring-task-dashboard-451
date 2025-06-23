import { MouseEventHandler } from "react";

function Button({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-base"
    >
      {children}
    </button>
  );
}

export default Button;
