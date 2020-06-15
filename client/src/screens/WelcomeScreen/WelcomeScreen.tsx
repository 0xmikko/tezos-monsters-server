import React from "react";
import { Container } from "react-bootstrap";
import "./WelcomeScreen.css";
import text_mf from "./text_mf.svg";

export const WelcomeScreen: React.FC = () => {
  return (
    <Container className="welcome-screen">
      <div className="title">
        {" "}
        <span
          style={{
            fontFamily: "Godzilla",
            fontSize: "100pt",
            color: "#ffb600",
          }}
        >
          Monsters Factory!
        </span><br/>
        <a href="/story">
        <span
          style={{
            fontFamily: "Blackhead",
            fontSize: "50pt",
            color: "#fff",
            fontWeight: 1000,
          }}
        >
          Get started! It's free!
        </span></a>
      </div>
    </Container>
  );
};
