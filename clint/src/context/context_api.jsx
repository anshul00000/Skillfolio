// const { createContext, useState } = require("react");

import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';


const Context = createContext();


const Contextstate = (props) => {
  const backend_url = 'https://portfolio-with-mern-backend.onrender.com'; // for production
  // const backend_url = 'http://localhost:3000';
  
  const db = async () => {
    try {
      const response = await fetch(`${backend_url}/`, {
        method: 'GET',
        headers: {
          'Authorization': "application/json",
        },
      })

      const data = await response.json();

      if (data.message !== "true") {
        toast.error("database error");
      }

    } catch (error) {
      // db connection error
    }

  }



  db();


  const { connect_db, connect_db_c } = useState();



  // const [state , setstate] = useState(localStorage.getItem("tooken"));

  const [state, setstate] = useState(localStorage.getItem("tooken") || "");

  const [user, set_user] = useState("");

  const [alluser, set_alluser] = useState([]);

  const [project, set_project] = useState([]);


  const [allproject, set_allproject] = useState([]);


  const [run_effect, set_run_effect] = useState(true);


  let islogin = !!state;


  const save_tooken = async (tooken) => {
    setstate(tooken);
    localStorage.setItem("tooken", tooken);
  }


  const delete_tooken = () => {
    localStorage.removeItem("tooken");
    setstate("");
    set_project([]);
  }



  async function find_user() {

    try {
      const response = await fetch(`${backend_url}/user`, {
        method: 'GET',
        headers: {
          'Authorization': state,
        },
      })

      const data = await response.json();

      set_project(data.project_data);
      set_user(data.user_tooken);

    } catch (error) {
      set_user("");
    }

  }




  async function find_alluser() {

    try {
      const response = await fetch(`${backend_url}/users`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json();

      set_alluser(data.users);

    } catch (error) {
      set_user("");
    }

  }




  async function all_projects() {

    try {
      const response = await fetch(`${backend_url}/allproject`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      set_allproject(data.all_project_data);

    } catch (error) {
      toast.error("Error in fetching all projects");
    }

  }


  useEffect(() => {
    find_user();
    all_projects();
    find_alluser();
  }, [state, run_effect]);


  return (
    <Context.Provider value={{ backend_url, islogin, save_tooken, delete_tooken, user, alluser, project, run_effect, set_run_effect, state, allproject }}>
      {props.children}
    </Context.Provider>
  );

}

export { Contextstate, Context };
