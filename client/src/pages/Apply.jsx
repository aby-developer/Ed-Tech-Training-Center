import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { FaInstagram, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaComment, FaCheck, FaClock, FaCertificate, FaBriefcase, FaBuilding, FaMoneyBillWave, FaPhoneAlt } from "react-icons/fa";

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagram: "",
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
      setFormData({ 
        fullName: "", 
        email: "", 
        phone: "", 
        instagram: "",
        program: "", 
        message: "" 
      });
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
    <section style={{ 
      minHeight: "100vh", 
      paddingTop: "80px", 
      paddingBottom: "60px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <Container className="px-3 px-md-4">
        <Row className="justify-content-center g-4">
          {/* HEADER SECTION - Only on mobile/tablet */}
          <Col xs={12} className="d-lg-none mb-4 text-center order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="fw-bold mb-2" style={{ color: "#1E3A8A" }}>
                Apply Now
              </h1>
              <p className="lead text-muted mb-0">
                Start your tech journey with <span className="fw-bold" style={{ color: "#10B981" }}>Ed Tech Solutions</span>
              </p>
            </motion.div>
          </Col>

          {/* OFFER SECTION - LEFT on desktop, TOP on mobile */}
          <Col 
            lg={5} 
            md={12} 
            className="order-2 order-lg-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-0 rounded-4 h-100 overflow-hidden"
                style={{ 
                  background: "linear-gradient(145deg, #1E3A8A 0%, #3B82F6 100%)",
                  color: "white"
                }}
              >
                <Card.Body className="p-4 p-md-5">
                  {/* Badge for limited offer */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                      <FaClock className="me-2" />
                      Limited Time
                    </span>
                  </div>

                  <h3 className="fw-bold mb-4 text-center display-6">
                    Special Enrollment Offer
                  </h3>

                  {/* Price Section */}
                  <div className="text-center mb-4 p-4 rounded-4" 
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <span className="text-light fs-4 me-3" style={{ opacity: 0.8 }}>
                        <del>45,000 FRW</del>
                      </span>
                      <span className="fw-bold display-5">
                        30,000 FRW
                      </span>
                    </div>
                    <p className="fw-semibold mt-2 fs-5">
                      Save <span className="text-warning fw-bold">15,000 FRW</span>
                    </p>
                  </div>

                  <h5 className="fw-bold mb-3">
                    <FaCheck className="me-2" />
                    Everything You Get:
                  </h5>
                  
                  <ul className="list-unstyled mb-4">
                    {[
                      { icon: <FaClock />, text: "1-month hands-on training" },
                      { icon: <FaUser />, text: "Expert mentorship & guidance" },
                      { icon: <FaCertificate />, text: "Official completion certificate" },
                      { icon: <FaBriefcase />, text: "Job placement assistance" },
                      { icon: <FaBuilding />, text: "24/7 lab facility access" },
                      { icon: <FaMoneyBillWave />, text: "Money-back guarantee if full" }
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        className="mb-2 d-flex align-items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="me-3 text-warning fs-5">{item.icon}</span>
                        <span className="fs-6">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Contact Info Card */}
                  <div className="mt-4 p-3 rounded-3" 
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <FaPhoneAlt className="me-2 text-warning" />
                      <div>
                        <p className="mb-1 fw-bold">Call before paying:</p>
                        <h5 className="mb-0 text-warning">0789 402 303</h5>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* APPLICATION FORM - RIGHT on desktop, BOTTOM on mobile */}
          <Col 
            lg={7} 
            md={12} 
            className="order-3 order-lg-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Body className="p-3 p-md-4 p-lg-5">
                  {/* Hidden header for desktop */}
                  <div className="d-none d-lg-block text-center mb-4">
                    <h2 className="fw-bold mb-2" style={{ color: "#1E3A8A" }}>
                      Application Form
                    </h2>
                    <p className="text-muted">
                      Fill in your details to secure your spot
                    </p>
                  </div>

                  {alert.show && (
                    <Alert 
                      variant={alert.variant} 
                      className="border-0 rounded-3"
                      dismissible
                      onClose={() => setAlert({ ...alert, show: false })}
                    >
                      {alert.message}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      {/* Full Name */}
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaUser className="me-2 text-primary" />
                            Full Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                            className="py-2 rounded-3 border-1"
                          />
                        </Form.Group>
                      </Col>

                      {/* Email */}
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaEnvelope className="me-2 text-primary" />
                            Email Address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email"
                            className="py-2 rounded-3 border-1"
                          />
                        </Form.Group>
                      </Col>

                      {/* Phone */}
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaPhone className="me-2 text-primary" />
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="07XXXXXXXX "
                            className="py-2 rounded-3 border-1"
                          />
                        </Form.Group>
                      </Col>

                      {/* Instagram */}
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaInstagram className="me-2 text-primary" />
                            Instagram Username
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text className="bg-light border-end-0">
                              <span className="text-muted">@</span>
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleChange}
                              placeholder="username"
                              className="py-2 rounded-end-3 border-start-0"
                            />
                          </InputGroup>
                          <Form.Text className="text-muted">
                            Optional - for updates and community access
                          </Form.Text>
                        </Form.Group>
                      </Col>

                      {/* Program Selection */}
                      <Col xs={12} className="mb-3">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaGraduationCap className="me-2 text-primary" />
                            Select Program
                          </Form.Label>
                          <Form.Select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            required
                            className="py-2 rounded-3 border-1"
                          >
                            <option value="">-- Choose your program --</option>
                            {programs.map((p, i) => (
                              <option key={i} value={p}>{p}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      {/* Message */}
                      <Col xs={12} className="mb-4">
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            <FaComment className="me-2 text-primary" />
                            Additional Message
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your background, expectations, or any questions..."
                            className="rounded-3 border-1"
                            style={{ resize: "vertical" }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Submit Button */}
                    <div className="d-grid mt-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="rounded-pill py-3 fw-bold border-0"
                        style={{ 
                          background: "linear-gradient(90deg, #10B981 0%, #34D399 100%)",
                          fontSize: "1.1rem"
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            Processing Application...
                          </>
                        ) : (
                          "Submit Application & Secure Your Spot"
                        )}
                      </Button>
                      <p className="text-center text-muted mt-3 small">
                        By submitting, you agree to our terms and privacy policy
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Additional Info for Mobile */}
              <div className="d-md-none mt-4 text-center">
                <div className="p-3 rounded-3 bg-light">
                  <p className="mb-2">
                    <FaPhoneAlt className="me-2 text-primary" />
                    Questions? Call us: <strong>0789 402 303</strong>
                  </p>
                  <p className="mb-0 small text-muted">
                    We're available Monday-Friday, 8 AM - 6 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Apply;