import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {


  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password);
      if (!res) throw new Error('Could not complete signup.');
      await res.user.updateProfile({ displayName });

      dispatch({ 
        type: "LOGIN",
        payload: res.user
      })

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

  return { error, isPending, signup }
}