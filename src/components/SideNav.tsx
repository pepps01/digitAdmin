import { memo, useEffect, useState } from "react"
import { innerNav, outerNav } from "../utils/analytics"

import { useDispatch } from "react-redux"

import Link from "next/link"
import profile from "../assets/image/profile.svg"

import { Avatar } from "@mui/material"
import { useRouter } from "next/router"
import { useAppSelector } from "src/Hooks/use-redux"
import { authActions } from "src/redux/store/auth-slice"
import { getFirstWord, includesSubstring } from "src/utils/helperFunctions"

const SideNav = ({ showNav, setShowNav }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { adminDetails } = useAppSelector((state) => state.auth)
  const [array, setArray] = useState<string[]>([])
  const path = location.pathname
  console.log(path)
  const [value, setValue] = useState(path)
  const [selected, setSelected] = useState(path)

  useEffect(() => {
    setValue(getFirstWord(path))
  }, [path])

  // useEffect(() => {
  //   setArray(router.pathname.split("/"));
  //   setPath(router.pathname.slice(1));
  //   setValue(path);
  // }, []);

  return (
    <div
      className={`fixed left-0 md:top-0  top-[60px] ${
        showNav ? "flex" : "hidden"
      } md:flex  w-[265px] h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] md:h-screen md:min-h-screen rounded-r-3xl  bg-[#475467] z-30`}
    >
      <div className="bg-[#1D2939]  w-[60px] rounded-r-3xl py-10 flex flex-col items-center">
        <ul className="mt-[70px] flex flex-col gap-2">
          {innerNav.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center "
            >
              <div
                className="px-4"
                onClick={() => {
                  setValue(item.value)
                  router.push(item.route)
                }}
                style={{
                  borderLeft: includesSubstring(item.value, path)
                    ? "3px solid white"
                    : "none",
                }}
              >
                <li
                  className="p-2 md:w-[40px] font-extrabold text-white rounded text-center"
                  style={{
                    border: includesSubstring(item.value, path)
                      ? "1px solid"
                      : "none",

                    borderColor: includesSubstring(item.value, path)
                      ? "white"
                      : "transparent",
                    height: includesSubstring(item.value, path)
                      ? "100px"
                      : "auto",

                    backgroundColor: item.color,
                  }}
                >
                  {item.initials}
                </li>
              </div>
              {/* {item?.navItems && (
                <ul className="flex flex-col md:hidden max-h-[100px] overflow-y-auto pl-4 mt-2">
                  {item?.navItems?.map((nav: any) => (
                    <li
                      className=" text-[8px] w-full  p-2  rounded-[-12px] hover:bg-darkPurple text-white"
                      style={{
                        backgroundColor: includesSubstring(nav.value, path)
                          ? "rgba(255,255,255, .2)"
                          : "transparent",
                        // color: selected === nav.name ? "white" : "white",
                        borderRadius: includesSubstring(nav.value, path)
                          ? "4px"
                          : "0",
                      }}
                      key={nav.id}
                      onClick={() => {
                        setSelected(nav.name)
                      }}
                    >
                      <Link href={nav.route} legacyBehavior>
                        <a> {nav.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          ))}
        </ul>
        {/* <button
          className="md:hidden text-xs text-center p-2 rounded-l-full rounded-[-12px] absolute bottom-6 text-white border border-faintWhite"
          onClick={() => dispatch(authActions.logoutHandler())}
        >
          Logout
        </button> */}
      </div>
      <div className=" relative w-full px-6 mt-8">
        <div className="bg-faintWhite flex items-center justify-around gap-3 rounded p-3">
          <div className="w-8 h-8">
            <Avatar src={profile} alt={adminDetails?.fullName} />
          </div>

          <div>
            <div className="text-xs text-white">{adminDetails?.firstName}</div>

            <div className="text-xs text-white capitalize">
              {adminDetails?.role}
            </div>
          </div>
        </div>
        <ul className=" flex flex-col gap-2 mt-10 w-full">
          {outerNav
            .filter((item: any) => item.value === value)
            .map((item: any) => (
              <li
                className=" text-xs w-full  p-2 rounded-l-full rounded-[-12px] hover:bg-darkPurple"
                style={{
                  backgroundColor: includesSubstring(item.route, path)
                    ? "rgba(255,255,255, .2)"
                    : "transparent",
                  color: includesSubstring(item.route, path)
                    ? "white"
                    : "white",
                  borderRadius: includesSubstring(item.route, path)
                    ? "4px"
                    : "0",
                }}
                key={item.id}
                onClick={() => {
                  setSelected(item.name)
                }}
              >
                <Link href={item.route} legacyBehavior>
                  <a> {item.name}</a>
                </Link>
              </li>
            ))}
        </ul>

        <button
          className="text-xs w-full text-center p-2 rounded-l-full rounded-[-12px] absolute md:bottom-6 bottom-20 text-white border border-faintWhite"
          onClick={() => dispatch(authActions.logoutHandler())}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default memo(SideNav)
