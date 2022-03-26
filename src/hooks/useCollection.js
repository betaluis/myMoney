import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config";


export const useCollection = (collection, _query, _orderBy) => {

  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const query = useRef(_query).current; 
  const orderBy = useRef(_orderBy).current; 

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (_query) ref = ref.where(...query);
    if (_orderBy) ref = ref.orderBy(...orderBy);

    const unsub = ref.onSnapshot(snapshot => {
      let results = [];
      snapshot.docs.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
      setDocuments(results);
    }, error => {
      setError(error.message);
      console.log(error.message);
    });

    return () => unsub();

  }, [collection])

  return { documents, error }
}