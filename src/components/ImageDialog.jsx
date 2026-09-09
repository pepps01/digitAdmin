import { Dialog } from "@mui/material"
import Image from "next/image"
import { useRef, useState } from "react"
import { BsDownload } from "react-icons/bs"
import { useReactToPrint } from "react-to-print"

function ImageDialog({ image, name, style }) {
  const componentRef = useRef()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [img, setImg] = useState()

  const handleAvatarClick = (data) => {
    setIsModalOpen(true)
    setImg(image)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: name,
  })

  const handleDownload = () => {
    // Create a temporary anchor element
    const a = document.createElement("a")
    a.href = img // Set the image source as the href
    a.download = "image.png" // Set the download filename

    // Trigger a click event on the anchor element to initiate the download
    a.click()
  }

  return (
    <div>
      <div onClick={() => handleAvatarClick(image)}>
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          style={style}
        />
      </div>
      {/* <Avatar src={image} alt={image} /> */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative">
          <div id="divToPrint" ref={componentRef}>
            <Image
              src={img}
              alt={name}
              width={800}
              height={800}
              style={{
                objectFit: "cover",
                borderRadius: "16px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center absolute bottom-5 right-5"
            onClick={handlePrint}
          >
            <BsDownload />
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default ImageDialog
