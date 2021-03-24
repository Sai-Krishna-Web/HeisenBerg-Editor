import React from "react";
import { Header,Dropdown } from "semantic-ui-react";
//import LogoutBtn from "../Auth/LogoutBtn";
import DocIcon from "../DocIcon.png";
import Profile from "./Profile";

const HeaderH = ({ logoutHandler,user }) => (
  <div className={'outerBar'}>
  <div>
  <Header as='h2'image={DocIcon} content='HeisenBerg Editor'/>
  </div>
  <div>
    <Dropdown button floating pointing={'top right'} icon={'user outline'}>
      <Dropdown.Menu>
        <Dropdown.Item selected>
          <Profile logoutHandler={logoutHandler} user={user} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  {/* <LogoutBtn class="button" logoutHandler={logoutHandler} /> */}
  </div>
  </div>
);

export default HeaderH;
