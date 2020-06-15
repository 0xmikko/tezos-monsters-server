/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { isAuthenticated } from "../../store/auth";
import actions from "../../store/actions";
import { AppBarElement } from "./AppBarElement";
import logo from "./logo.png";
import "./AppBar.css";

// import AppSearch from "./AppSearch"

export const AppBar = () => {
  const isSignIn = useSelector((state: RootState) => isAuthenticated(state));

  const dispatch = useDispatch();

  const onLogout = () => dispatch(actions.auth.logout());

  return (
    <Navbar className="navbar-header navbar-header-fixed woodBar">
      <Navbar.Brand>
        <span
          style={{
            fontFamily: "Godzilla",
            color: "#fff",
            marginTop: "-40px",
          }}
        >
          Monsters Factory
        </span>
      </Navbar.Brand>
      <Nav style={{ justifyContent: "right", width: '100%', color: '#fff' }}>
          <Nav.Item>
              <img src={"/images/gold.png"} height={30} style={{marginTop: -10, marginRight: 20,}}/>
              <span
                  style={{
                      fontFamily: "Godzilla",
                      color: "#fff",
                      marginTop: "-40px",
                      fontSize: 30,
                  }}
              >
          500
        </span>
              <img src={"/images/share.png"} height={30} style={{marginTop: -10, marginLeft: 30, marginRight: 20,}}/>
              <span
                  style={{
                      fontFamily: "Godzilla",
                      color: "#fff",
                      marginTop: "-40px",
                      fontSize: 30,
                  }}
              >
          0
        </span>
          </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default AppBar;
