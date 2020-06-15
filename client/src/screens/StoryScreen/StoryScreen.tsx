import React, { useState, useEffect } from "react";
import {Container, Row, Col, Button, Media} from "react-bootstrap";
import "./StoryScreen.css";
import { MagicButton } from "../../components/Button/MagicButton";
import { ThroughFade } from "../../components/ThroughFade";

export const StoryScreen: React.FC = () => {
  return (

    <Container fluid style={{ backgroundColor: "#000" }}>
      <div style={{
          position: 'absolute',
          zIndex: 900,
          width: 500,
          height: 250,
          top: window.innerHeight/2-100,
          left: window.innerWidth/2 - 250,
          backgroundColor: '#310e0e',
          border: '10px solid white',
          padding: '20px',
          justifyContent: 'center'
      }}>
          <Media>
            <Media.Body>
          <img src={'/images/wrong.png'} height={150} />
            </Media.Body>
              <Media.Body>
                  <h3 style={{color: '#fab70dff'}}>You are wrong</h3>
              </Media.Body>
          </Media>
      </div>
<ThroughFade>
        <Container fluid>
          <Row>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              className={"page1"}
              style={{ padding: 0, backgroundImage: 'url(/images/p1.jpg)' }}
            >
              {/* { leftImage } */}
            </Col>
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className={"page2"}>
              <h2>Far, far away...</h2>
                <p > It was</p>
                <p>Your assets:</p>
                <p>- No money</p>
                <p>- A dream to kiss a Queen</p>
                <p>- A lot of energy</p>

              <MagicButton title="Become a Tezos developer & earn millions" /><br/>
              <MagicButton title="Go to boring job"/>
            </Col>
          </Row>
        </Container>
</ThroughFade>
    </Container>
  );
};
