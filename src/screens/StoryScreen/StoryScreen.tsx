import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StoryScreen.css";

export const StoryScreen: React.FC = () => {
  return (
    <Container className="welcome-screen">
     <Row>
       <Col xl={6} lg={6}>
         Picture
       </Col>
       <Col xl={6} lg={6}>
         Text
       </Col>
     </Row>
    </Container>
  );
};
