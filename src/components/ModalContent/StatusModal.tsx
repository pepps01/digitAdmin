import Image from "next/image"
import { useState } from "react"
import { TailSpin } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { useAppSelector } from "src/Hooks/use-redux"
import { getStatusByYear } from "src/utils/helperFunctions"
import sucessPic from "../../assets/image/sucessPic.svg"
import { uiActions } from "../../redux/store/ui-slice"
import SelectInput from "../SelectInput"

const StatusModal = ({ status, year, actionFunction }: any) => {
  const [input, setInput] = useState<string>("")
  const { loadingEdit, error } = useAppSelector((state) => state.user)
  const [loader, setLoader] = useState<boolean>(false)
  const dispatch = useDispatch()
  console.log(loadingEdit, "inside")

  // useEffect(() => {
  //   setLoader(loading)
  // }, [loading])

  return (
    <div className="p-4 rounded-[52px] shadow-tableShadow items-center flex flex-col gap-4">
      <Image src={sucessPic} alt={""} width={150} />
      <div className="text-lightDark  text-base">Change Status</div>
      <SelectInput
        options={getStatusByYear(year)?.options?.filter(
          (item) => item.value.toLowerCase() !== status.toLowerCase()
        )}
        // value={input}
        onChange={(value: any) => {
          console.log(value)
          setInput(value.value)
          console.log(input)
        }}
      />

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
            actionFunction(input)
          }}
        >
          {loadingEdit ? <TailSpin height={20} color="#d7d7d7" /> : "Confirm"}
        </div>
      </div>
    </div>
  )
}
export default StatusModal
