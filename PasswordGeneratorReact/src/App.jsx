import { useCallback, useState ,useEffect ,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setLength]  = useState(8)
  const [numberAllow ,setNumberAllow] = useState(false);
  const [charAllow , setCharAllow] = useState(false);
  const [password , setPassword] = useState("");
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";

    if(numberAllow) str +="0123456789";
    if(charAllow) str +="!~#@$%^&*(){}[]?"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()* str.length + 1)

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length,numberAllow,charAllow,setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])
  // useCallback(fn,dependencies)
  //useEffect 
  //useRef
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllow,charAllow,passwordGenerator])

  
  return (
    <>
      <div className="max-w-md mx-auto my-8 p-6 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg">

      <h1 className='text-xl text-center space-x-2 text-white my-4'>Password Generator</h1>
      
        <div className='flex items-center space-x-2 mb-4'>

          <input 
            type="text"
            value={password}
            className='w-full p-2 text-orange-600 bg-slate-800 border border-slate-600 rounded-md'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />

          <button 
          onClick={copyPasswordToClipboard}
          className='px-4 py-1 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-200'>Copy</button>
        </div>

        <div className='space-y-4 text-sm'>
          <div className='flex items-center gap-x-4'>
            <input type="range" min={8} max={20}  value={length}
            className='cursor-pointer w-1/2 accent-blue-500'
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            />

            <label >Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-4'>
            <input type="checkbox"
            defaultChecked={numberAllow}
            id='numberInput'
            onChange={()=>{
              setNumberAllow((prev)=> !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-4'>
            <input type="checkbox"
            defaultChecked={numberAllow}
            id='charInput'
            onChange={()=>{
              setCharAllow((prev)=> !prev);
            }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
