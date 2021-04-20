import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Spinner,
  Col,
} from "react-bootstrap";
import CardMuthowif from "components/CardMuthowif/CardMuthowif";

const Reservasi = () => {
  const [ listMuthowif, setListMuthowif ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const getMuthowif = () => {
    setLoading(true)
    axios.get('https://backend-ami.herokuapp.com/muthowif')
			.then((response) => {
				const data = response && response.data && response.data.data;
				setListMuthowif(data);
        setLoading(false);
		})
			.catch(function (error) {
				console.log('error', error);
        setLoading(false);
		});
  }

  useEffect(() => {
    console.log("list Muthowif", listMuthowif);
  }, [listMuthowif])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Reservasi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Start Date</label>
                        <Form.Control
                          placeholder="Username"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>End Date</label>
                        <Form.Control
                          placeholder="Username"
                          type="date"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Route
                        </label>
                        <Form.Control as="select" name="select" id="exampleSelect">
                            <option>Jeddah - Jeddah</option>
                            <option>Jeddah - Mecca</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    style={{minWidth: 150}}
                    // type="submit"
                    variant="info"
                    onClick={() => getMuthowif()}
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" variant="secondary" style={{fonstSize: 10, height: 20, width: 20}} size="sm" /> : "Cari Muthowif"}
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {listMuthowif.map((data, index) => (
                <>
                  <CardMuthowif 
                    name={data.firstName}
                  />
                </>
              ))
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Reservasi;
