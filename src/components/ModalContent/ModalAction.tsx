import Image from "next/image"
import { useState } from "react"
import { TailSpin } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/Hooks/use-redux"
import sucessPic from "../../assets/image/sucessPic.svg"
import { uiActions } from "../../redux/store/ui-slice"

const ModalAction = ({
  action,
  item,
  actionFunction,
  type = "normal",
}: any) => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const { loadingEdit, loading, loadingDelete } = useAppSelector(
    (state) => state.user
  )
  console.log(loading)
  return (
    <div className="p-4 rounded-[52px] shadow-tableShadow items-center flex flex-col gap-4">
      <Image src={sucessPic} alt={""} width={150} />
      <div className="text-lightDark  text-base">Confirmation</div>
      {type === "reason" ? (
        <input
          placeholder="Reason For Rejection"
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          className="border border-softGray p-3 rounded-lg placeholder:text-text placeholder:text-sm text-sm text-text w-full"
        />
      ) : (
        <div className="text-sm text-lightDark p-3">
          Are you sure you want to
          <span className="text-darkPurple ml-1">{action}</span> this{" "}
          <span className=" ml-1">{item} ?</span>
        </div>
      )}
      <div className="flex items-center gap-3 ">
        <div
          className="text-xs text-darkPurple border border-lightPurple py-2 px-3 rounded-md flex items-center justify-center w-[150px] mx-auto cursor-pointer"
          onClick={() => dispatch(uiActions.closeModal())}
        >
          Cancel
        </div>
        <div
          className="text-xs text-white bg-lightPurple py-2 px-3 rounded-md flex items-center justify-center w-[150px] mx-auto cursor-pointer"
          onClick={() => {
            if (type === "reason") {
              actionFunction(input)
            } else {
              actionFunction()
            }
          }}
        >
          {loading || loadingEdit || loadingDelete ? (
            <TailSpin height={20} color="#d7d7d7" />
          ) : (
            "Confirm"
          )}
        </div>
      </div>
    </div>
  )
}
export default ModalAction
