import React from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TableMuthowif from "components/TableMuthowif/TableMuthowif.js";

const Dashboard = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <TableMuthowif />
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
