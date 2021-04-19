import React, { useEffect, useState } from "react";
import axios from "axios";
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
	OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { data } from "jquery";

const TableTravel = () => {
	const [dataTravel, setDataTravel] = useState([]);
	useEffect(() => {
		axios.get('https://backend-ami.herokuapp.com/travel')
			.then((response) => {
				const data = response && response.data && response.data.data;
				setDataTravel(data);
				console.log('response', data);
		})
			.catch(function (error) {
				console.log('error', error);
		});
	},[])
  return (
    <>
			<Col md="12">
				<Card className="strpied-tabled-with-hover">
					<Card.Header>
						<Card.Title as="h4">Master Data Travel</Card.Title>
						<p className="card-category">
							Travel List 
						</p>
					</Card.Header>
					<Card.Body className="table-full-width table-responsive px-0">
						<Table className="table-hover table-striped">
							<thead>
								<tr>
									<th className="border-0">ID</th>
									<th className="border-0">Travel Name</th>
									<th className="border-0">Email</th>
									<th className="border-0">Phone</th>
									<th className="border-0">Action</th>
								</tr>
							</thead>
							<tbody>
								{console.log('dataTravel', dataTravel)}
								{dataTravel.length > 0 ? (
									dataTravel.map((item, index) => (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.travelName}</td>
											<td>{item.email}</td>
											<td>{item.phone}</td>
											<td>
												<OverlayTrigger
													overlay={
														<Tooltip id="tooltip-488980960">
															Lihat..
														</Tooltip>
													}
												>
													<Button
														className="btn-simple btn-link p-1"
														type="button"
														variant="success"
													>
														<i className="fas fa-eye"></i>
													</Button>
												</OverlayTrigger>
												<OverlayTrigger
													overlay={
														<Tooltip id="tooltip-488980961">
															Ubah..
														</Tooltip>
													}
												>
													<Button
														className="btn-simple btn-link p-1"
														type="button"
														variant="info"
													>
														<i className="fas fa-edit"></i>
													</Button>
												</OverlayTrigger>
												<OverlayTrigger
													overlay={
														<Tooltip id="tooltip-506045838">Hapus..</Tooltip>
													}
												>
													<Button
														className="btn-simple btn-link p-1"
														type="button"
														variant="danger"
													>
														<i className="fas fa-times"></i>
													</Button>
												</OverlayTrigger>
											</td>
										</tr>		
									))
								):(
									"Loading . . ."
								)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
    </>
  );
}

export default TableTravel;
