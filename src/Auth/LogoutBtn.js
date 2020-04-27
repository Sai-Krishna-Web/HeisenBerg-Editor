import React from "react";
import { Button } from "semantic-ui-react";

const LogoutBtn = ({ logoutHandler }) => (
  <Button
    id="qsLogoutBtn"
    variant="primary"
    className="btn-margin logoutBtn"
    onClick={logoutHandler}
  >
    Log Out
  </Button>
);

export default LogoutBtn;
