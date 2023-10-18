import axios from "axios";

export const handleSignIn= async(email)=>{
    try {
        const response= await axios.get(`http://localhost:8081/get123/${email}`);
       
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const handleSignUp= async(email)=>{
    try {
        const response= await axios.get(`http://localhost:8081/getSignup/${email}`);
        console.log(response.data);
        if(response.data==0){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}