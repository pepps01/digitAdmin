const MultipleInput = ({
  index,
  element,
  handleChange,
  removeFormFields,
}: any) => {
  return (
    <div className="w-full relative border-bottom border-lightGray" key={index}>
      <div className="mt-[10px]">
        <label className=" text-[10px] text-[#1D2939] bg-white">Title</label>
        <input
          type="text"
          name={`title`}
          value={element?.title}
          onChange={e => handleChange(index, e)}
          className="border-[0.5px] border-lightGrey  rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
        />
      </div>
      <div className="mt-[10px]">
        <label className=" text-[10px] text-[#1D2939] bg-white">Value</label>
        <input
          type="text"
          name={`value`}
          value={element?.value}
          onChange={e => handleChange(index, e)}
          className="border-[0.5px] border-lightGrey  rounded-[10px] bg-white text-[12px] placeholder:text-[10px] placeholder:text-softGrey w-full h-full focus:outline-none focus:bg-white target:outline-none target:bg-white active:bg-white px-2 py-3 text-grey"
        />
      </div>
      {index ? (
        <div
          onClick={removeFormFields}
          className="text-xs text-red-600 right-0 -bottom-5 absolute"
        >
          &minus; Remove item
        </div>
      ) : null}
    </div>
  );
};

export default MultipleInput;
