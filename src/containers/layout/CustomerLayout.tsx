import 'moment/locale/vi';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './Header';
import SideBar from './Sidebar';

const CustomerLayout = (props: any) => {
  return (
    <Container fluid={true} className="content-wrapper">
      <div className="wrapper-top">
        <Row>
          <Col className="p-0">
            <Header />
          </Col>
        </Row>
        {/* <Row>
          <Col className="p-0">
            <Brand />
          </Col>
        </Row> */}
      </div>
      <div className="wrapper-middle">
        <Row>
          <Col md={true} className="sidebar-wrapper p-0">
            <SideBar activeSidebar={props.activeSidebar} />
          </Col>
          <Col md={true} className="content">
            {props.children}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CustomerLayout;
