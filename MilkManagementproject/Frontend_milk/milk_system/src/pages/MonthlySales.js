import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Modal, Form, Row, Col } from "react-bootstrap";

const MonthlySales = () => {
    const [sales, setSales] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [summaries, setSummaries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Monthly Sale");
    const [saleData, setSaleData] = useState({ saleId: "", customerId: "", monthYear: "", totalMilk: "", status: "Pending" });
    const [currentRate, setCurrentRate] = useState(0);

    const getCurrentRate = () => currentRate;

    useEffect(() => {
        axios.get("http://localhost:8080/api/milk-rates/latest")
            .then(res => setCurrentRate(res.data.rate))
            .catch(err => console.error("Error fetching rate", err));
    }, []);

    useEffect(() => {
        fetchCustomers();
        fetchSales();
    }, []);

    useEffect(() => {
        if (selectedMonth) {
            fetchMonthlySummaries();
        }
    }, [selectedMonth]);

    // Fetch Monthly Sales
    const fetchSales = () => {
        axios.get("http://localhost:8080/api/monthly-sales")
            .then(response => setSales(response.data))
            .catch(error => console.error("Error fetching monthly sales:", error));
    };

    // Fetch Customers for Dropdown
    const fetchCustomers = () => {
        axios.get("http://localhost:8080/api/customers")
            .then(response => setCustomers(response.data))
            .catch(error => console.error("Error fetching customers:", error));
    };

    const fetchMonthlySummaries = () => {
        axios.get(`http://localhost:8080/api/monthly-sales/summaries/${selectedMonth}`)
            .then(response => {
                const summariesWithCustomerNames = response.data.map(summary => {
                    const customer = customers.find(c => c.customerId === summary.customerId);
                    return {
                        ...summary,
                        customerName: customer ? customer.name : 'Unknown'
                    };
                });
                setSummaries(summariesWithCustomerNames);
            })
            .catch(error => console.error('Error fetching summaries:', error));
    };

    const generateMonthlySales = () => {
        if (!selectedMonth) {
            alert('Please select a month first');
            return;
        }

        axios.post(`http://localhost:8080/api/monthly-sales/generate/${selectedMonth}`)
            .then(() => {
                alert('Monthly sales generated successfully!');
                fetchSales();
            })
            .catch(error => {
                console.error('Error generating monthly sales:', error);
                alert('Error generating monthly sales');
            });
    };

    // Open Modal (for Add/Edit)
    const handleShowModal = (sale = { saleId: "", customerId: "", monthYear: "", totalMilk: "", totalAmount: "", status: "Pending" }) => {
        setSaleData(sale.saleId ? {
            ...sale,
            customerId: sale.customer ? sale.customer.customerId : ""
        } : sale);

        // setSaleData(sale.saleId ? { ...sale, customerId: sale.customer.customerId } : sale);
        setModalTitle(sale.saleId ? "Edit Monthly Sale" : "Add Monthly Sale");
        setShowModal(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSaleData({ saleId: "", customerId: "", monthYear: "", totalMilk: "", totalAmount: "", status: "Pending" });
    };

    // Handle Input Change
    const handleChange = (e) => {
        setSaleData({ ...saleData, [e.target.name]: e.target.value });
    };

    // Handle Add/Edit
    const handleSubmit = () => {
        // Validate required fields
        if (!saleData.customerId || !saleData.monthYear || !saleData.totalMilk) {
            alert('Please fill in all required fields');
            return;
        }

        const saleToSubmit = {
            ...(saleData.saleId && { saleId: saleData.saleId }), // Only include if editing
            customer: { customerId: parseInt(saleData.customerId) },
            monthYear: saleData.monthYear,
            totalMilk: parseFloat(saleData.totalMilk),
            totalAmount: parseFloat(saleData.totalMilk) * currentRate,
            status: saleData.status || "PENDING"
        };

        if (saleData.saleId) {
            axios.put(`http://localhost:8080/api/monthly-sales/${saleData.saleId}`, saleToSubmit)
                .then(() => {
                    fetchSales();
                    handleCloseModal();
                    alert('Monthly sale updated successfully!');
                })
                .catch(error => {
                    console.error("Error updating monthly sale:", error);
                    alert('Error updating monthly sale: ' + (error.response?.data?.message || error.message));
                });
        } else {
            axios.post("http://localhost:8080/api/monthly-sales", saleToSubmit)
                .then(() => {
                    fetchSales();
                    handleCloseModal();
                    alert('Monthly sale added successfully!');
                })
                .catch(error => {
                    console.error("Error adding monthly sale:", error);
                    alert('Error adding monthly sale: ' + (error.response?.data?.message || error.message));
                });
        }
    };

    // Handle Delete
    const handleDelete = (saleId) => {
        if (window.confirm("Are you sure you want to delete this monthly sale?")) {
            axios.delete(`http://localhost:8080/api/monthly-sales/${saleId}`)
                .then(() => fetchSales())
                .catch(error => console.error("Error deleting monthly sale:", error));
        }
    };

    return (
        <Container>
            <h1 className="my-4">Monthly Sales</h1>

            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Select Month</Form.Label>
                        <Form.Control
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                    <Button variant="primary" onClick={generateMonthlySales}>
                        Generate Monthly Sales
                    </Button>
                </Col>
            </Row>

            {selectedMonth && summaries.length > 0 && (
                <>
                    <h2>Monthly Summary for {selectedMonth}</h2>
                    <Table striped bordered hover className="mb-5">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Total Quantity (L)</th>
                                <th>Total Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaries.map(summary => (
                                <tr key={summary.customerId}>
                                    <td>{summary.customerName}</td>
                                    <td>{summary.totalQuantity.toFixed(2)}</td>
                                    <td>₹{summary.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            {selectedMonth && summaries.length === 0 && (
                <div className="alert alert-info">
                    No records found for {selectedMonth}
                </div>
            )}

            {sales.length > 0 && (
                <>
                    <h2>Generated Monthly Sales</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Customer</th>
                                <th>Total Milk (L)</th>
                                <th>Total Amount (₹)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map(sale => (
                                <tr key={sale.saleId}>
                                    <td>{sale.monthYear}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.totalMilk.toFixed(2)}</td>
                                    <td>₹{sale.totalAmount.toFixed(2)}</td>
                                    <td>{sale.status}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(sale)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(sale.saleId)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                Add Monthly Sale
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Month-Year</th>
                        <th>Total Milk (L)</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.saleId}</td>
                            <td>{sale.customer ? sale.customer.name : "No Customer"}</td>
                            <td>{sale.monthYear}</td>
                            <td>{sale.totalMilk} L</td>
                            <td>${sale.totalAmount}</td>
                            <td>{sale.status}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(sale)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(sale.saleId)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Add/Edit Monthly Sale */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer</Form.Label>
                            <Form.Select name="customerId" value={saleData.customerId} onChange={handleChange} required>
                                <option value="">Select a Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.customerId} value={customer.customerId}>
                                        {customer.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Month-Year</Form.Label>
                            <Form.Control type="month" name="monthYear" value={saleData.monthYear} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Total Milk (L)</Form.Label>
                            <Form.Control type="number" name="totalMilk" value={saleData.totalMilk} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Estimated Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={saleData.totalMilk ? (saleData.totalMilk * getCurrentRate()).toFixed(2) : ""}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" value={saleData.status} onChange={handleChange} required>
                                <option value="PENDING">Pending</option>
                                <option value="PAID">Paid</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {saleData.saleId ? "Update" : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MonthlySales;
