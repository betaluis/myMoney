

import { useRef, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore';
import './Home.css'  

export default function TransactionForm({ uid }) {

  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const nameInput = useRef();

  const { addDocument } = useFirestore('transactions');

  const handleSubmit = e => {
    e.preventDefault();
    addDocument({
      name: transactionName,
      amount,
      uid
    })

    setAmount('');
    setTransactionName('');
    nameInput.current.focus();
  }

  return (
    <div className="TransactionForm">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Transaction Name:'
          onChange={e => setTransactionName(e.target.value)}
          value={transactionName}
          ref={nameInput}
          required
        />
        <input 
          type="number" 
          placeholder='Amount ($):' 
          onChange={e => setAmount(e.target.value)}
          value={amount}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  )
}