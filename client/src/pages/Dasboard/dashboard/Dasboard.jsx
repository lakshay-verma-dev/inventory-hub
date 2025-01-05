import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import {
  FaUsers,
  FaDollarSign,
  FaFileInvoice,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";
import { motion } from "framer-motion";
import "chart.js/auto";
import "./Dashboard.css"

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dashboardData, setDashboardData] = useState({
    customers: 1456,
    revenue: 3345,
    profit: 60,
    invoices: 1135,
    salesData: [
      { month: "Jan", sales: 300 },
      { month: "Feb", sales: 200 },
      { month: "Mar", sales: 150 },
      { month: "Apr", sales: 400 },
      { month: "May", sales: 300 },
      { month: "Jun", sales: 250 },
      { month: "Jul", sales: 350 },
      { month: "Aug", sales: 200 },
      { month: "Sep", sales: 300 },
      { month: "Oct", sales: 450 },
      { month: "Nov", sales: 400 },
      { month: "Dec", sales: 500 },
    ],
    invoiceStats: { paid: 234, overdue: 514, unpaid: 345 },
    barChartData: [
      { category: "Fiction", count: 400 },
      { category: "Non-Fiction", count: 300 },
      { category: "Science", count: 200 },
      { category: "Biography", count: 100 },
    ],
    recentInvoices: [
      {
        no: "#045629",
        customerName: "Eren Yeager",
        itemName: "1x Black Backpack",
        orderDate: "21/07/2022",
        status: "Paid",
        price: 101,
      },
      {
        no: "#045630",
        customerName: "Levi Ackerman",
        itemName: "1x Distressed Jeans",
        orderDate: "20/07/2022",
        status: "Pending",
        price: 144,
      },
      {
        no: "#045631",
        customerName: "Rainer Braun",
        itemName: "1x White Sneakers",
        orderDate: "19/07/2022",
        status: "Overdue",
        price: 89,
      },
      {
        no: "#045632",
        customerName: "Hortons Reina",
        itemName: "2x Black Backpack",
        orderDate: "18/07/2022",
        status: "Paid",
        price: 230,
      },
    ],
  });

  // Chart.js Data for Doughnut, Line, and Bar charts
  const doughnutData = {
    labels: ["Paid", "Overdue", "Unpaid"],
    datasets: [
      {
        data: [
          dashboardData.invoiceStats.paid,
          dashboardData.invoiceStats.overdue,
          dashboardData.invoiceStats.unpaid,
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const lineChartData = {
    labels: dashboardData.salesData.map((data) => data.month),
    datasets: [
      {
        label: "Sales",
        data: dashboardData.salesData.map((data) => data.sales),
        fill: false,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: dashboardData.barChartData.map((data) => data.category),
    datasets: [
      {
        label: "Books Sold",
        data: dashboardData.barChartData.map((data) => data.count),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  return (
    <Container
      fluid
      className="p-4 dashboard"
      style={{
        boxShadow: "2px 2px 5px grey",
      }}
    >
      {/* Summary Cards */}
      <Row>
        <Col md={3}>
          <Card className="text-white bg-primary mb-3">
            <Card.Body>
              <Card.Title>
                <FaUsers /> Customers
              </Card.Title>
              <Card.Text>
                <h3>{dashboardData.customers}</h3>
                <Badge bg="success">
                  <FaArrowUp /> +4.8% Since last week
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-success mb-3">
            <Card.Body>
              <Card.Title>
                <FaDollarSign /> Revenue
              </Card.Title>
              <Card.Text>
                <h3>${dashboardData.revenue}</h3>
                <Badge bg="danger">
                  <FaArrowDown /> -0.2% Since last week
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-warning mb-3">
            <Card.Body>
              <Card.Title>
                <FaDollarSign /> Profit
              </Card.Title>
              <Card.Text>
                <h3>{dashboardData.profit}%</h3>
                <Badge bg="danger">
                  <FaArrowDown /> -0.2% Since last week
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-white bg-info mb-3">
            <Card.Body>
              <Card.Title>
                <FaFileInvoice /> Invoices
              </Card.Title>
              <Card.Text>
                <h3>{dashboardData.invoices}</h3>
                <Badge bg="success">
                  <FaArrowUp /> +1.8% Since last week
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 1 */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Invoice Statistics</Card.Title>
              <Doughnut data={doughnutData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Sales Analytics</Card.Title>
              <Line data={lineChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Books Sold by Category</Card.Title>
              <Bar data={barChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Revenue Distribution</Card.Title>
              <PieChart width={400} height={300}>
                <Pie
                  data={dashboardData.barChartData}
                  dataKey="count"
                  nameKey="category"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {dashboardData.barChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={doughnutData.datasets[0].backgroundColor[index]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Invoices */}
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Invoices</Card.Title>
              <Table responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Customer Name</th>
                    <th>Item Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentInvoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.no}</td>
                      <td>{invoice.customerName}</td>
                      <td>{invoice.itemName}</td>
                      <td>{invoice.orderDate}</td>
                      <td>
                        <Badge
                          bg={
                            invoice.status === "Paid"
                              ? "success"
                              : invoice.status === "Pending"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td>${invoice.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
