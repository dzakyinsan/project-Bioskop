import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaDoorOpen, FaDoorClosed, FaShoppingCart } from "react-icons/fa";
import { LogoutSuccessAction } from "./../redux/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Badge from "@material-ui/core/Badge";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

const LogoutSuccess = () => {
  localStorage.clear();
  LogoutSuccessAction();
};

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img src="https://21cineplex.com//theme/v5/assets/img/logo.png" />
        </NavbarBrand>
        {/* ============= nama user/admin === */}
        {props.namauser === "" ? null : (
          <NavItem className="mt-2 mr-4" style={{ color: "#cfab7a", fontSize: 20 }}>
            Selamat Datang {props.namauser}
          </NavItem>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* ========= kalo belom login== */}
            {props.namauser === "" ? (
              <NavItem>
                <Link to={"/login"} className="mr-3">
                  <FaDoorClosed style={{ color: "#cfab7a", fontSize: 35 }} />
                </Link>
              </NavItem>
            ) : null}

            {/* ========= kalo masuk role admin keluar manageadmin== */}
            {props.role === "admin" ? (
              <NavItem className="manageadmin mr-3 btn-group" role="group" aria-label="Basic example">
                <Button>
                  <Link to={"/manageadmin"} style={{ color: "#cfab7a", fontSize: 18, textDecoration: "none" }}>
                    manage admin &nbsp;
                  </Link>
                </Button>
                <Button>
                  <Link to={"/managestudio"} style={{ color: "#cfab7a", fontSize: 18, textDecoration: "none" }}>
                    manage studio &nbsp;
                  </Link>
                </Button>
                <Button>
                  <Link to={"/changepass"} style={{ color: "#cfab7a", fontSize: 18, textDecoration: "none" }}>
                    ganti password &nbsp;
                  </Link>
                </Button>
              </NavItem>
            ) : null}

            {/* ========= kalo masuk role user keluar shoppingcart == */}
            {props.role === "user" ? (
              <NavItem className="mr-3 mt-2">
                <Button className='mr-3'>
                  <Link to={"/changepass"} style={{ color: "#cfab7a", fontSize: 18, textDecoration: "none" }}>
                    ganti password &nbsp;
                  </Link>
                </Button>
                <Link to={"/cart"}>
                  <Badge badgeContent={props.notif} color="secondary">
                    <ConfirmationNumberIcon style={{ color: "#cfab7a", fontSize: 30 }} />
                  </Badge>
                </Link>
              </NavItem>
            ) : null}

            {/* ========= kalo udah login== */}
            {props.namauser === "" ? null : (
              <NavItem>
                <NavLink href="/" onClick={() => LogoutSuccess()} className="mb-2">
                  <FaDoorOpen style={{ color: "#cfab7a", fontSize: 30 }} />
                </NavLink>
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
    namauser: state.Auth.username,
    role: state.Auth.role,
    login: state.Auth.login,
    notif: state.NotifReducer
  };
};

export default connect(MapStateToProps, { LogoutSuccessAction })(Header);
