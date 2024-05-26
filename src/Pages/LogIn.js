//beacause we have limited amount of api calls ie. 25 per day so i am using demo api
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import axios from "axios";

const  url = "https://todolist-backend-jhgg.onrender.com";
function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
        const response = await axios.post(`${url}/login`, formData);
        //console.log(response);
        if (response.status === 200) {
            setCookie("userId", response.data.data);
            setIsLoggedIn(true);
            toast.success("Welcome Again");
            navigate("/tasks");
        }
    } catch (error) {
      console.error(error);

      // Check if the error response contains a status property
      if (error.response && error.response.status === 404) {
          toast.error("User Not Found");
      } else if (error.response && error.response.status === 401) {
          toast.error("Invalid Password");
      } else {
          // Handle other errors
          toast.error("An error occurred");
    }
  }
};

  return (
    <form className="max-w-md min-w-[300px] mt-[300px] mr-[100px] md:mt-[170px] border border-black p-[20px] rounded-3xl shadow-2xl" onSubmit={submitHandler}>
      <p className="mb-[15px] text-[20px] font-semibold">Log In</p>
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" id="floating_email" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " onChange={changeHandler} 
            value={formData.email} required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mb-5">Email address</label>
      </div>
      <div className="relative z-0 w-full mb-5 group flex flex-row items-center">
        <input type={showPassword ? "text" : "password"} name="password" id="floating_password" className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " onChange={changeHandler} value={formData.password} required />
        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        <span className="text-[20px]" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
      </div>
      <button type="submit" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800">Submit</button>
    </form>
  );
}

export default Login;
