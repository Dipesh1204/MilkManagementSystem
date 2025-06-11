import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";

const MilkRecords = () => {
    const [records, setRecords] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddMilkModal, setShowAddMilkModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Milk Record");
    const [recordData, setRecordData] = useState({ recordId: "", customerId: "", recordDate: "", quantity: "" });
    const [additionalQuantity, setAdditionalQuantity] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        fetchRecords();
        fetchCustomers();
    }, []);

    // Fetch Milk Records
    const fetchRecords = () => {
        axios.get("http://localhost:8080/api/milk-records")
            .then(response => setRecords(response.data))
            .catch(error => console.error("Error fetching milk records:", error));
    };

    // Fetch Customers for Dropdown
    const fetchCustomers = () => {
        axios.get("http://localhost:8080/api/customers")
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    };

    // Open Modal (for Add/Edit)
    const handleShowModal = (record = { recordId: "", customerId: "", recordDate: "", quantity: "", rate: "" }) => {
        setRecordData(record.recordId ? { ...record, customerId: record.customer.customerId } : record);
        setModalTitle(record.recordId ? "Edit Milk Record" : "Add Milk Record");
        setShowModal(true);
    };

    // Open Add Milk Modal
    const handleShowAddMilkModal = (record) => {
        setSelectedRecord(record);
        setAdditionalQuantity("");
        setShowAddMilkModal(true);
    };

    // Close Add Milk Modal
    const handleCloseAddMilkModal = () => {
        setShowAddMilkModal(false);
        setSelectedRecord(null);
        setAdditionalQuantity("");
    };

    // Handle Add Milk Submission
    const handleAddMilkSubmit = () => {
        if (!additionalQuantity || additionalQuantity <= 0) {
            alert("Please enter a valid quantity");
            return;
        }

        const updatedRecord = {
            ...selectedRecord,
            quantity: parseFloat(selectedRecord.quantity) + parseFloat(additionalQuantity),
            customer: { customerId: selectedRecord.customer.customerId }
        };

        axios.put(`http://localhost:8080/api/milk-records/${selectedRecord.recordId}`, updatedRecord)
            .then(() => {
                fetchRecords();
                handleCloseAddMilkModal();
            })
            .catch(error => console.error("Error updating milk quantity:", error));
    };

    // Close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setRecordData({ recordId: "", customerId: "", recordDate: "", quantity: "" });
    };

    // Handle Input Change
    const handleChange = (e) => {
        setRecordData({ ...recordData, [e.target.name]: e.target.value });
    };

    // Handle Add/Edit
    const handleSubmit = () => {
        const payload = {
            ...recordData,
            customer: { customerId: recordData.customerId }
        };

        if (recordData.recordId) {
            axios.put(`http://localhost:8080/api/milk-records/${recordData.recordId}`, payload)
                .then(() => {
                    fetchRecords();
                    handleCloseModal();
                })
                .catch(error => console.error("Error updating milk record:", error));
        } else {
            axios.post("http://localhost:8080/api/milk-records", payload)
                .then(() => {
                    fetchRecords();
                    handleCloseModal();
                })
                .catch(error => console.error("Error adding milk record:", error));
        }
    };

    // Handle Delete
    const handleDelete = (recordId) => {
        if (window.confirm("Are you sure you want to delete this milk record?")) {
            axios.delete(`http://localhost:8080/api/milk-records/${recordId}`)
                .then(() => fetchRecords())
                .catch(error => console.error("Error deleting milk record:", error));
        }
    };

    return (
        <Container>
            <h1 className="my-4">Milk Records</h1>
            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add Milk Record
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Record Date</th>
                        <th>Quantity (L)</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.recordId}>
                            <td>{record.recordId}</td>
                            <td>{record.customer.name}</td>
                            <td>{record.recordDate}</td>
                            <td>{record.quantity}</td>
                            <td>{record.rate}</td>
                            <td>
                                <Button variant="success" size="sm" className="me-2" onClick={() => handleShowAddMilkModal(record)}>
                                    + Add Milk
                                </Button>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(record)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(record.recordId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Milk Record */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer</Form.Label>
                            <Form.Select name="customerId" value={recordData.customerId} onChange={handleChange} required>
                                <option value="">Select a Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.customerId} value={customer.customerId}>
                                        {customer.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Record Date</Form.Label>
                            <Form.Control type="date" name="recordDate" value={recordData.recordDate} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantity (L)</Form.Label>
                            <Form.Control type="number" name="quantity" value={recordData.quantity} onChange={handleChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {recordData.recordId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Adding Milk to Existing Record */}
            <Modal show={showAddMilkModal} onHide={handleCloseAddMilkModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Milk to Existing Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRecord && (
                        <div>
                            <p><strong>Customer:</strong> {selectedRecord.customer.name}</p>
                            <p><strong>Date:</strong> {selectedRecord.recordDate}</p>
                            <p><strong>Current Quantity:</strong> {selectedRecord.quantity} L</p>
                            <Form.Group className="mb-3">
                                <Form.Label>Additional Quantity (L)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={additionalQuantity}
                                    onChange={(e) => setAdditionalQuantity(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {additionalQuantity && (
                                <p className="text-info">
                                    <strong>New Total:</strong> {(parseFloat(selectedRecord.quantity) + parseFloat(additionalQuantity)).toFixed(2)} L
                                </p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddMilkModal}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleAddMilkSubmit}>
                        Add Milk
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MilkRecords;