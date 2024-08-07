import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";



export const Dashboard = () => {

  console.log(import.meta.env.VITE_API_URI);
  axios.defaults.withCredentials = true;
  //TODO: showing user icon
  const [money, setMoney] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get( `${import.meta.env.VITE_API_URI}/account/balance`, {
      headers: { 
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => {
      setMoney(response.data.balance);
      setUser(response.data.user);
    })
    .catch(error => {
      console.error("Error fetching balance:", error);
    });
  }, []);

  return (
    <div className="bg-indigo-50">
      <Appbar value={user} />
      <div>
        <Balance value={money} />
        <Users />
      </div>
    </div>
  );
};