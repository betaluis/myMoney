import { useEffect, useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { projectAuth, projectFirestore } from '../firebase/config'

export const useLogin = () => {

  const [isCanceled, setIsCanceled] = useState(false);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {

    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      console.log(res);
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
      setError(error.message);
      console.log(error.message)
      setIsPending(false);
    }

  }

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);

  return { isPending, error, login }
}