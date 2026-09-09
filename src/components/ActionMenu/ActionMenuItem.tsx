import styles from "./ActionMenuItems.module.scss";

const ActionMenuItem = ({ name, onClickFunction }: any) => {
  return (
    <div
      className=" bg-white font-[500] text-xs flex items-center py-[9px] px-[19px] text-darkPurple hover:text-lightPurple  hover:bg-faintPurple"
      onClick={onClickFunction}
    >
      {name}
    </div>
  );
};
export default ActionMenuItem;
