"use client"
"use client"
import {useState} from "react"
import Login from "./Login"
import Signup from "./Signup"

function Auth() {
  const [op, setOp] = useState(true)
  
  return (
    
      <>
      
     { op ?  <Login 
     setOp={setOp}
     /> : <Signup
     setOp={setOp}
     />  }
      
      
        </>
    
  )
}

export default Auth
