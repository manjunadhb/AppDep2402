import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    return store;
  });

  let deleteAccount = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.userDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:4567/deleteAccount",
      reqOptions
    );

    let JSOData = await JSONData.json();

    alert(JSOData.msg);
    if (JSOData.status == "success") {
      navigate("/");
    }
  };

  return (
    <div>
      <TopNavigation />
      <h2>Dashboard</h2>
      <h2>
        Welcome {storeObj.userDetails.firstName} {storeObj.userDetails.lastName}
      </h2>
      <img
        src={`http://localhost:4567/${storeObj.userDetails.profilePic}`}
      ></img>
      <button
        onClick={() => {
          deleteAccount();
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Dashboard;
