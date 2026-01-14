import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [loading, setLoading] = useState(false);

  const programs = [
    "Software Development",
    "Computer Systems & Architecture",
    "Networking & Internet Technology",
    "Multimedia Productions",
    "Electronics & Telecommunications",
    "Electrical Technology",
    "Teacher Training Program",
    "Holiday Program",
    "Technical Support & ICT Supply",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, message: "", variant: "" });

    try {
      const res = await axios.post("http://localhost:5000/api/applications", formData);
      setAlert({ show: true, message: res.data.message, variant: "success" });
      setFormData({ fullName: "", email: "", phone: "", program: "", message: "" });
    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.message || "Server error ❌",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "60px" }}>
  <Container>
    <Row className="align-items-start justify-content-center g-4">

      {/* APPLY FORM (TOP on mobile, RIGHT on desktop) */}
      <Col
        lg={6}
        md={10}
        className="order-1 order-lg-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4 p-md-5">
              <h2 className="fw-bold text-center mb-3" style={{ color: "#1E3A8A" }}>
                Apply Now
              </h2>

              <p className="text-center text-muted mb-4">
                Start your journey with <strong>Ed Tech Solutions</strong>.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Program</Form.Label>
                  <Form.Select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose a program --</option>
                    {programs.map((p, i) => (
                      <option key={i} value={p}>{p}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="rounded-pill"
                    style={{ backgroundColor: "#10B981", border: "none" }}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

      {/* OFFER SECTION (LEFT on desktop, BELOW on mobile) */}
      <Col
        lg={6}
        md={10}
        className="order-2 order-lg-1"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className="shadow-lg border-0 rounded-4 h-100"
            style={{ backgroundColor: "#91d4c7" }}
          >
            <Card.Body className="p-4 p-md-5">
              <h3 className="fw-bold mb-3 text-center">Limited Time Offer</h3>

              <div className="text-center mb-3">
                <span style={{ textDecoration: "line-through", fontSize: "1.3rem" }}>
                  45,000 FRW
                </span>
                <br />
                <span className="fw-bold" style={{ fontSize: "1.8rem" }}>
                  30,000 FRW
                </span>
                <p className="fw-semibold mt-2">
                  Save 15,000 FRW on your enrollment
                </p>
              </div>

              <h5 className="fw-bold">What's Included:</h5>
              <ul className="mt-2">
                <li>1 month hands-on training</li>
                <li>Expert mentorship</li>
                <li>Certificate upon completion</li>
                <li>Job placement assistance</li>
                <li>Access to lab facilities</li>
                <li>Call before paying: <strong>0729598007</strong></li>
                <li>We refund if program is full</li>
              </ul>
            </Card.Body>
          </Card>
        </motion.div>
      </Col>

    </Row>
  </Container>
</section>

  );
};

export default Apply;


