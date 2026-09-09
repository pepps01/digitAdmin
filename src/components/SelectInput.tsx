import React, { FC } from "react";
import Select from "react-select";

interface Option {
  value: string | any;
  label: string | any;
}

interface Props {
  onChange?: (value: any) => void;
  value?: string | number;
  defaultInputValue?: string | any;
  error?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  options?: Option[] | any[];
}

const SelectInput: FC<Props> = ({
  options,
  label,
  onChange,
  value,
  defaultInputValue,
  isDisabled,
  isLoading,
  error,
}) => {
  return (
    <div className=" mt-[10px] w-full">
      <label className=" text-[10px] text-[#1D2939] bg-white">{label}</label>
      <Select
        options={options}
        onChange={onChange}
        value={value}
        defaultInputValue={defaultInputValue}
        isLoading={isLoading}
        isDisabled={isDisabled}
        maxMenuHeight={220}
        className="text-[10px] text-[#1D2939] text-md rounded-[10px]"
        // className="border-[0.5px] border-lightGrey relative rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
      />
      {error ? <h6 className="text-[8px]  text-red-500">{error}</h6> : null}
    </div>
  );
};

export default SelectInput;
