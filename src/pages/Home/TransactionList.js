
import { AiTwotoneDelete } from 'react-icons/ai';
import { useFirestore } from '../../hooks/useFirestore';

import './Home.css'

export default function TransactionList({ transactions, error }) {

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const { deleteDocument } = useFirestore('transactions');

  const handleDelete = (id) => {
    deleteDocument(id);
  }

  return (
    <div className="TransactionList">
      <h2>Transactions</h2>
      <div>{error}</div>
      <ul>
        {transactions.map(transaction => (
          <li className='TransactionList__item' key={transaction.id}>
            <h3 className='TransactionList__item-title'>{transaction.name}</h3>
            <p className='TransactionList__item-price'>${numberWithCommas(transaction.amount)}</p>
            <AiTwotoneDelete className='TransactionList__item-delete' onClick={() => handleDelete(transaction.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}