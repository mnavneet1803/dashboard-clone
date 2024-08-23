import React from 'react';
import { Dropdown } from 'react-bootstrap';
import profileImage from '../assets/profile.png'


const Header = () => {
  return (
    <div className="d-flex justify-content-between p-3 border-bottom" >
      <div>
        <input type="text" className="form-control" placeholder="Search" />
      </div>
      <div className="d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="outline-secondary"
            id="dropdown-basic"
            style={{
              border: 'none',
              padding: 0,
              boxShadow: 'none',
              color: 'gray',
              backgroundColor: "transparent"
            }}
          >
            <img src={profileImage} style={{ border: "1px solid black" }} height="35px" width="33px" alt="profile" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Account Setting</Dropdown.Item>
            <Dropdown.Item href="#/action-3" className="text-danger">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;