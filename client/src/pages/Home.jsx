import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaNetworkWired,
  FaMicrochip,
  FaPhotoVideo,
  FaBolt,
  FaChalkboardTeacher,
  FaUmbrellaBeach,
  FaTools,
  FaArrowLeft,
  FaArrowRight,
  FaCertificate,
  FaUserGraduate,
  FaBullseye,
  FaQuoteLeft,
  FaStar,
  FaMapMarkerAlt,
  FaUsers,
  FaHandshake
} from "react-icons/fa";
import { useRef } from "react";
import { Link } from "react-router-dom";

const programs = [
  {
    title: "Software Development (SOD)",
    icon: <FaLaptopCode />,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["HTML, CSS, JS", "React Basics", "Backend Intro"],
    color: "#10B981" // Emerald Green
  },
  {
    title: "Computer Systems & Architecture (CSA)",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Hardware Basics", "CPU & Memory", "System Assembly"],
    color: "#059669" // Green
  },
  {
    title: "Networking & Internet Technology (NIT)",
    icon: <FaNetworkWired />,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["LAN/WAN", "IP Addressing", "Routing Basics"],
    color: "#047857" // Dark Green
  },
  {
    title: "Multimedia Productions (MMP)",
    icon: <FaPhotoVideo />,
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Graphic Design", "Video Editing", "Branding"],
    color: "#0D9488" // Teal
  },
  {
    title: "Electronics & Telecommunications (ETE)",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Circuits", "Signals", "Communication"],
    color: "#14B8A6" // Teal Green
  },
  {
    title: "Electrical Technology (ELT)",
    icon: <FaBolt />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Wiring", "Safety", "Installations"],
    color: "#0F766E" // Emerald
  },
  {
    title: "Teacher Training Program",
    icon: <FaChalkboardTeacher />,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["ICT Pedagogy", "Digital Tools", "Curriculum"],
    color: "#0D9488" // Teal
  },
  {
    title: "Holiday Program",
    icon: <FaUmbrellaBeach />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Basic Coding", "Creativity", "Tech Exposure"],
    color: "#10B981" // Green
  },
  {
    title: "Technical Support & ICT Supply",
    icon: <FaTools />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Maintenance", "Troubleshooting", "ICT Equipment"],
    color: "#059669" // Green
  }
];

const testimonials = [
  {
    name: "MASENGESHO Henriette",
    program: "L5SOD - Software Development",
    image: "/testimonials/henriette.jpg",
    quote: "The hands-on approach gave me real development experience. I built 3 complete projects that impressed my employers!",
    rating: 5,
    color: "#10B981",
    location: "Kigali, Rwanda"
  },
  {
    name: "DUKUNDANE NGABO Richard",
    program: "L5CSA - Computer Systems & Architecture",
    image: "/testimonials/richard.jpg",
    quote: "Practical hardware training was exactly what I needed. I can now troubleshoot and assemble systems confidently.",
    rating: 5,
    color: "#059669",
    location: "Kampala, Uganda"
  },
  {
    name: "KAGABO Pascal",
    program: "L5SOD - Software Development",
    image: "/testimonials/pascal.jpg",
    quote: "From beginner to job-ready in one month! The project-based curriculum and expert mentorship were game-changers.",
    rating: 5,
    color: "#047857",
    location: "Nairobi, Kenya"
  },
  {
    name: "MUKAMWANA Alice",
    program: "L5MMP - Multimedia Productions",
    image: "/testimonials/alice.jpg",
    quote: "The creative tools and techniques I learned opened doors to freelance opportunities I never imagined possible.",
    rating: 5,
    color: "#0D9488",
    location: "Dar es Salaam, Tanzania"
  }
];

