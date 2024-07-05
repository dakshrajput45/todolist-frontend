import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast"
import axios from "axios";



const  url = "https://todolist-backend-jhgg.onrender.com";
function Signup({ isLoggedIn,setIsLoggedIn }) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", password: "", confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [ cookies, setCookie, removeCookie] = useCookies(['user']);


  const submitHandler = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords Do Not Match");
    } else {
        try {
            const {data} = await axios.post(`${url}/register`, formData);
            if (data.status === "ok") {
                // User registered successfully
                await setCookie("userId",data.data);
                setIsLoggedIn(true);
                toast.success("Account Created");
                navigate("/tasks");
            } else {
                toast.error("An error occurred ");
            }
        } catch (error) {
            console.error(Error);
            if (error.response.status === 409) {
                toast.error("User Exist");
            }
            else
            toast.error("An error occurred while creating the account");
        }
    }
};

  function changeHandler(event) {
    setFormData((prevData) => (
      {
        ...prevData,
        [event.target.name]: event.target.value
      }
    ))
  }
  return (
    <form className="max-w-md min-w-[350px] mt-[350px] mr-[80px] md:mt-[170px] border border-black p-[20px] rounded-3xl shadow-2xl" onSubmit={submitHandler}>
    <p className="mb-[15px] text-[20px] font-semibold">Sign Up</p>
   <div className="relative z-0 w-full mb-5 group">
     <input type="email" name="email" id="floating_email" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " onChange={changeHandler} 
      value={formData.email} required />
     <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
   </div>
   <div className="relative z-0 w-full mb-5 group flex flex-row items-center">
     <input type={showPassword ? "text" : "password"} name="password" id="floating_password" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" "  onChange={changeHandler} value={formData.password} required />
     <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
     <span className="text-[20px]" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
   </div>
   <div className="relative z-0 w-full mb-5 group flex flex-row items-center">
      <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required value={formData.confirmPassword} onChange={changeHandler}/>
      <label htmlFor="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      <span className="text-[20px]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
  </div>

   <button type="submit" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800">Submit</button>
 </form>
  );
}
export default Signup;