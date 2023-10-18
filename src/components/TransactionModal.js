import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const TransactionModal = ({ isOpen, closeModal,handleCount }) => {
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const [formData, setFormData] = useState({
		account_id:'',
        amount:'',
        transaction_date:currentDate,
        transaction_type:'',
	  });
    
      const navigate = useNavigate();
        const handleChange = (e) => {
            console.log(e.target.name);
          setFormData({
             ...formData,
             [e.target.name]:e.target.value,
          })
          console.log(formData.a_type);
        };
    const handleClick = () => {
        closeModal();
    }
    const handleSubmit =(e) => {
        console.log(formData.amount);
        axios.post("http://localhost:8081/post2", formData);
            if(formData.transaction_type == "deposit" ||formData.transaction_type == "Deposit"){
                axios.put(`http://localhost:8081/update/${formData.account_id}`);
                console.log("hi");
            }
            else{
                axios.put(`http://localhost:8081/update1/${formData.account_id}`);
            }
            const delay = 2000;
            const timeoutId = setTimeout(() => {
              console.log('This code runs after 2 seconds.');
              handleCount();
              navigate("/Home",{replace:true});
            }, delay);
             return () => clearTimeout(timeoutId);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="account Modal"
            appElement={document.getElementById('root')}
            className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
            overlayClassName="fixed inset-0  bg-gray-800 bg-opacity-50"
           >
              <div className='bg-white p-8 rounded-lg shadow-md relative w-11/12 max-w-md sm:w-8/12 md:w-6/12 lg:w-4/12'>
              <span className='flex justify-between'><h2 className='text-3xl mb-4'>Make Transaction</h2><svg xmlns="http://www.w3.org/2000/svg" height="1em" className='hover:cursor-pointer' onClick={handleClick} viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></span>
              <p className='mb-4'>Easy to Transfer your money</p>
              <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-5'>
                  <input type='text' placeholder='Account No'name="account_id"	value={formData.account_id}	onChange={handleChange} className='border border-gray-400 py-1 px-2'></input>
                  <input type='number' placeholder='Amount' name="amount" value={formData.amount}	onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'></input>
              </div>
              <div className="flex w-72 flex-col gap-6 mt-3">
              <select label="Account Type" onChange={handleChange} name='transaction_type' value={formData.transaction_type}>
                <option value="" disabled selected>Transaction Type</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Deposit">Deposit</option>
              </select>
             </div>
                <div className='mt-5'> 
                  <button className=' py-3 text-center text-black text-xl font-bold w-full' style={{backgroundImage:"linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"}}>Create</button>
                </div>
              </form>
              </div>
        </Modal>
    );
};

export default TransactionModal;