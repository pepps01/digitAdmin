import Image from "next/image"
import Currency from "react-currency-formatter"
import blue from "../assets/image/blue.jpeg"
import green from "../assets/image/green.jpeg"
import orange from "../assets/image/orange.jpeg"

const CardContainer = ({ orders, transaction, users }: any) => {
  function sumofArray(sum: any, num: any) {
    return sum + num
  }
  const totalSales = orders
    ?.map((item: any) => {
      return Number(item.price)
    })
    .reduce(sumofArray, 0)

  const totalTransactions = transaction
    ?.map((item: any) => {
      return Number(item.amount)
    })
    .reduce(sumofArray, 0)

  const totalOrders = orders?.length
  const totalUsers = users?.length

  const cardData = [
    {
      id: 1,
      name: "Total Sales",
      figures: totalSales,
      img: orange,
      type: "number",
    },
    {
      id: 2,
      name: "Total Revenue",
      figures: totalTransactions,
      img: green,
      type: "number",
    },
    {
      id: 3,
      name: "Total Orders",
      figures: totalOrders,
      img: blue,
      type: "string",
    },
    {
      id: 4,
      name: "Total Users",
      figures: totalUsers,
      img: orange,
      type: "string",
    },
  ]

  return (
    <div className=" justify-center gap-2 md:justify-between grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 items-center py-3">
      {cardData.map((item) => (
        <div
          className="w-[140px] h-[100px] md:w-[240px] shadow-2xl, rounded-sm items-center p-2 flex justify-between text-black bg-white"
          key={item.id}
          style={{
            boxShadow: "0px 1px 2px 1px #d7d7d7",
          }}
        >
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-sm">{item.name}</h3>

            <div className="md:text-xl text-base font-extrabold">
              {item.type === "number" ? (
                <Currency
                  quantity={item.figures}
                  currency="NGN"
                  pattern="! ##,### "
                />
              ) : (
                item.figures
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <Image src={item.img} alt={""} />{" "}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardContainer
