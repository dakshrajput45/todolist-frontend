import { useEffect,useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const  url = "https://todolist-backend-jhgg.onrender.com";
function AddTask({ isLoggedIn }) {

  const navigate = useNavigate();
  
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])
  const userId = cookies.userId;

  const [formData, setFormData] = useState({ title: "", dueDate: "", status:"Pending",desc:"" });
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const submitHandler = async (event) => {
    event.preventDefault();
        try {
            const {data} = await axios.put(`${url}/addtask`, {
              userId,
              title: formData.title, // Specify the field name as "title"
              dueDate: formData.dueDate,
              status:formData.status,
              desc:formData.desc 
            });
            if (data.status === "ok") {
                toast.success("Tasks Added");
                navigate("/tasks");
            } else if(data.status === "no"){
                toast.error("Title found")
            }else {
              console.log()
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
  };

  return (
        <div className="flex flex-col  items-center mt-[250px] mr-[80px] md:mt-[170px]  border p-[20px]  w-[300px] md:max-w-md self-center rounded-3xl shadow-2xl">
          <form className="w-full md:max-w-md" onSubmit={submitHandler}>
            <p className="mb-[15px] text-[20px] font-semibold">Add a Task</p>
            <div className="relative z-0 w-full mb-5 group">
              <input onChange={changeHandler} type="text" name="title" id="floating_email" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required value={formData.title}/>
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input onChange={changeHandler} type="date" name="dueDate" id="floating_first_name" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required value={formData.dueDate}/>
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Due-Date</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input onChange={changeHandler} type="text" name="status" id="floating_last_name" className="block py-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required value={formData.status}/>
                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black-600 peer-focus:dark:text-black-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">status</label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea onChange={changeHandler} type="text" name="desc" id="floating_email" className="block py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-rgb-0-33-65 peer" placeholder=" " required value={formData.desc}/>
              <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-rgb-0-33-65 peer-focus:dark:text-rgb-0-33-65 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
            </div>
            <button type="submit" className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800">Submit</button>
          </form>
        </div>
  );
}

export default AddTask;
