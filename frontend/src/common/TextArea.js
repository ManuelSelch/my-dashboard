import React from "react"

export default function TextArea({name, value, setValue}) {
  return (
    <>
      {/*<!-- Component: Rounded base size basic textarea --> */}
      <div className="relative">
       
        <textarea
          id="id-01"
          type="text"
          name="id-01"
          placeholder="Write your message"
          rows="3"
          className="peer relative w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          value={value}
          onChange={(e) => setValue(e.target.value)} 
        ></textarea>
        
        
        <label
          htmlFor="id-01"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\ua0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          {name}
        </label>

        
      </div>
      {/*<!-- End Rounded base size basic textarea --> */}
    </>
  )
}
