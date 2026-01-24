import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { 
  FaLaptopCode, 
  FaNetworkWired, 
  FaProjectDiagram, 
  FaMicrochip, 
  FaBolt, 
  FaChalkboardTeacher, 
  FaRegCalendarAlt, 
  FaTools, 
  FaDesktop,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
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

      {/* DEVELOPER SECTION - NEW SECTION */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #0F172A, #1E293B)" }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center fw-bold mb-5 text-white">
              Meet The Developer
            </h2>
            
            <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: "20px" }}>
              <Row className="g-0">
                {/* Developer Image Section */}
                <Col md={4}>
                  <div 
                    className="h-100 d-flex flex-column align-items-center justify-content-center p-4"
                    style={{ 
                      backgroundColor: "#10B981",
                      minHeight: "350px"
                    }}
                  >
                    <div className="text-center">
                      <div
                        style={{
                          width: "180px",
                          height: "180px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          border: "4px solid #0D9488",
                          overflow: "hidden"
                        }}
                      >
                        {/* Placeholder for developer image */}
                        <img 
  src="/developer.jpg" 
  alt="ABIMANA Yves"
  style={{ 
    width: "100%", 
    height: "100%", 
    objectFit: "cover" 
  }}
/>
                      </div>
                      <h3 className="fw-bold text-white mt-3">ABIMANA Yves</h3>
                      <p className="text-white opacity-90">Full Stack Developer</p>
                      
                      {/* Tech Stack Badges */}
                      {/* <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                        <span className="badge bg-white text-dark px-3 py-2">React</span>
                        <span className="badge bg-white text-dark px-3 py-2">Node.js</span>
                        <span className="badge bg-white text-dark px-3 py-2">MongoDB</span>
                        <span className="badge bg-white text-dark px-3 py-2">Bootstrap</span>
                      </div> */}
                    </div>
                  </div>
                </Col>

                {/* Developer Details Section */}
                <Col md={8}>
                  <Card.Body className="p-4 p-md-5">
                    <h4 className="fw-bold mb-4" style={{ color: "#1E3A8A" }}>
                      About The Developer
                    </h4>
                    
                    <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                      Hi! I'm <strong>ABIMANA Yves</strong>, Passionate full stack developer specializing in modern web and mobile applications using
React, Node.js, and MongoDB and flutter. Focused on building scalable, user-friendly,
and impactful digital solutions for education and business.
                    </p>
                    
                    <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                     
                    </p>

                    {/* Contact Information */}
                    <div className="mt-4">
                      <h5 className="fw-bold mb-3" style={{ color: "#047857" }}>Contact Details</h5>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#10B98120",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "15px"
                            }}>
                              <FaPhone style={{ color: "#10B981" }} />
                            </div>
                            <div>
                              <p className="mb-0 fw-semibold">Phone / WhatsApp</p>
                              <a 
                                href="https://wa.me/250729598007" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: "#059669", textDecoration: "none" }}
                              >
                                072 959 8007
                              </a>
                            </div>
                          </div>
                        </Col>

                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#10B98120",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "15px"
                            }}>
                              <FaEnvelope style={{ color: "#10B981" }} />
                            </div>
                            <div>
                              <p className="mb-0 fw-semibold">Email</p>
                              <a 
                                href="mailto:abyzone01@gmail.com"
                                style={{ color: "#059669", textDecoration: "none" }}
                              >
                                abyzone01@gmail.com
                              </a>
                            </div>
                          </div>
                        </Col>

                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#10B98120",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "15px"
                            }}>
                              <FaInstagram style={{ color: "#E1306C" }} />
                            </div>
                            <div>
                              <p className="mb-0 fw-semibold">Instagram</p>
                              <a 
                                href="https://instagram.com/yves.abimana" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: "#E1306C", textDecoration: "none" }}
                              >
                                @yves.abimana
                              </a>
                            </div>
                          </div>
                        </Col>

                        <Col md={6} className="mb-3">
                          <div className="d-flex align-items-center">
                            {/* <div style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#10B98120",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "15px"
                            }}>
                              <FaGithub style={{ color: "#333" }} />
                            </div> */}
                            {/* <div>
                              <p className="mb-0 fw-semibold">GitHub</p>
                              <a 
                                href="https://github.com/aby-developer" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: "#333", textDecoration: "none" }}
                              >
                                @abyzone
                              </a>
                            </div> */}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-4">
                      <h5 className="fw-bold mb-3" style={{ color: "#047857" }}>Connect With Me</h5>
                      <div className="d-flex gap-3">
                        <Button
                          href="https://wa.me/250729598007"
                          target="_blank"
                          variant="outline-success"
                          className="d-flex align-items-center gap-2 rounded-pill px-4"
                        >
                          <FaWhatsapp /> WhatsApp
                        </Button>
                        <Button
                          href="https://instagram.com/yves.abimana"
                          target="_blank"
                          variant="outline-danger"
                          className="d-flex align-items-center gap-2 rounded-pill px-4"
                          style={{ borderColor: "#E1306C", color: "#E1306C" }}
                        >
                          <FaInstagram /> Instagram
                        </Button>
                        <Button
                          href="mailto:abyzone01@gmail.com"
                          variant="outline-primary"
                          className="d-flex align-items-center gap-2 rounded-pill px-4"
                        >
                          <FaEnvelope /> Email
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-5">
              <p className="text-white opacity-75">
                Looking for web development services or have a project in mind? Feel free to reach out!
              </p>
              <Button
                href="mailto:abyzone01@gmail.com"
                size="lg"
                className="rounded-pill px-5 py-3 mt-2"
                style={{ 
                  backgroundColor: "#10B981", 
                  border: "none",
                  fontWeight: "600"
                }}
              >
                <FaEnvelope className="me-2" />
                Start a Conversation
              </Button>
            </div>
          </motion.div>
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