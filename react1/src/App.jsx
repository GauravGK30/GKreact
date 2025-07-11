
import { useState } from "react"

function App() {
  const [color, setColor] = useState("red")

  return (
    <>
      <div className="w-full h-screen duration-200"
      style={{backgroundColor: color}}
      >
 
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-2xl max-w-screen-sm mx-auto">

          <button 
          onClick={()=>setColor("red")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"red"}}>Red</button>


          <button 
          onClick={()=>setColor("green")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"green"}}>Green</button>


          <button 
          onClick={()=>setColor("blue")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-large" style={{backgroundColor:"blue"}}>Blue</button>


          <button
          onClick={()=>setColor("black")}
          className="outline-none px-4 py-1 rounded-full text-white shadow-large" style={{backgroundColor:"black"}}>Black</button>


          <button
          onClick={()=>setColor("yellow")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"yellow"}}>Yellow</button>

          <button
          onClick={()=>setColor("olive")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"olive"}}>Olive</button>

          <button
          onClick={()=>setColor("white")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"white"}}>White</button>

          <button
          onClick={()=>setColor("lavender")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"lavender"}}>Lavender</button>

          <button
          onClick={()=>setColor("grey")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"grey"}}>grey</button>

          <button
          onClick={()=>setColor("pink")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"pink"}}>Pink</button>

          <button
          onClick={()=>setColor("orange")}
          className="outline-none px-4 py-1 rounded-full text-black shadow-large" style={{backgroundColor:"orange"}}>Orange</button>

        </div>
      </div>
    </>
  )
}

export default App
