import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import state from '../store';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal,items }) => {
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const [formData, setFormData] = useState({
		    a_type:'',
        balance:0,
        date_created:currentDate,
        user_id:items.userId,
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
        console.log(formData);
        axios.post("http://localhost:8081/post", formData);
        navigate("/Home",{replace:true});
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
              <span className='flex justify-between'><h2 className='text-3xl mb-4'>Create Account</h2><svg xmlns="http://www.w3.org/2000/svg" height="1em" className='hover:cursor-pointer' onClick={handleClick} viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg></span>
              <p className='mb-4'>Easy to Create</p>
              <form onSubmit={handleSubmit}>
              <div className="flex w-72 flex-col gap-6">
              <select label="Account Type" onChange={handleChange} name='a_type' value={formData.a_type}>
                <option value="" disabled selected>Account Type</option>
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
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

export default CustomModal;