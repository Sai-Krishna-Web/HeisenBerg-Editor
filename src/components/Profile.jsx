import React, { Fragment } from "react";
//import { useAuth0 } from "../Auth/react-auth0-spa";
import LogoutBtn from "../Auth/LogoutBtn";

const Profile = ({ logoutHandler,user }) => {

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div><img src={user.picture} alt="Profile" /></div>
      <h3>{user.email}</h3>
      <LogoutBtn class="button" logoutHandler={logoutHandler} />
    </Fragment>
  );
};

export default Profile;
