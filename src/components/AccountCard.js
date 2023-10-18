import React from 'react';
import axios from 'axios';

export default function AccountCard({item}) {
    console.log(item.account_id);
    const str = item.a_type;
    const string = str.charAt(0).toUpperCase()+str.slice(1);
    const number=item.account_id;
    const num=number.toString().padStart(16,'0').replace(/(\d{4})/g, `$1${' '}`);
    const dateString = item.date_created;
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const handleClick=()=>{
      axios.delete(`http://localhost:8081/delete3/${item.account_id}`)
      .then((response)=>{
        if(response.status === 200){
          axios.delete(`http://localhost:8081/delete/${item.account_id}`)
          .then((response)=>{
            if(response.status===200){
              console.log('account deleted succefully');
              window.location.reload();
            }
          });
          console.log('Transaction deleted succefully');
        }
      });
    }
  return (
     <div className='bg-gray-200 rounded-xl p-6 lg:w-1/4 sm:w-1/2'>
      <div className='flex justify-between'><h2 className='text-2xl font-bold mb-2' key={item.account_id}>{string} account</h2><span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" onClick={handleClick} className='hover:cursor-pointer'><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></span></div>
       <div className='text-gray-800 leading-relaxed mt-3'>
        <h6>Number    : <span className='font-bold'>{num}</span></h6>
        <h6>Balance : <span className='font-bold'> ₹ {item.balance}</span></h6>
        <h6>Created : <span className='font-bold'>{formattedDate}</span></h6>
       </div>
     </div>
  )
}
