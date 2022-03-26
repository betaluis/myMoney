
import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config'

const initialState = {
  document: null,
  isPending: null,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        document: null,
        isPending: true,
        error: null,
        success: null
      }
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false
      }
    case "ADD_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true
      }
    case "DELETE_DOCUMENT":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true
      }
    default: 
      return state
  }
}

export const useFirestore = (collection) => {

  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCanceled, setIsCanceled] = useState(false);

  const dispatchIfNotCanceled = (action) => {
    if (isCanceled) return;
    dispatch(action);
  }

  const ref = projectFirestore.collection(collection);

  const addDocument = async (doc) => {

    dispatchIfNotCanceled({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const newDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCanceled({
        type: "ADD_DOCUMENT",
        payload: newDocument
      });
    }
    catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
    }
  }

  const deleteDocument = async (id) => {
    dispatchIfNotCanceled({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCanceled({ 
        type: "DELETE_DOCUMENT"
      })
    }
    catch (error) {
      dispatchIfNotCanceled({
        type: "ERROR",
        payload: error.message
      });
    }
  }

  useEffect(() => {
    return () => setIsCanceled(true);
  });

  return { response, addDocument, deleteDocument }
}