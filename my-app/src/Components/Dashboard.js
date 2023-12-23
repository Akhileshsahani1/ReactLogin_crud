import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {


  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  console.log(user);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API}/api/get_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response?.data?.data);


    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log(error);
      }
    }

  };

  useEffect(() => {
    fetchData();

  }, []);


  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/delete_user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == true) {
        toast.success(response.data.message);
      }

      fetchData();
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        console.log(error);
      }

    }
  };



  return (
    <div className="container pt-5">
      <Link className="btn btn-primary text-left" id="btn" to="/dashboard/addUser">AddUser</Link>
      <div className="card" style={{ width: "70rem" }}>
        <div className="card-body">
          <table className="table pt-5">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((users) => (
                <tr key={users.id}>
                  <th scope="row">{users.id}</th>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>
                    {console.log(users, "<><><><")}
                    <Link
                      style={{ marginLeft: "10px" }}
                      to={{
                        pathname: `/dashboard/Edit/${users.id}`
                      }}
                      state={{
                        name : users?.name, email : users?.email
                      }}
                      className="btn btn-success"
                    >
                      Edit
                    </Link>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleDelete(users.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody> 
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
