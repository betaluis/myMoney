

import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext'

// Components 
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

import './Home.css'

export default function Home() {

  const { user } = useAuthContext();

  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className="Home">
      <div className="Home__grid">
        <TransactionForm uid={user.uid} />
        {error && <TransactionList error={error}/>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
    </div>
  )
}