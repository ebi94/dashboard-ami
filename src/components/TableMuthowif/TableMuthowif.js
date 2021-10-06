import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import NotificationAlert from "react-notification-alert";
import swal from "sweetalert";
// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	Table,
	Row,
	Col,
	OverlayTrigger,
	Spinner,
	Tooltip,
	Modal
} from "react-bootstrap";
import { getListMuthowif, editMuthowif, deleteMuthowif } from "../../services/muthowif";

const TableMuthowif = () => {
	const notificationAlertRef = useRef(null)
	const [dataMuthowif, setDataMuthowif] = useState([]);
	const [dataDetail, setDataDetail] = useState({});
	const [loading, setLoading] = useState(false);
	const [modalDetail, setModalDetail] = useState(false);
	const [modalEdit, setModalEdit] = useState(false);

	const notify = (message, type) => {
		const options = {
			place: "tc",
			message: (
				<div>
					<b>{message}</b>
				</div>
			),
			type: type,
			icon: "nc-icon nc-check-2",
			autoDismiss: 3,
		};
		notificationAlertRef.current.notificationAlert(options);
	};

	const onClickDetail = (item) => {
		setDataDetail(item);
		setModalDetail(true);
	};

	const onClickEdit = (item) => {
		setDataDetail(item);
		setModalEdit(true);
	};

	const onClickDelete = (id) => {
		swal({
			title: "Apakah Anda Yakin Menghapus Data Ini ? ",
			icon: "warning",
			buttons: {
				cancel: {
					text: "Cancel",
					value: false,
					visible: true,
					className: "",
					closeModal: true,
				},
				confirm: {
					text: "OK",
					value: true,
					visible: true,
					className: ""
				}
			}
		})
			.then(async (e) => {
				if (e) {
					const res = await deleteMuthowif(id)
					if (res && res.data === 1) {
						notify(res.messages, "success");
						getDataMuthowif();
					}
				}
			});
	};

	const getDataMuthowif = async () => {
		const res = await getListMuthowif();
		setDataMuthowif(res);
	};

	const handleEdit = async (data) => {
		const idMuthowif = dataDetail.id
		const res = await editMuthowif(data, idMuthowif)
		if (res.status === 'OK') {
			notify(res.messages, "success");
			setLoading(false);
			setModalEdit(false);
			getDataMuthowif();
		} else {
			notify(res.messages, "danger");
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: dataDetail.firstName,
			address: dataDetail.address,
			phone: dataDetail.phone,
			email: dataDetail.email
		},
		onSubmit: (values) => {
			handleEdit(values);
			setLoading(true)
		}
	});

	useEffect(() => {
		getDataMuthowif();
	}, []);

	return (
		<>
			<NotificationAlert ref={notificationAlertRef} />
			<Col md="12">
				<Card className="strpied-tabled-with-hover">
					<Card.Header>
						<Card.Title as="h4">Master Data Muthowif</Card.Title>
						<p className="card-category">
							Muthowif List
						</p>
						<p className="card-category">
							Jumlah Muthowif : {dataMuthowif.length}
						</p>
					</Card.Header>
					<Card.Body className="table-full-width table-responsive px-0">
						<Table className="table-hover table-striped">
							<thead>
								<tr>
									<th className="border-0">ID</th>
									<th className="border-0">Name</th>
									<th className="border-0">Email</th>
									<th className="border-0">Phone</th>
									<th className="border-0">Status</th>
									<th className="border-0">Action</th>
								</tr>
							</thead>
							<tbody>
								{dataMuthowif.length > 0 ? (
									dataMuthowif.map((item, index) => (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.firstName}</td>
											<td>{item.email}</td>
											<td>{item.phone}</td>
											<td>
												{item.status === 1 ?
													<Badge variant="success">Aktif</Badge>
													:
													<Badge variant="warning">Belum Konfirmasi</Badge>
												}
											</td>
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
														onClick={() => onClickDetail(item)}
													>
														<i className="fas fa-eye"></i>
													</Button>
												</OverlayTrigger>
												{/* <OverlayTrigger
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
														onClick={() => onClickEdit(item)}
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
														onClick={() => onClickDelete(item.id)}
													>
														<i className="fas fa-times"></i>
													</Button>
												</OverlayTrigger> */}
											</td>
										</tr>
									))
								) : (
									"Loading . . ."
								)}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Col>
			{/* Start Modal Detail */}
			<Modal
				className="modal-primary"
				show={modalDetail}
				style={{ top: '-145px', height: '120%' }}
				onHide={() => setModalDetail(false)}
			>
				<Modal.Header>
					<Modal.Title>Data Detail: {dataDetail.firstName}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row className="text-left" >
						<Col md="5"><p className="text-muted"><span>Nama Lengkap</span></p></Col>
						<Col md="7"><p>{dataDetail.firstName}</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>Alamat</span></p></Col>
						<Col md="7"><p>{dataDetail.address}</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>Jumlah Perjalanan</span></p></Col>
						<Col md="7"><p>0</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>Rating</span></p></Col>
						<Col md="7"><p className="text-primary">5/5</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>No Telepon</span></p></Col>
						<Col md="7"><p>{dataDetail.phone}</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>Email</span></p></Col>
						<Col md="7"><p>{dataDetail.email}</p></Col>
					</Row>
					<Row className="text-left">
						<Col md="5"><p className="text-muted"><span>Status</span></p></Col>
						<Col md="7">{dataDetail.status === 1 ?
							<Badge variant="success">Aktif</Badge>
							:
							<Badge variant="warning">Belum Konfirmasi</Badge>
						}</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<div className="d-flex justify-content-end">
						<Button
							className="btn-fill pull-right"
							type="button"
							variant="warning"
							onClick={() => setModalDetail(false)}
						>
							Keluar
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
			{/* End Modal Detail */}
			{/* Start Modal Detail */}
			<Modal
				className="modal-primary"
				show={modalEdit}
				style={{ top: '-145px', height: '120%' }}
				onHide={() => setModalEdit(false)}
			>
				<Modal.Header>
					<Modal.Title>Ubah Data</Modal.Title>
					ID: {dataDetail.id}
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={formik.handleSubmit}>
						<Row>
							<Col className="py-1" md="12">
								<Form.Group>
									<label>Nama Muthowif</label>
									<Form.Control
										name="firstName"
										value={formik.values.firstName}
										onChange={formik.handleChange}
										type="text"
										disabled={loading}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col className="py-1" md="12">
								<Form.Group>
									<label>Alamat Lengkap</label>
									<Form.Control
										value={formik.values.address}
										onChange={formik.handleChange}
										name="address"
										type="text"
										disabled={loading}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col className="pr-1" md="6">
								<Form.Group>
									<label>No Telepon</label>
									<Form.Control
										value={formik.values.phone}
										onChange={formik.handleChange}
										name="phone"
										type="text"
										disabled={loading}
									></Form.Control>
								</Form.Group>
							</Col>
							<Col className="pl-1" md="6">
								<Form.Group>
									<label>Email</label>
									<Form.Control
										value={formik.values.email}
										onChange={formik.handleChange}
										name="email"
										type="text"
										disabled={loading}
									></Form.Control>
								</Form.Group>
							</Col>
						</Row>
						<div className="d-flex align-items-center justify-content-between">
							<Button
								className="btn-fill pull-right"
								variant="warning"
								disabled={loading}
								onClick={() => setModalEdit(false)}
							>
								Batal
							</Button>
							<Button
								className="btn-fill pull-right"
								style={{ minWidth: 150 }}
								disabled={loading}
								type="submit"
								variant="info"
							>
								{loading ? <Spinner animation="border" variant="secondary" style={{ fonstSize: 10, height: 20, width: 20 }} size="sm" /> : "Simpan"}
							</Button>
						</div>
						<div className="clearfix"></div>
					</Form>
				</Modal.Body>
			</Modal>
			{/* End Modal Detail */}
		</>
	);
}

export default TableMuthowif;
