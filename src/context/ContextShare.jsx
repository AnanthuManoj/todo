import React, { createContext, useState } from 'react'

export const addStatusContext = createContext()
export const isLoginContext = createContext()

function ContextShare({children}) {
    const [isadd,setIsAdd]=useState(false)
    const[islogin,setIsLogin]=useState(false)
  return (
    <div>
        <isLoginContext.Provider value={{islogin, setIsLogin}} >
          <addStatusContext.Provider value={{isadd,setIsAdd}}>
            {children}
            </addStatusContext.Provider>
        </isLoginContext.Provider>
    </div>
  )
}

export default ContextShare