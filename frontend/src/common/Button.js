import React from "react"

export default function Button({name, disabled, onClick}) {
  return (
    <>
      {/*<!-- Component: Large primary basic button --> */}
      <button 
        onClick={onClick}
        disabled={disabled}
        className={"inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"}
      >
        <span>{name}</span>
      </button>
      {/*<!-- End Large primary basic button --> */}
    </>
  )
}
