import { FC } from "react";

interface Props {
  marginTop?: number;
  onChange?: any;
  value?: any;
  style?: any;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: any;
  type?: "text" | "number" | "email" | "password" | 'date';
  name?: string;
  label?: string;
  autoCorrect?: boolean;
}

const TextInput: FC<Props> = ({
  marginTop,
  label,
  placeholder,
  value,
  onChange,
  style,
  name,
  type = "text",
  error,
  maxLength,
}) => {
  return (
    <div className="mt-[10px]">
      <label className=" text-[10px] text-[#1D2939] bg-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
        placeholder={placeholder}
      />
      {error ? <h6 className="text-[8px]  text-red-500">{error}</h6> : null}
    </div>
  );
};

export default TextInput;
