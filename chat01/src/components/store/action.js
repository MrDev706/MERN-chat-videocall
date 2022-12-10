import { Login } from "../login";

const user = {
    email: "poradi500@gmail.com",
    pass: "12345"
}

export const increment = () => {
    return {
      type: "INCREMENT",
    };
  };
  
  export const decrement = () => {
    return {
      type: "DECREMENT",
    };
  };
  
  export const reset = () => {
    return {
      type: "RESET",
    };
  };
  
  export const logIn = () => {
    return {
      type: "LOG_IN",
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT",
    };
  };


 