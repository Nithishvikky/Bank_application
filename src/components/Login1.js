import React,{useState} from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import { handleSignUp } from '../utilities';
import { useNavigate } from 'react-router-dom';

export default function Login1() {
  const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		dateOfBirth:'',
    gender:'',
		address:'',
		phone_number:'',
		username:''
	  });
    const[Exists,setExists]=useState(false);
    const navigate = useNavigate();
	
	  const handleChange = (e) => {
      if (e && e.target) {
        const { name, value } = e.target;
        if (name) {
          setExists(false);
          setFormData({
            ...formData,
            [name]: value,
          });
          console.log(name,value);
        } else {
          console.error("Input element is missing the 'name' attribute.");
        }
      } else {
        console.error("Event object or event target is undefined.");
      }
	  };
      formData.username = formData.first_name+"_"+formData.last_name;
      console.log(formData.username);
	  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const isValid=await handleSignUp(formData.email);
        if(isValid){
          setExists(false);
          console.log(formData)
          axios.post("http://localhost:8081/post1", formData);
          navigate("/",{replace:true}); 
        }
        else{
            setExists(true);
        }
       } catch (error) {
        console.log(error);
       }
	  };
	
  return (
    <div className='max-h-screen py-40' style={{backgroundImage:"linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"}}>
     <div className='container mx-auto' style={{marginTop:"-50px"}}>
      <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden'>
       <div className='w-full lg:w-1/2 flex flex-col item-center justify-center p-12 bg-no-repeat bg-cover bg-center dd'>
        <h2 className='text-white text-3xl text-center mb-2'>Welcome</h2>
        <div>
          <p className='text-white'>Hello everyone this is first project of mine about banking appliacation</p>
        </div>
       </div>
       <div className='w-full lg:w-1/2 py-16 px-12'>
        <h2 className='text-3xl mb-4'>Register</h2>
        <p className='mb-4'>Create your account and Check about your bank history</p>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-5'>
            <input type='text' placeholder='Firstname'name="first_name"	value={formData.first_name}	onChange={handleChange} className='border border-gray-400 py-1 px-2'></input>
            <input type='text' placeholder='Lastname' name="last_name"	value={formData.last_name}	onChange={handleChange}className='border border-gray-400 py-1 px-2'></input>
          </div>
          <div className='mt-5'> 
            <input type='tel' placeholder='Phone' name="phone_number" value={formData.phone_number}	onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'></input>
          </div>
          <div className='mt-5'>
          <div className="flex w-72 flex-col gap-6">
           <select label="Gender" name="gender" value={formData.gender} onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'>
           <option value="" disabled selected>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
           </div>
          </div>
          <div className='mt-5'> 
            <input type='email' placeholder='Email' name="email" value={formData.email} onChange={handleChange}className='border border-gray-400 py-1 px-2 w-full'></input>
            {Exists? (<div className='w-max flex items-center px-3 mt-2'><svg xmlns="http://www.w3.org/2000/svg" height="1rem" className='fill-red' viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg><span className='text-red-600 ml-1'>User already Exists</span></div>):""}
          </div>
          <div className='mt-5 grid grid-cols-2 gap-5'> 
            <input type='password' placeholder='Password' name="password"	value={formData.password}	onChange={handleChange} className='border border-gray-400 py-1 px-2 w-full'></input>
            <input type='password' placeholder='Confirm Password' className='border border-gray-400 py-1 px-2 w-full'></input>
          </div>
          <div className='mt-5'> 
            <button className=' py-3 text-center text-black text-xl font-bold w-full' style={{backgroundImage:"linear-gradient(109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1%)"}}>Register</button>
          </div>
          <div className='mt-5'> 
            <span>Already have an account?<Link to='/' className='text-blue-600 underline'>Login</Link></span>
          </div>
        </form>
       </div>
      </div>
     </div>
    </div>
  )
}
