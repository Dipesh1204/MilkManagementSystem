// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Customers from "./Customers";

// const Dashboard = () => {
//     const [customers, setCustomers] = useState([]);
//     const [providers, setProviders] = useState([]);
//     const [sales, setSales] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const customersRes = await axios.get("http://localhost:8080/api/customers");
//                 const providersRes = await axios.get("http://localhost:8080/api/providers");
//                 const salesRes = await axios.get("http://localhost:8080/api/monthly-sales");
//                 console.log("Sales API Response:", salesRes.data); // Debugging
//                 setCustomers(customersRes.data);
//                 setProviders(providersRes.data);
//                 setSales(salesRes.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     const chartData = sales.map((sale) => ({
//         month: sale.monthYear,
//         sales: sale.totalAmount,
//     }));

//     return (
        
//         <Container fluid>
//             <h1 className="my-4">Dashboard</h1>

//             {/* Summary Cards */}
//             <Row className="mb-4">
//                 <Col md={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Total Customers</Card.Title>
//                             <Card.Text>{customers.length}</Card.Text>
                            
//                             <Button variant="primary" onClick={() => navigate("/customers")}>View All</Button>
                            
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Total Providers</Card.Title>
//                             <Card.Text>{providers.length}</Card.Text>
//                             <Button variant="primary" onClick={() => navigate("/providers")}>View All</Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Total Sales</Card.Title>
//                             <Card.Text>₹{sales.reduce((acc, sale) => acc + sale.totalAmount, 0)}</Card.Text>
//                             <Button variant="primary" onClick={() => navigate("/sales")}>View All</Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             {/* Sales Chart */}
//             <Row className="mb-4">
//                 <Col>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Monthly Sales</Card.Title>
//                             <ResponsiveContainer width="100%" height={300}>
//                                 <BarChart data={chartData}>
//                                     <XAxis dataKey="month" />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Bar dataKey="sales" fill="#8884d8" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             {/* Recent Sales Table */}
//             <Row>
//                 <Col>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Recent Sales</Card.Title>
//                             <Table striped bordered hover>
//                                 <thead>
//                                     <tr>
//                                         <th>Month-Year</th>
//                                         <th>Customer</th>
//                                         <th>Total Milk (L)</th>
//                                         <th>Total Amount</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {sales.slice(0, 5).map((sale) => (
//                                         <tr key={sale.saleId}>
//                                             <td>{sale.monthYear}</td>
//                                             <td>{sale.customer ? sale.customer.name : "Unknown"}</td>
//                                             <td>{sale.totalMilk}</td>
//                                             <td>₹{sale.totalAmount}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>

//                             </Table>
//                             <Button variant="primary" onClick={() => navigate("/sales")}>View All</Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             {/* Recent Sales Table */}
//             <Row>
//                 <Col>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Recent Sales</Card.Title>
//                             <Table striped bordered hover>
//                                 <thead>
//                                     <tr>
//                                         <th>Month-Year</th>
//                                         <th>Customer</th>
//                                         <th>Total Milk (L)</th>
//                                         <th>Total Amount</th>
//                                         <th>Milk Records</th> {/* New Column */}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {sales.slice(0, 5).map((sale) => (
//                                         <tr key={sale.saleId}>
//                                             <td>{sale.monthYear}</td>
//                                             <td>{sale.customer ? sale.customer.name : "Unknown"}</td>
//                                             <td>{sale.totalMilk}</td>
//                                             <td>₹{sale.totalAmount}</td>
//                                             <td>{sale.totalRecords ?? 0}</td> {/* Display Milk Records Count */}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                             <Button variant="primary" onClick={() => navigate("/sales")}>View All</Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

            
//         </Container>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [sales, setSales] = useState([]);
    const [milkRecords, setMilkRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersRes = await axios.get("http://localhost:8080/api/customers");
                const providersRes = await axios.get("http://localhost:8080/api/providers");
                const salesRes = await axios.get("http://localhost:8080/api/monthly-sales");
                const milkRecordsRes = await axios.get("http://localhost:8080/api/milk-records");

                setCustomers(customersRes.data);
                setProviders(providersRes.data);
                setSales(salesRes.data);
                setMilkRecords(milkRecordsRes.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartData = sales.map((sale) => ({
        month: sale.monthYear,
        sales: sale.totalAmount,
    }));

    return (
        <Container fluid>
            <h1 className="my-4">Dashboard</h1>

            {/* Summary Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Customers</Card.Title>
                            <Card.Text>{customers.length}</Card.Text>
                            <Button variant="primary" onClick={() => navigate("/customers")}>View All</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Providers</Card.Title>
                            <Card.Text>{providers.length}</Card.Text>
                            <Button variant="primary" onClick={() => navigate("/providers")}>View All</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Sales</Card.Title>
                            <Card.Text>₹{sales.reduce((acc, sale) => acc + sale.totalAmount, 0)}</Card.Text>
                            <Button variant="primary" onClick={() => navigate("/sales")}>View All</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Milk Records</Card.Title>
                            <Card.Text>{milkRecords.length}</Card.Text>
                            <Button variant="primary" onClick={() => navigate("/records")}>View All</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Sales Chart */}
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Monthly Sales</Card.Title>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Recent Sales Table */}
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Recent Sales</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Month-Year</th>
                                        <th>Customer</th>
                                        <th>Total Milk (L)</th>
                                        <th>Total Amount</th>
                                        {/* <th>Total Records</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales.slice(0, 5).map((sale) => (
                                        <tr key={sale.saleId}>
                                            <td>{sale.monthYear}</td>
                                            <td>{sale.customer ? sale.customer.name : "Unknown"}</td>
                                            <td>{sale.totalMilk}</td>
                                            <td>₹{sale.totalAmount}</td>
                                            {/* <td>
                                                {
                                                    milkRecords.filter(record => record.customer.id === sale.customer.id).length
                                                }
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant="primary" onClick={() => navigate("/sales")}>View All</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

           

        </Container>
    );
};

export default Dashboard;
