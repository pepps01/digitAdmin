import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { GrFormClose } from "react-icons/gr"
import { HiOutlineMenuAlt1 } from "react-icons/hi"

const TopNav = ({ showNav, setShowNav }: any) => {
  const router = useRouter()
  const [array, setArray] = useState<string[]>([])
  const [path, setPath] = useState<string>("")

  useEffect(() => {
    setArray(router.pathname.split("/"))
    setPath(router.pathname.slice(1))
  }, [router.pathname])

  return (
    <div className="fixed top-0  md:left-[265px] w-[calc(100vw-0px)] md:w-[calc(100%-265px)] p-[10px] md:p-[20px] flex flex-col-reverse gap-2 justify-center items-center md:flex-row md:justify-between mb-8 bg-white z-100">
      <div
        className="absolute top-1/2 -translate-y-1/2 left-3   block md:hidden"
        onClick={() => setShowNav(!showNav)}
      >
        {showNav ? <GrFormClose size={20} /> : <HiOutlineMenuAlt1 size={20} />}
      </div>
      <div className="flex md:w-auto w-full  items-center md:justify-around justify-center">
        <div className="text-base text-[#1D2939] capitalize font-extrabold">
          {array[1]}
          <span className="font-extrabold ml-2">-</span>
        </div>
        <div className="text-[#475467] font-normal capitalize ml-2">
          {array[2]}
        </div>
      </div>

      <div className="w-[155px] flex justify-around">
        {/* <div className="h-6 w-6">
          <Image src={bell} alt={""} />
        </div>
        <div className="h-6 w-6">
          <Image src={setting} alt={""} />
        </div>
        <div className="h-6 w-6">
          <Image src={profile} alt={""} />
        </div> */}
      </div>
    </div>
  )
}
export default TopNav
