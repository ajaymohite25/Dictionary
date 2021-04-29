import React, { useState, createContext } from "react";
const loginContext = createContext();

function IsloginContext(props) {
  const [isLogin, setLogin] = useState(false);
  return (
    <loginContext.Provider value={[isLogin, setLogin]}>
      {props.children}
    </loginContext.Provider>
  );
}

export default IsloginContext;
export { loginContext };
