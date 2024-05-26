import { PiExclamationMarkBold } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-hot-toast"
import axios from "axios";



const  url = "https://todolist-backend-jhgg.onrender.com";
function Card({ title, description, status, dueDate, removeFromScreen }) {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const userId = cookies.userId;
    const [taskStatus, setTaskStatus] = useState(status);
    const [currDueDate, setCurrDueDate] = useState(dueDate);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ dueDate: ""});

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }
    function inputDate () {
        setIsEditing(true);
    }
    const handleStatus = async (newStatus) => {
        try {
            const { data } = await axios.put(`${url}/tasks/status`, {
                userId,
                title: title,
                newStatus,
            });

            console.log(data.status);
            if (data.status === "ok") {
                setTaskStatus(newStatus);
            } else {
                toast.error("An error occurred ");
            }
        } catch (error) {
            console.log("par kyu");
            console.error(error);
            toast.error("An error occurred");
        }
    }

    const DeleteHandler = async () => {
        try {
            const { data } = await axios.delete(`${url}/removetask`, {
                data:
                {
                    userId,
                    title
                }
            });

            if (data.status === "ok") {
                removeFromScreen(title);
                toast.success("Deleted");
            } else {
                toast.error("An error occurred ");
            }
        } catch (error) {
            console.log("par kyu");
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const changeDate = async (newDueDate) => {
        try {
            const { data } = await axios.put(`${url}/tasks/status`, {
                userId,
                title: title,
                newDueDate,
            });
            console.log(newDueDate)
            console.log(data.status);
            if (data.status === "ok") {
                setCurrDueDate(newDueDate);
                toast.success("Date Changed");
                setIsEditing(false);
            } else {
                toast.error("An error occurred ");
            }
        } catch (error) {
            console.log("par kyu");
            console.error(error);
            toast.error("An error occurred");
        }
    };
    return (
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-center text-[green] cursor-pointer font-bold mr-4 mb-7">
                {taskStatus === "Completed" ? (<IoIosCheckmarkCircleOutline className="text-[30px]" onClick={() => { handleStatus("Pending") }} />) : (<FaRegCircle className="text-[28px]" onClick={() => { handleStatus("Completed") }} />)}
            </div>
            <div className="flex flex-row gap-x-5 border-2 rounded-xl max-w-[1000px] p-[20px] mb-7 justify-between">
                <div className="flex flex-col">
                    <div className="font-semibold text-red-500 text-[26px]">
                        {title}
                    </div>
                    <div className="font-medium text-[18px]">
                        {description}
                    </div>
                </div>
                <div className="flex flex-row justify-between text-[18px]">
                    <div className="border border-black mr-2"></div>
                    <div className="flex flex-col justify-between text-[18px]">

                        {
                            isEditing ? (
                                <div className="flex flex-row items-center">
                                    DueDate: <input onChange={changeHandler} type="date" name="dueDate" id="floating_first_name" className="text-[18px] block py-4  w-full text-gray-900 bg-transparent appearance-none dark:text-black dark:border-gray-600 dark:focus:border-black-500 focus:outline-none focus:ring-0 focus:border-black-600 peer" placeholder=" " required value={formData.dueDate}/>
                                    <IoCheckmarkSharp className="text-[30px] ml-2" onClick={()=>{changeDate(formData.dueDate)}}/>
                                </div>) : (
                                <div className="flex flex-row items-center">
                                    DueDate: {currDueDate}
                                    <CiEdit className="text-[28px] ml-2" onClick={inputDate}/>
                                </div>)

                        }
                        <div className="">
                            {taskStatus === "Pending" ? (
                                <div className="flex flex-row items-center text-[#665000bd] font-bold gap-x-1 cursor-pointer" onClick={() => { handleStatus("In-Progress") }} >
                                    <PiExclamationMarkBold className="text-[20px] cursor-pointer border rounded-full border-[#665000bd] font-extrabold" /> Pending
                                </div>
                            ) : (taskStatus === "In-Progress" ? (
                                <div className="flex flex-row items-center text-[#665000bd] font-bold gap-x-1 cursor-pointer" onClick={() => { handleStatus("Pending") }} >
                                    <PiExclamationMarkBold className="text-[20px] cursor-pointer border rounded-full border-[#665000bd] font-extrabold" /> {taskStatus}
                                </div>
                            ) : (
                                <div className="flex flex-row items-center text-[green] cursor-pointer font-bold gap-x-1">
                                    <IoIosCheckmarkCircleOutline className="text-[20px]" /> Completed
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center text-[red] cursor-pointer font-bold ml-4 mb-7">
                <MdDelete className="text-[30px] " onClick={DeleteHandler} />
            </div>
        </div>
    );
}

export default Card;