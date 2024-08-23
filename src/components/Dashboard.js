import React, { useEffect, useState } from "react";
import { Card, Col, Row, ListGroup } from 'react-bootstrap';
import Chart from "./Chart"
const Dashboard = () => {
    const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handleResize = () => {
          setViewport({ width: window.innerWidth, height: window.innerHeight });
        };
    
        console.log(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Dashboard</h2>

            <Row>
                <Col xs={12} sm={6} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Income</Card.Title>
                            <Card.Text>$12,000</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Expenses</Card.Title>
                            <Card.Text>$8,500</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={6} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Pending Tasks</Card.Title>
                            <Card.Text>5 Tasks</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
            <Col xs={12} sm={6} lg={4}>
                 <Card>
                    <Card.Body>
                    <Card.Title>Income Trends</Card.Title>
                    <Chart hw={viewport} />
                    </Card.Body>
              </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Recent Activity</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Transaction #123 - $200</ListGroup.Item>
                                <ListGroup.Item>Feedback from John Doe</ListGroup.Item>
                                <ListGroup.Item>Leave request approved</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </div>
    );
};

export default Dashboard;
