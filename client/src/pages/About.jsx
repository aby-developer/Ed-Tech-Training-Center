import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { FaLaptopCode, FaNetworkWired, FaProjectDiagram, FaMicrochip, FaBolt, FaChalkboardTeacher, FaRegCalendarAlt, FaTools, FaDesktop } from "react-icons/fa";
import { motion } from "framer-motion";

const offeredCourses = [
  { name: "Software Development (SOD)", icon: <FaLaptopCode /> },
  { name: "Computer Systems & Architecture (CSA)", icon: <FaMicrochip /> },
  { name: "Networking & Internet Technology (NIT)", icon: <FaNetworkWired /> },
  { name: "Multimedia Productions (MMP)", icon: <FaProjectDiagram /> },
  { name: "Electronics & Telecommunications (ETE)", icon: <FaMicrochip /> },
  { name: "Electrical Technology (ELT)", icon: <FaBolt /> },
];

const offeredServices = [
  { name: "Teacher Training Programs", icon: <FaChalkboardTeacher /> },
  { name: "Holiday Programs", icon: <FaRegCalendarAlt /> },
  { name: "Technical Support", icon: <FaTools /> },
  { name: "Supplying ICT Peripherals", icon: <FaDesktop /> },
];

const About = () => {
  return (
    <>
      {/* HERO HEADER */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "40vh",
          background: "linear-gradient(135deg, #1E3A8A, #10B981)",
          color: "white",
          textAlign: "center",
          paddingTop: "70px"
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="fw-bold display-5">About Ed Tech Solutions</h1>
            <p className="lead mt-3" style={{ fontSize: "1.2rem", fontStyle: "italic" }}>
              Innovating ICT learning for the future
            </p>
          </motion.div>
        </Container>
      </section>

      {/* WHAT WE DO */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-4" style={{ color: "#1E3A8A" }}>
            What We Do
          </h2>
          <p className="text-center text-muted mb-5">
            We provide high-quality ICT training in two main sections: Courses and Services.
          </p>

          <Row>
            {/* Offered Courses */}
            <Col md={6} className="mb-4">
              <h4 style={{ color: "#10B981", fontWeight: "600" }}>Offered Courses</h4>
              <ListGroup variant="flush" className="mt-3">
                {offeredCourses.map((course, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: "1.3rem", color: "#1E3A8A" }}>{course.icon}</span>
                      <span style={{ fontWeight: "500" }}>{course.name}</span>
                    </div>
                    <Button size="sm" href="/Apply" style={{ backgroundColor: "#14B8A6", border: "none" }}>
                      Apply Now
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            {/* Offered Services */}
            <Col md={6} className="mb-4">
              <h4 style={{ color: "#10B981", fontWeight: "600" }}>Offered Services</h4>
              <ListGroup variant="flush" className="mt-3">
                {offeredServices.map((service, index) => (
                  <ListGroup.Item key={index} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: "1.3rem", color: "#1E3A8A" }}>{service.icon}</span>
                      <span style={{ fontWeight: "500" }}>{service.name}</span>
                    </div>
                    <Button size="sm" href="/Apply" style={{ backgroundColor: "#14B8A6", border: "none" }}>
                      Apply Now
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TRAINING OUTCOMES */}
      <section className="py-5" style={{ backgroundColor: "#F9FAFB" }}>
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ color: "#1E3A8A" }}>
            Training Outcomes
          </h2>
          <Row className="text-center">
            <Col sm={4} className="mb-4">
              <Card className="border-0 shadow-sm py-4">
                <Card.Body>
                  <h3 className="fw-bold" style={{ color: "#10B981" }}>500+</h3>
                  <p className="text-muted">Students Trained</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} className="mb-4">
              <Card className="border-0 shadow-sm py-4">
                <Card.Body>
                  <h3 className="fw-bold" style={{ color: "#10B981" }}>8+</h3>
                  <p className="text-muted">Programs Offered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4} className="mb-4">
              <Card className="border-0 shadow-sm py-4">
                <Card.Body>
                  <h3 className="fw-bold" style={{ color: "#10B981" }}>Kigali</h3>
                  <p className="text-muted">Location</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MISSION & VISION */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "#1E3A8A" }}>Our Mission</Card.Title>
                  <Card.Text className="text-muted mt-3">
                    To provide innovative ICT training that equips students with the skills and confidence
                    to excel in technology careers and contribute to national development.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body>
                  <Card.Title className="fw-bold" style={{ color: "#1E3A8A" }}>Our Vision</Card.Title>
                  <Card.Text className="text-muted mt-3">
                    To be the leading ICT training center in Rwanda and the region, recognized for
                    excellence in teaching, practical learning, and producing skilled professionals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
