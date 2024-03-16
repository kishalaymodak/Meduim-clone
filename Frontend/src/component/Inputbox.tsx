import { ChangeEvent } from "react";

interface Inputboxtype {
  lable: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function Inputbox({ lable, placeholder, onChange, type }: Inputboxtype) {
  return (
    <div>
      <label className="block mb-2 text-lg font-semibold text-gray-900 pt-4">
        {lable}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Inputbox;
