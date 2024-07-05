import Card from "../Components/Card.js";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";



const  url = "https://todolist-backend-jhgg.onrender.com";


function Tasks({ isLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn,navigate]);

  const [userData, setUserData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const userId = cookies.userId;

  const getUserData = async () => {
    try {
      const response = await axios.get(`${url}/tasks`, {
        params: {
          userId: userId
        }
      });
      const newData = response.data.data;

      const newDateFormat = newData.map(task => {
        // Parse the current due date into a Date object
        const dueDate = new Date(task.dueDate);
    
        // Format the due date in US date format (MM/DD/YYYY)
        const formattedDueDate = `${dueDate.getDate().toString().padStart(2, '0')}/${(dueDate.getMonth() + 1).toString().padStart(2, '0')}/${dueDate.getFullYear()}`;
    
        // Return a new task object with the formatted due date
        return {
            ...task,
            dueDate: formattedDueDate
        };
    });
      setUserData(newDateFormat);
    } catch (error) {
      toast.error("An error occurred while fetching user data");
    }
};
  useEffect(() => {
    getUserData();
  }, []);
  const dueDate = new Date("2024-05-04T00:00:00.000Z");
  const formattedDueDate = dueDate.toLocaleDateString("en-US"); // Change "en-US" to your desired locale

  console.log(formattedDueDate); 
  const removeFromScreen = (titletoremove) => {
    setUserData(prevData => prevData.filter(item => item.title !== titletoremove));
  };

  return (
    <>
      <div className="flex flex-col mr-[80px] mt-[100px] md:justify-center">
        {userData.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold">No pending tasks</h2>
          </div>
        ) : (
          userData.map((task, index) => (
            <Card
              key={index}
              title={task.title}
              description={task.desc}
              dueDate={task.dueDate}
              status={task.status}
              removeFromScreen={removeFromScreen}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Tasks;
