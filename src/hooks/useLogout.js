import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {

  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
      if (isCanceled) return;
      setIsPending(false);
      setError(null);
    }
    catch (error) {
      if (isCanceled) return;
      setIsPending(false);
      setError(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  
  return { error, isPending, logout }
}