import React from "react"

function Footer() {
  return (
    <div className="flex justify-evenly items-center bg-pink-700 h-[12vh]">
      <div className="text-3xl font-semibold text-white">
        <h1>Task Manager</h1>
      </div>

      <div className="flex text-yellow-300 font-semibold text-[16px]">
        <li>Instagram</li>
        <li>faceBook</li>
        <li>linkdin</li>
        <li>Twiter</li>
      </div>
    </div>
  )
}

export default Footer
