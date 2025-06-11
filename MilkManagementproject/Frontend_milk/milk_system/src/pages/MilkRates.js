import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const MilkRates = () => {
    const [rates, setRates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Milk Rate");
    const [rateData, setRateData] = useState({ rateId: "", rate: "", effectiveFrom: "" });

    useEffect(() => {
        fetchRates();
    }, []);

    // Fetch Milk Rates
    const fetchRates = () => {
       axios.get("http://localhost:8080/api/milk-rates")
    .then(response => {
        console.log("Milk Rates Data:", response.data);
        setRates(response.data);
    })
    .catch(error => console.error("Error fetching milk rates:", error));
    };

    // Open Modal (for Add/Edit)
    const handleShowModal = (rate = { rateId: "", rate: "", effectiveFrom: "" }) => {
        setRateData(rate);
        setModalTitle(rate.rateId ? "Edit Milk Rate" : "Add Milk Rate");
        setShowModal(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setRateData({ rateId: "", rate: "", effectiveFrom: "" });
    };

    // Handle Input Change
    const handleChange = (e) => {
        setRateData({ ...rateData, [e.target.name]: e.target.value });
    };

    // Handle Add/Edit
    const handleSubmit = () => {
        if (rateData.rateId) {
            // Update Milk Rate
            axios.put(`http://localhost:8080/api/milk-rates/${rateData.rateId}`, rateData)
                .then(() => {
                    fetchRates();
                    handleCloseModal();
                })
                .catch(error => console.error("Error updating milk rate:", error));
        } else {
            // Add New Milk Rate
            axios.post("http://localhost:8080/api/milk-rates", rateData)
                .then(() => {
                    fetchRates();
                    handleCloseModal();
                })
                .catch(error => console.error("Error adding milk rate:", error));
        }
    };

    // Handle Delete
    const handleDelete = (rateId) => {
        if (window.confirm("Are you sure you want to delete this milk rate?")) {
            axios.delete(`http://localhost:8080/api/milk-rates/${rateId}`)
                .then(() => fetchRates())
                .catch(error => console.error("Error deleting milk rate:", error));
        }
    };

    return (
        <Container>
            <h1 className="my-4">Milk Rates</h1>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add Milk Rate
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rate</th>
                        <th>Effective From</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map(rate => (
                        <tr key={rate.rateId}>
                            <td>{rate.rateId}</td>
                            <td>{rate.rate}</td>
                            <td>{rate.effectiveFrom}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(rate)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(rate.rateId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Milk Rate */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control type="number" name="rate" value={rateData.rate} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Effective From</Form.Label>
                            <Form.Control type="date" name="effectiveFrom" value={rateData.effectiveFrom} onChange={handleChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {rateData.rateId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MilkRates;
