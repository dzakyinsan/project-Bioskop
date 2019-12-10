import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar sticky="top" color="dark" dark expand="md">
        <NavbarBrand href="/">LayarKaca 21</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mr-2">
              <Link to={"/manageadmin"}>Manage Admin</Link>
            </NavItem>

            {props.namauser === "" ? (
              <NavItem>
                <Link to={"/login"}>Login</Link>
              </NavItem>
            ) : 
          null
            }


            {props.namauser === "" ? null : (
              <NavItem>
                <Link to=""> {props.namauser} </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const MapStateToProps = state => {
  return {
    namauser: state.Auth.username
  };
};

export default connect(MapStateToProps)(Header);
