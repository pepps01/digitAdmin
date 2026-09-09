import styles from "./ActionMenuItems.module.scss";

const ActionMenuItems = ({ items }: any) => {
  return (
    <div className="absolute top-[80%] right-[50%] translate-x-1/2 w-[max-content] min-w-[150px] flex flex-col bg-white p-0 shadow-actionShadow rounded-md z-100 max-h-[150px] overflow-auto">
      {items}
    </div>
  );
};
export default ActionMenuItems;