const Home = () => {
  const programsScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* TRANSFORM YOUR CAREER BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-3"
        style={{
          background: "linear-gradient(135deg, #059669, #047857)",
          color: "white",
          position: "sticky",
          top: "56px",
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <Container>
          <h3 className="fw-bold mb-0" style={{ fontSize: "1.2rem" }}>
            🌍 TRANSFORM YOUR CAREER IN TECH 🌍
          </h3>
          <small className="opacity-75">
            Join hundreds of African tech professionals who changed their lives with our internship programs
          </small>
        </Container>
      </motion.div>

      {/* HERO SECTION */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: "85vh",
          background: "linear-gradient(135deg, #047857, #0D9488)",
          color: "white",
          paddingTop: "100px"
        }}
      >
        <Container>
          <Row className="align-items-center flex-column-reverse flex-md-row">
            <Col md={6}>
              <h1 className="fw-bold display-5">
                Empowering Africa's Next Generation of Tech Leaders
              </h1>
              <p className="lead mt-4">
                Hands-on IT training and internships designed for African students. 
                Get industry-ready skills from expert mentors in just 1 month.
              </p>
              <div className="d-flex flex-column flex-md-row gap-3 mt-4">
                <Button
                  as={Link}
                  to="/programs"
                  size="lg"
                  className="rounded-pill py-3 px-5 d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: "#10B981", 
                    border: "none",
                    minWidth: "200px",
                    fontWeight: "600",
                    fontSize: "1.1rem"
                  }}
                >
                  Explore Programs →
                </Button>
                <Button
                  as={Link}
                  to="/apply"
                  size="lg"
                  className="rounded-pill py-3 px-5 d-flex align-items-center justify-content-center"
                  style={{ 
                    backgroundColor: "#059669", 
                    border: "none",
                    minWidth: "200px",
                    fontWeight: "600",
                    fontSize: "1.1rem"
                  }}
                >
                  Apply Now 🚀
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="African students learning technology"
                className="img-fluid rounded shadow-lg"
                style={{ 
                  border: "5px solid white", 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  objectFit: "cover",
                  height: "400px"
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* AFRICAN IMPACT SECTION */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="fw-bold text-center mb-5" style={{ color: "#047857" }}>
            Made for Africa, By Africans
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#10B98120",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaMapMarkerAlt size={30} style={{ color: "#10B981" }} />
                  </div>
                  <h5 className="fw-bold mb-2">African Context</h5>
                  <p className="text-muted mb-0">
                    Curriculum designed for African market needs and challenges.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#05966920",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaUsers size={30} style={{ color: "#059669" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Local Experts</h5>
                  <p className="text-muted mb-0">
                    Learn from African tech professionals with local industry experience.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#04785720",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaHandshake size={30} style={{ color: "#047857" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Local Partnerships</h5>
                  <p className="text-muted mb-0">
                    Strong connections with African tech companies for job placements.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PROGRAMS SLIDER */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #0D9488, #047857)",
          color: "white"
        }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Available Trainings & Programs</h2>
              <p className="opacity-75">Choose from 9 specialized tracks designed for African market success</p>
            </div>
            <Button 
              as={Link} 
              to="/programs" 
              className="rounded-pill px-4 py-2"
              style={{ 
                backgroundColor: "#10B981", 
                color: "white",
                border: "none",
                fontWeight: "600",
                minWidth: "150px"
              }}
            >
              Explore More →
            </Button>
          </div>

          <div className="position-relative">
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle"
              variant="light"
              onClick={() => scroll(programsScrollRef, "left")}
              style={{ width: "45px", height: "45px" }}
            >
              <FaArrowLeft />
            </Button>

            <div
              ref={programsScrollRef}
              className="d-flex gap-4 overflow-auto px-5 py-3"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
            >
              {programs.map((p, i) => (
                <Card
                  key={i}
                  style={{ 
                    minWidth: "300px", 
                    borderRadius: "15px",
                    border: "none",
                    overflow: "hidden"
                  }}
                  className="shadow-lg text-white"
                >
                  <div style={{ 
                    position: "relative",
                    height: "200px",
                    overflow: "hidden"
                  }}>
                    <img 
                      src={p.image} 
                      alt={p.title}
                      style={{ 
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.7)"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: p.color + "80",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <div style={{ 
                        width: "60px", 
                        height: "60px", 
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.5rem"
                      }}>
                        {p.icon}
                      </div>
                    </div>
                  </div>
                  <Card.Body style={{ backgroundColor: p.color }}>
                    <h5 className="fw-bold mb-3">
                      {p.title}
                    </h5>
                    <ul className="small mb-3" style={{ listStyle: "none", paddingLeft: "0" }}>
                      {p.topics.map((t, idx) => (
                        <li key={idx} className="mb-1">
                          ✓ {t}
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small fw-semibold">📅 1 Month</span>
                      <Button
                        as={Link}
                        to="/apply"
                        size="sm"
                        className="rounded-pill px-4"
                        style={{ 
                          backgroundColor: "#059669", 
                          border: "none",
                          fontWeight: "500"
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle"
              variant="light"
              onClick={() => scroll(programsScrollRef, "right")}
              style={{ width: "45px", height: "45px" }}
            >
              <FaArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* INVEST IN CAREER */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="fw-bold text-center mb-5" style={{ color: "#047857" }}>
            Invest in your career
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#10B98120",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaBullseye size={30} style={{ color: "#10B981" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Explore New Skills</h5>
                  <p className="text-muted mb-0">
                    Gain in-demand technology skills that African employers are looking for right now.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#05966920",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaCertificate size={30} style={{ color: "#059669" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Earn Certificates</h5>
                  <p className="text-muted mb-0">
                    Get recognized for every completed program with industry-relevant certificates.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className="text-center p-4">
                  <div style={{ 
                    width: "70px", 
                    height: "70px", 
                    backgroundColor: "#04785720",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <FaUserGraduate size={30} style={{ color: "#047857" }} />
                  </div>
                  <h5 className="fw-bold mb-2">Learn from Experts</h5>
                  <p className="text-muted mb-0">
                    Practical training led by African professionals with years of industry experience.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-5" style={{ backgroundColor: "#F0FDF4" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ color: "#047857" }}>
              Success Stories From African Graduates
            </h2>
            <p className="text-muted">
              Hear from students across Africa who transformed their careers through our internship programs
            </p>
          </div>

          <div className="position-relative">
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-block"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "left")}
              style={{ width: "45px", height: "45px", borderColor: "#047857", color: "#047857" }}
            >
              <FaArrowLeft />
            </Button>

            <div
              ref={testimonialsScrollRef}
              className="d-flex gap-4 overflow-auto px-3"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0"
                  style={{ width: "320px" }}
                >
                  <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "15px", border: "1px solid #D1FAE5" }}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-4">
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            backgroundColor: testimonial.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            marginRight: "15px"
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0" style={{ color: testimonial.color }}>{testimonial.name}</h6>
                          <small className="text-muted">{testimonial.program}</small>
                          <div className="d-flex align-items-center mt-1">
                            <FaMapMarkerAlt size={10} className="text-muted me-1" />
                            <small className="text-muted">{testimonial.location}</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <FaQuoteLeft className="text-muted mb-2" />
                        <p className="fst-italic" style={{ lineHeight: "1.6", color: "#374151" }}>
                          "{testimonial.quote}"
                        </p>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="d-flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? "text-warning" : "text-muted"} 
                              size={14}
                            />
                          ))}
                        </div>
                        <span className="ms-2 small text-muted">5.0 rating</span>
                      </div>
                    </Card.Body>
                    <div 
                      className="card-footer border-0 rounded-bottom"
                      style={{ 
                        backgroundColor: testimonial.color + "10",
                        borderTop: `3px solid ${testimonial.color}`
                      }}
                    >
                      <small className="text-muted">Graduated with honors</small>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-block"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "right")}
              style={{ width: "45px", height: "45px", borderColor: "#047857", color: "#047857" }}
            >
              <FaArrowRight />
            </Button>
          </div>
          
          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/apply"
              size="lg"
              className="rounded-pill px-5 py-3"
              style={{ 
                backgroundColor: "#059669", 
                border: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                minWidth: "250px"
              }}
            >
              Start Your African Tech Journey 🌍
            </Button>
          </div>
        </Container>
      </section>

      {/* READY TO START SECTION */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center p-5"
            style={{ 
              background: "linear-gradient(135deg, #047857, #059669)",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)"
            }}
          >
            <h2 className="fw-bold mb-3 text-white">
              Ready To Start Your African Tech Journey?
            </h2>
            <p className="lead mb-4 text-white opacity-90">
              Join hundreds of successful African graduates with our affordable internship program
            </p>
            
            <div className="d-flex justify-content-center align-items-center mb-4">
              <div className="me-4">
                <span style={{ 
                  textDecoration: "line-through", 
                  color: "#FEF3C7",
                  fontSize: "1.5rem",
                  fontWeight: "600"
                }}>
                  45,000 FRW
                </span>
              </div>
              <div>
                <span style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "800",
                  color: "white"
                }}>
                  30,000 FRW
                </span>
              </div>
            </div>
            
            <p className="text-white opacity-75 mb-4">
              ⏰ Limited spots available for next intake
            </p>
            
            <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
              <Button
                as={Link}
                to="/apply"
                size="lg"
                className="rounded-pill py-3 px-5"
                style={{ 
                  backgroundColor: "#10B981", 
                  border: "none",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  minWidth: "220px"
                }}
              >
                Apply Now 🚀
              </Button>
              
              <Button
                as={Link}
                to="/programs"
                variant="outline-light"
                size="lg"
                className="rounded-pill py-3 px-5"
                style={{ 
                  border: "2px solid white",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  minWidth: "220px"
                }}
              >
                View All Programs
              </Button>
            </div>
            
            <p className="mt-4 small text-white opacity-75">
              ✅ 100% Practical Training • ✅ Certificate Included • ✅ African Job Placement Support
            </p>
          </motion.div>
        </Container>
      </section>

      {/* AFRICAN PARTNERS SECTION */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#047857" }}>
              Trusted Across Africa
            </h3>
            <p className="text-muted">Students from across East Africa trust our programs</p>
          </div>
          <Row className="justify-content-center text-center">
            <Col xs={6} md={2}>
              <div className="p-3">
                <div style={{ fontSize: "2rem", color: "#10B981" }}>🇷🇼</div>
                <h5 className="fw-bold mt-2">Rwanda</h5>
              </div>
            </Col>
            <Col xs={6} md={2}>
              <div className="p-3">
                <div style={{ fontSize: "2rem", color: "#059669" }}>🇺🇬</div>
                <h5 className="fw-bold mt-2">Uganda</h5>
              </div>
            </Col>
            <Col xs={6} md={2}>
              <div className="p-3">
                <div style={{ fontSize: "2rem", color: "#047857" }}>🇰🇪</div>
                <h5 className="fw-bold mt-2">Kenya</h5>
              </div>
            </Col>
            <Col xs={6} md={2}>
              <div className="p-3">
                <div style={{ fontSize: "2rem", color: "#0D9488" }}>🇹🇿</div>
                <h5 className="fw-bold mt-2">Tanzania</h5>
              </div>
            </Col>
            <Col xs={6} md={2}>
              <div className="p-3">
                <div style={{ fontSize: "2rem", color: "#14B8A6" }}>🇧🇮</div>
                <h5 className="fw-bold mt-2">Burundi</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;