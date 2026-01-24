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
  FaHandshake,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
  FaYoutube
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const programs = [
  {
    title: "Software Development (SOD)",
    shortTitle: "Software Dev",
    icon: <FaLaptopCode />,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["HTML, CSS, JS", "React Basics", "Backend Intro"],
    color: "#10B981"
  },
  {
    title: "Computer Systems & Architecture (CSA)",
    shortTitle: "Computer Systems",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Hardware Basics", "CPU & Memory", "System Assembly"],
    color: "#059669"
  },
  {
    title: "Networking & Internet Technology (NIT)",
    shortTitle: "Networking",
    icon: <FaNetworkWired />,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["LAN/WAN", "IP Addressing", "Routing Basics"],
    color: "#047857"
  },
  {
    title: "Multimedia Productions (MMP)",
    shortTitle: "Multimedia",
    icon: <FaPhotoVideo />,
    image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Graphic Design", "Video Editing", "Branding"],
    color: "#0D9488"
  },
  {
    title: "Electronics & Telecommunications (ETE)",
    shortTitle: "Electronics",
    icon: <FaMicrochip />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Circuits", "Signals", "Communication"],
    color: "#14B8A6"
  },
  {
    title: "Electrical Technology (ELT)",
    shortTitle: "Electrical",
    icon: <FaBolt />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Wiring", "Safety", "Installations"],
    color: "#0F766E"
  },
  {
    title: "Teacher Training Program",
    shortTitle: "Teacher Training",
    icon: <FaChalkboardTeacher />,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["ICT Pedagogy", "Digital Tools", "Curriculum"],
    color: "#0D9488"
  },
  {
    title: "Holiday Program",
    shortTitle: "Holiday Program",
    icon: <FaUmbrellaBeach />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Basic Coding", "Creativity", "Tech Exposure"],
    color: "#10B981"
  },
  {
    title: "Technical Support & ICT Supply",
    shortTitle: "Tech Support",
    icon: <FaTools />,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    topics: ["Maintenance", "Troubleshooting", "ICT Equipment"],
    color: "#059669"
  }
];

const testimonials = [
  {
    name: "MASENGESHO Henriette",
    program: "L5SOD - Software Development",
    shortProgram: "Software Dev",
    image: "/testimonials/henriette.jpg",
    quote: "The hands-on approach gave me real development experience. I built 3 complete projects that impressed my employers!",
    rating: 5,
    color: "#10B981",
    location: "Kigali, Rwanda"
  },
  {
    name: "DUKUNDANE NGABO Richard",
    program: "L5CSA - Computer Systems & Architecture",
    shortProgram: "Computer Systems",
    image: "/testimonials/richard.jpg",
    quote: "Practical hardware training was exactly what I needed. I can now troubleshoot and assemble systems confidently.",
    rating: 5,
    color: "#059669",
    location: "Ruhango, Rwanda"
  },
  {
    name: "KAGABO Pascal",
    program: "L5SOD - Software Development",
    shortProgram: "Software Dev",
    image: "/testimonials/pascal.jpg",
    quote: "From beginner to job-ready in one month! The project-based curriculum and expert mentorship were game-changers.",
    rating: 5,
    color: "#047857",
    location: "Kigali, Rwanda"
  },
  {
    name: "ABIMANA Yves",
    program: "L5SOD - Software Development",
    shortProgram: "Software Dev",
    image: "/testimonials/alice.jpg",
    quote: "The creative tools and techniques I learned opened doors to freelance opportunities I never imagined possible.",
    rating: 5,
    color: "#0D9488",
    location: "Muhanga, Rwanda"
  }
];

const videos = [
  {
    id: 1,
    title: "Student Success Story",
    description: "Hear from our graduate about their journey",
    youtubeId: "BkXzPDMRvSw",
    thumbnail: "https://img.youtube.com/vi/BkXzPDMRvSw/maxresdefault.jpg",
    duration: "3:45",
    
    featured: true
  },
  {
    id: 2,
    title: "Campus Tour & Facilities",
    description: "See our modern training labs and equipment",
    youtubeId: "RhF8z7wyZS0",
    thumbnail: "https://img.youtube.com/vi/RhF8z7wyZS0/maxresdefault.jpg",
    duration: "4:20",
    
    featured: false
  },
  {
    id: 3,
    title: "Expert Instructor Interview",
    description: "Learn about our teaching methodology",
    youtubeId: "tQs-mhj9Wnk",
    thumbnail: "https://img.youtube.com/vi/tQs-mhj9Wnk/maxresdefault.jpg",
    duration: "5:15",
    
    featured: true
  },
  {
    id: 4,
    title: "Graduation Ceremony",
    description: "Watch our latest graduation ceremony highlights",
    youtubeId: "BkXzPDMRvSw",
    thumbnail: "https://img.youtube.com/vi/BkXzPDMRvSw/maxresdefault.jpg",
    duration: "6:30",
    views: "3.5K",
    featured: false
  }
];

const Home = () => {
  const programsScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);
  const videosScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = isMobile ? 280 : 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleVideoClick = (video) => {
    setActiveVideo(video);
  };

  const openYouTubeVideo = (youtubeId) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <>
      {/* TRANSFORM YOUR CAREER BANNER - RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-2 py-md-3"
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
          <h3 className="fw-bold mb-0" style={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
            {isMobile ? "🚀 TRANSFORM YOUR TECH CAREER 🚀" : "🌍 TRANSFORM YOUR CAREER IN TECH 🌍"}
          </h3>
          <small className="opacity-75 d-none d-sm-block">
            Join hundreds of African tech professionals who changed their lives with our internship programs
          </small>
        </Container>
      </motion.div>

      {/* HERO SECTION - RESPONSIVE */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: isMobile ? "auto" : "85vh",
          background: "linear-gradient(135deg, #047857, #0D9488)",
          color: "white",
          paddingTop: isMobile ? "80px" : "100px",
          paddingBottom: isMobile ? "60px" : "0"
        }}
      >
        <Container>
          <Row className="align-items-center flex-column-reverse flex-md-row">
            <Col md={6} className={isMobile ? "mt-4" : ""}>
              <h1 className={`fw-bold ${isMobile ? "display-6 text-center" : "display-5"}`}>
                Empowering Africa's Next Generation of Tech Leaders
              </h1>
              <p className={`lead mt-3 mt-md-4 ${isMobile ? "text-center" : ""}`}>
                Hands-on IT training and internships designed for African students. 
                Get industry-ready skills from expert mentors in just 1 month.
              </p>
              <div className={`d-flex ${isMobile ? "flex-column align-items-center" : "flex-column flex-md-row gap-3"} mt-4`}>
                <Button
                  as={Link}
                  to="/programs"
                  size="lg"
                  className={`rounded-pill ${isMobile ? "w-100 mb-2" : "py-3 px-5"} d-flex align-items-center justify-content-center`}
                  style={{ 
                    backgroundColor: "#10B981", 
                    border: "none",
                    fontWeight: "600",
                    fontSize: isMobile ? "1rem" : "1.1rem"
                  }}
                >
                  {isMobile ? "Explore Programs →" : "Explore Programs →"}
                </Button>
                <Button
                  as={Link}
                  to="/apply"
                  size="lg"
                  className={`rounded-pill ${isMobile ? "w-100" : "py-3 px-5"} d-flex align-items-center justify-content-center`}
                  style={{ 
                    backgroundColor: "#059669", 
                    border: "none",
                    fontWeight: "600",
                    fontSize: isMobile ? "1rem" : "1.1rem"
                  }}
                >
                  {isMobile ? "Apply Now 🚀" : "Apply Now 🚀"}
                </Button>
              </div>
            </Col>

            <Col md={6} className={isMobile ? "mt-4" : ""}>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                src="images/ed-tech-training.png"
                alt="African students learning technology"
                className="img-fluid rounded shadow-lg w-100"
                style={{ 
                  border: "5px solid white", 
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  objectFit: "cover",
                  height: isMobile ? "250px" : "400px"
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* AFRICAN IMPACT SECTION - RESPONSIVE */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className={`fw-bold text-center mb-4 mb-md-5 ${isMobile ? "h3" : ""}`} style={{ color: "#047857" }}>
            Made for Africa, By Africans
          </h2>
          <Row className="g-3 g-md-4">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#10B98120",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaMapMarkerAlt size={isMobile ? 20 : 30} style={{ color: "#10B981" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>African Context</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Curriculum designed for African market needs and challenges.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#05966920",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaUsers size={isMobile ? 20 : 30} style={{ color: "#059669" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>Local Experts</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Learn from African tech professionals with local industry experience.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#04785720",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaHandshake size={isMobile ? 20 : 30} style={{ color: "#047857" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>Local Partnerships</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Strong connections with African tech companies for job placements.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PROGRAMS SLIDER - ENHANCED RESPONSIVE */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #0D9488, #047857)",
          color: "white"
        }}
      >
        <Container>
          <div className={`d-flex ${isMobile ? "flex-column" : "justify-content-between align-items-center"} mb-4`}>
            <div className={isMobile ? "text-center mb-3" : ""}>
              <h2 className={`fw-bold ${isMobile ? "h4 mb-1" : "mb-1"}`}>
                {isMobile ? "Available Programs" : "Available Trainings & Programs"}
              </h2>
              <p className={`opacity-75 ${isMobile ? "small" : ""}`}>
                {isMobile ? "9 specialized tracks" : "Choose from 9 specialized tracks designed for African market success"}
              </p>
            </div>
            <div className={isMobile ? "text-center" : ""}>
              <Button 
                as={Link} 
                to="/programs" 
                className="rounded-pill px-4 py-2"
                style={{ 
                  backgroundColor: "#10B981", 
                  color: "white",
                  border: "none",
                  fontWeight: "600",
                  minWidth: isMobile ? "140px" : "150px"
                }}
              >
                {isMobile ? "View All →" : "Explore More →"}
              </Button>
            </div>
          </div>

          <div className="position-relative">
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="light"
              onClick={() => scroll(programsScrollRef, "left")}
              style={{ width: "45px", height: "45px" }}
            >
              <FaArrowLeft />
            </Button>

            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="light"
              onClick={() => scroll(programsScrollRef, "left")}
              style={{ width: "35px", height: "35px" }}
            >
              <FaChevronLeft size={14} />
            </Button>

            <div
              ref={programsScrollRef}
              className="d-flex gap-3 gap-md-4 overflow-auto px-2 px-md-5 py-2 py-md-3"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {programs.map((p, i) => (
                <Card
                  key={i}
                  style={{ 
                    minWidth: isMobile ? "260px" : "300px", 
                    borderRadius: "15px",
                    border: "none",
                    overflow: "hidden",
                    flexShrink: 0
                  }}
                  className="shadow-lg text-white"
                >
                  <div style={{ 
                    position: "relative",
                    height: isMobile ? "160px" : "200px",
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
                        width: isMobile ? "50px" : "60px", 
                        height: isMobile ? "50px" : "60px", 
                        backgroundColor: "rgba(255,255,255,0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isMobile ? "1.2rem" : "1.5rem"
                      }}>
                        {p.icon}
                      </div>
                    </div>
                  </div>
                  <Card.Body style={{ backgroundColor: p.color, padding: isMobile ? "1rem" : "1.5rem" }}>
                    <h5 className={`fw-bold mb-3 ${isMobile ? "h6" : ""}`}>
                      {isMobile ? p.shortTitle || p.title : p.title}
                    </h5>
                    <ul className={`${isMobile ? "small" : "small"} mb-3`} style={{ listStyle: "none", paddingLeft: "0", marginBottom: isMobile ? "0.75rem" : "1rem" }}>
                      {p.topics.map((t, idx) => (
                        <li key={idx} className="mb-1">
                          ✓ {t}
                        </li>
                      ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={`${isMobile ? "small" : "small"} fw-semibold`}>📅 1 Month</span>
                      <Button
                        as={Link}
                        to="/apply"
                        size={isMobile ? "sm" : "sm"}
                        className={`rounded-pill ${isMobile ? "px-3" : "px-4"}`}
                        style={{ 
                          backgroundColor: "#059669", 
                          border: "none",
                          fontWeight: "500",
                          fontSize: isMobile ? "0.8rem" : "0.875rem"
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
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="light"
              onClick={() => scroll(programsScrollRef, "right")}
              style={{ width: "45px", height: "45px" }}
            >
              <FaArrowRight />
            </Button>

            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="light"
              onClick={() => scroll(programsScrollRef, "right")}
              style={{ width: "35px", height: "35px" }}
            >
              <FaChevronRight size={14} />
            </Button>
          </div>

          {isMobile && (
            <div className="text-center mt-3">
              <small className="opacity-75">Swipe or use arrows to see more programs</small>
            </div>
          )}
        </Container>
      </section>

      {/* INVEST IN CAREER - RESPONSIVE */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className={`fw-bold text-center mb-4 mb-md-5 ${isMobile ? "h4" : ""}`} style={{ color: "#047857" }}>
            Invest in your career
          </h2>
          <Row className="g-3 g-md-4">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#10B98120",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaBullseye size={isMobile ? 20 : 30} style={{ color: "#10B981" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>Explore New Skills</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Gain in-demand technology skills that African employers are looking for right now.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#05966920",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaCertificate size={isMobile ? 20 : 30} style={{ color: "#059669" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>Earn Certificates</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Get recognized for every completed program with industry-relevant certificates.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="border-0 shadow-sm h-100" style={{ borderRadius: "15px" }}>
                <Card.Body className={`text-center ${isMobile ? "p-3" : "p-4"}`}>
                  <div style={{ 
                    width: isMobile ? "50px" : "70px", 
                    height: isMobile ? "50px" : "70px", 
                    backgroundColor: "#04785720",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px"
                  }}>
                    <FaUserGraduate size={isMobile ? 20 : 30} style={{ color: "#047857" }} />
                  </div>
                  <h5 className={`fw-bold mb-2 ${isMobile ? "h6" : ""}`}>Learn from Experts</h5>
                  <p className="text-muted mb-0" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    Practical training led by African professionals with years of industry experience.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* TESTIMONIALS SECTION - ENHANCED RESPONSIVE */}
      <section className="py-5" style={{ backgroundColor: "#F0FDF4" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className={`fw-bold mb-3 ${isMobile ? "h4" : ""}`} style={{ color: "#047857" }}>
              {isMobile ? "Success Stories of Graduates" : "Success Stories From African Graduates"}
            </h2>
            <p className={`text-muted ${isMobile ? "small" : ""}`}>
              {isMobile ? "Hear from our successful graduates" : "Hear from students across Africa who transformed their careers through our internship programs"}
            </p>
          </div>

          <div className="position-relative">
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "left")}
              style={{ width: "45px", height: "45px", borderColor: "#047857", color: "#047857" }}
            >
              <FaArrowLeft />
            </Button>

            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "left")}
              style={{ width: "35px", height: "35px", borderColor: "#047857", color: "#047857" }}
            >
              <FaChevronLeft size={14} />
            </Button>

            <div
              ref={testimonialsScrollRef}
              className="d-flex gap-3 gap-md-4 overflow-auto px-2 px-md-3"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0"
                  style={{ width: isMobile ? "280px" : "320px" }}
                >
                  <Card className="border-0 shadow-lg h-100" style={{ borderRadius: "15px", border: "1px solid #D1FAE5" }}>
                    <Card.Body className={isMobile ? "p-3" : "p-4"}>
                      <div className="d-flex align-items-center mb-3 mb-md-4">
                        <div
                          style={{
                            width: isMobile ? "50px" : "60px",
                            height: isMobile ? "50px" : "60px",
                            borderRadius: "50%",
                            backgroundColor: testimonial.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: isMobile ? "1rem" : "1.2rem",
                            marginRight: isMobile ? "12px" : "15px"
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className={`fw-bold mb-0 ${isMobile ? "small" : ""}`} style={{ color: testimonial.color }}>
                            {isMobile ? testimonial.name.split(" ")[0] : testimonial.name}
                          </h6>
                          <small className="text-muted">
                            {isMobile ? testimonial.shortProgram : testimonial.program}
                          </small>
                          <div className="d-flex align-items-center mt-1">
                            <FaMapMarkerAlt size={isMobile ? 8 : 10} className="text-muted me-1" />
                            <small className="text-muted" style={{ fontSize: isMobile ? "0.75rem" : "0.875rem" }}>
                              {testimonial.location}
                            </small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <FaQuoteLeft className="text-muted mb-2" size={isMobile ? 14 : 16} />
                        <p className="fst-italic" style={{ 
                          lineHeight: "1.6", 
                          color: "#374151",
                          fontSize: isMobile ? "0.9rem" : "1rem"
                        }}>
                          "{testimonial.quote}"
                        </p>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="d-flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? "text-warning" : "text-muted"} 
                              size={isMobile ? 12 : 14}
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
                        borderTop: `3px solid ${testimonial.color}`,
                        padding: isMobile ? "0.5rem" : "0.75rem"
                      }}
                    >
                      <small className="text-muted">Graduated with honors</small>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "right")}
              style={{ width: "45px", height: "45px", borderColor: "#047857", color: "#047857" }}
            >
              <FaArrowRight />
            </Button>

            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="outline-success"
              onClick={() => scroll(testimonialsScrollRef, "right")}
              style={{ width: "35px", height: "35px", borderColor: "#047857", color: "#047857" }}
            >
              <FaChevronRight size={14} />
            </Button>
          </div>

          {isMobile && (
            <div className="text-center mt-3">
              <small className="opacity-75">Swipe or use arrows to see more stories</small>
            </div>
          )}
          
          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/apply"
              size="lg"
              className={`rounded-pill ${isMobile ? "w-100 py-2" : "px-5 py-3"}`}
              style={{ 
                backgroundColor: "#059669", 
                border: "none",
                fontWeight: "600",
                fontSize: isMobile ? "1rem" : "1.1rem",
                maxWidth: isMobile ? "100%" : "auto"
              }}
            >
              {isMobile ? "Start Your Journey 🌍" : "Start Your African Tech Journey 🌍"}
            </Button>
          </div>
        </Container>
      </section>

      {/* VIDEOS SECTION - NEW SECTION ADDED HERE */}
      <section className="py-5" style={{ backgroundColor: "#F8FAFC" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className={`fw-bold mb-3 ${isMobile ? "h4" : "display-6"}`} style={{ color: "#047857" }}>
              <FaPlayCircle className="me-2" style={{ color: "#10B981" }} />
              {isMobile ? "Watch & Learn" : "Watch Our Success Stories"}
            </h2>
            <p className={`text-muted mb-4 ${isMobile ? "small px-3" : "lead"}`}>
              {isMobile ? 
                "See our students in action and hear their experiences" : 
                "See real student experiences, campus facilities, and expert insights in action"
              }
            </p>
          </div>

          {/* MAIN FEATURED VIDEO - Desktop Only */}
          <div className="d-none d-lg-block mb-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="position-relative rounded-4 overflow-hidden shadow-lg"
              style={{ 
                background: "linear-gradient(135deg, #047857, #059669)",
                border: "4px solid white",
                boxShadow: "0 20px 40px rgba(5, 150, 105, 0.2)"
              }}
            >
              <Row className="align-items-center g-0">
                <Col lg={8}>
                  <div 
                    className="position-relative cursor-pointer"
                    onClick={() => openYouTubeVideo(activeVideo.youtubeId)}
                    style={{ 
                      aspectRatio: "16/9",
                      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${activeVideo.thumbnail}) center/cover`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <div className="text-center">
                      <div className="mb-3">
                        <div style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(16, 185, 129, 0.9)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                          <FaPlayCircle size={36} color="white" />
                        </div>
                      </div>
                      <p className="text-white fw-semibold mb-0" style={{ fontSize: "1.1rem" }}>
                        Click to watch on YouTube
                      </p>
                    </div>
                    <div className="position-absolute top-3 start-3">
                      <span className="badge bg-danger px-3 py-2">
                        <FaYoutube className="me-1" />
                        YouTube
                      </span>
                    </div>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="p-4 p-lg-5 text-white h-100">
                    <h3 className="fw-bold mb-3">{activeVideo.title}</h3>
                    <p className="opacity-90 mb-4">{activeVideo.description}</p>
                    <div className="d-flex align-items-center mb-4">
                      <div className="me-4">
                        <span className="d-block fw-bold" style={{ fontSize: "1.2rem" }}>
                          {activeVideo.duration}
                        </span>
                        <small className="opacity-75">Duration</small>
                      </div>
                      <div>
                        <span className="d-block fw-bold" style={{ fontSize: "1.2rem" }}>
                          {activeVideo.views}
                        </span>
                        <small className="opacity-75">Views</small>
                      </div>
                    </div>
                    {activeVideo.featured && (
                      <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                        🔥 Featured Video
                      </span>
                    )}
                    <div className="mt-4">
                      <Button
                        variant="light"
                        className="rounded-pill px-4 py-2 fw-semibold"
                        onClick={() => openYouTubeVideo(activeVideo.youtubeId)}
                      >
                        <FaYoutube className="me-2" />
                        Watch Full Video
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </motion.div>
          </div>

          {/* VIDEO CAROUSEL SECTION */}
          <div className="position-relative">
            <div className={`d-flex ${isMobile ? "flex-column" : "justify-content-between align-items-center"} mb-4`}>
              <div className={isMobile ? "text-center mb-3" : ""}>
                <h3 className={`fw-bold ${isMobile ? "h5 mb-1" : "mb-1"}`} style={{ color: "#047857" }}>
                  {isMobile ? "More Videos" : "Explore More Videos"}
                </h3>
                <p className={`opacity-75 ${isMobile ? "small" : ""}`}>
                  {isMobile ? "Swipe to see more videos" : "Browse through our video collection"}
                </p>
              </div>
              {!isMobile && (
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted small">Total: {videos.length} videos</span>
                  {/* <Button
                    as={Link}
                    to="/videos"
                    variant="outline-success"
                    className="rounded-pill px-4 py-2"
                  >
                    View All Videos
                  </Button> */}
                </div>
              )}
            </div>

            {/* Desktop Arrows */}
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="outline-success"
              onClick={() => scroll(videosScrollRef, "left")}
              style={{ 
                width: "45px", 
                height: "45px", 
                borderColor: "#047857", 
                color: "#047857",
                backgroundColor: "white"
              }}
            >
              <FaArrowLeft />
            </Button>

            {/* Mobile Arrows */}
            <Button
              className="position-absolute start-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="outline-success"
              onClick={() => scroll(videosScrollRef, "left")}
              style={{ 
                width: "35px", 
                height: "35px", 
                borderColor: "#047857", 
                color: "#047857",
                backgroundColor: "white"
              }}
            >
              <FaChevronLeft size={14} />
            </Button>

            {/* VIDEO CARDS CONTAINER */}
            <div
              ref={videosScrollRef}
              className="d-flex gap-3 gap-md-4 overflow-auto px-2 py-3"
              style={{ 
                scrollBehavior: "smooth", 
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex-shrink-0"
                  style={{ 
                    width: isMobile ? "280px" : "320px",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    handleVideoClick(video);
                    if (isMobile) openYouTubeVideo(video.youtubeId);
                  }}
                >
                  <Card 
                    className="border-0 shadow-sm h-100 overflow-hidden"
                    style={{ 
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      border: activeVideo.id === video.id ? "2px solid #10B981" : "2px solid transparent"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    {/* Video Thumbnail */}
                    <div className="position-relative" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      {/* Play Button Overlay */}
                      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{ 
                          backgroundColor: "rgba(0,0,0,0.3)",
                          transition: "background-color 0.3s ease"
                        }}
                      >
                        <div className="text-center">
                          <div style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(16, 185, 129, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 10px"
                          }}>
                            <FaPlayCircle size={22} color="white" />
                          </div>
                          <small className="text-white fw-semibold">Watch</small>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="position-absolute bottom-3 end-3">
                        <span className="badge bg-dark bg-opacity-75 px-2 py-1">
                          {video.duration}
                        </span>
                      </div>
                      
                      {/* Featured Badge */}
                      {video.featured && (
                        <div className="position-absolute top-3 start-3">
                          <span className="badge bg-warning text-dark px-2 py-1">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Card.Body className={`${isMobile ? "p-3" : "p-4"}`}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className={`fw-bold mb-0 ${isMobile ? "h6" : ""}`} style={{ color: "#047857" }}>
                          {isMobile && video.title.length > 30 ? 
                            `${video.title.substring(0, 30)}...` : video.title}
                          {!isMobile && video.title}
                        </h5>
                        <FaYoutube className="text-danger" size={isMobile ? 16 : 18} />
                      </div>
                      
                      <p className="text-muted mb-3" style={{ 
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        lineHeight: "1.4"
                      }}>
                        {isMobile && video.description.length > 60 ? 
                          `${video.description.substring(0, 60)}...` : video.description}
                        {!isMobile && video.description}
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted">
                            <FaPlayCircle className="me-1" size={12} />
                            {video.views} views
                          </small>
                        </div>
                        <Button
                          size="sm"
                          variant="outline-success"
                          className="rounded-pill px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            openYouTubeVideo(video.youtubeId);
                          }}
                        >
                          Watch
                        </Button>
                      </div>
                    </Card.Body>
                    
                    {/* Mobile Only - Full Width Button */}
                    {isMobile && (
                      <div className="px-3 pb-3">
                        <Button
                          variant="success"
                          className="w-100 rounded-pill py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            openYouTubeVideo(video.youtubeId);
                          }}
                        >
                          <FaPlayCircle className="me-2" />
                          Play Video
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Desktop Arrows */}
            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-none d-md-flex"
              variant="outline-success"
              onClick={() => scroll(videosScrollRef, "right")}
              style={{ 
                width: "45px", 
                height: "45px", 
                borderColor: "#047857", 
                color: "#047857",
                backgroundColor: "white"
              }}
            >
              <FaArrowRight />
            </Button>

            {/* Mobile Arrows */}
            <Button
              className="position-absolute end-0 top-50 translate-middle-y z-3 rounded-circle d-md-none"
              variant="outline-success"
              onClick={() => scroll(videosScrollRef, "right")}
              style={{ 
                width: "35px", 
                height: "35px", 
                borderColor: "#047857", 
                color: "#047857",
                backgroundColor: "white"
              }}
            >
              <FaChevronRight size={14} />
            </Button>
          </div>

          {/* Mobile Scroll Indicator */}
          {isMobile && (
            <div className="text-center mt-4">
              <small className="text-muted d-block mb-2">
                Swipe or use arrows to browse videos
              </small>
              <div className="d-flex justify-content-center align-items-center gap-2">
                {videos.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: activeVideo.id === videos[index].id ? "#10B981" : "#D1D5DB"
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mobile Call to Action */}
          {isMobile && (
            <div className="text-center mt-4">
              {/* <Button
                variant="outline-success"
                className="rounded-pill px-4 py-2"
                as={Link}
                to="/videos"
              >
                View All Videos
              </Button> */}
            </div>
          )}

          {/* Subscribe Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-center mt-5 p-4 rounded-3 ${isMobile ? "mx-2" : ""}`}
            style={{ 
              background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
              border: "1px solid #FBBF24"
            }}
          >
            <h5 className={`fw-bold mb-3 ${isMobile ? "h6" : ""}`} style={{ color: "#92400E" }}>
              <FaYoutube className="me-2 text-danger" />
              Subscribe to Our YouTube Channel
            </h5>
            <p className={`mb-3 ${isMobile ? "small" : ""}`} style={{ color: "#92400E" }}>
              Get regular updates, tutorials, and student success stories
            </p>
            <Button
              variant="danger"
              className="rounded-pill px-4 py-2"
              onClick={() => window.open('https://www.youtube.com/@EdTechTrainingCenter', '_blank')}
            >
              <FaYoutube className="me-2" />
              Subscribe Now
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* READY TO START SECTION - RESPONSIVE */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`text-center ${isMobile ? "p-3" : "p-5"}`}
            style={{ 
              background: "linear-gradient(135deg, #047857, #059669)",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)"
            }}
          >
            <h2 className={`fw-bold mb-3 text-white ${isMobile ? "h4" : ""}`}>
              Ready To Start Your African Tech Journey?
            </h2>
            <p className={`lead mb-4 text-white opacity-90 ${isMobile ? "small" : ""}`}>
              Join hundreds of successful African graduates with our affordable internship program
            </p>
            
            <div className="d-flex justify-content-center align-items-center mb-4">
              <div className="me-3 me-md-4">
                <span style={{ 
                  textDecoration: "line-through", 
                  color: "#FEF3C7",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  fontWeight: "600"
                }}>
                  45,000 FRW
                </span>
              </div>
              <div>
                <span style={{ 
                  fontSize: isMobile ? "2rem" : "2.5rem", 
                  fontWeight: "800",
                  color: "white"
                }}>
                  30,000 FRW
                </span>
              </div>
            </div>
            
            <p className="text-white opacity-75 mb-4" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
              ⏰ Limited spots available for next intake
            </p>
            
            <div className={`d-flex ${isMobile ? "flex-column" : "flex-column flex-md-row"} justify-content-center gap-3 gap-md-4`}>
              <Button
                as={Link}
                to="/apply"
                size="lg"
                className={`rounded-pill ${isMobile ? "w-100 py-2" : "py-3 px-5"}`}
                style={{ 
                  backgroundColor: "#10B981", 
                  border: "none",
                  fontWeight: "600",
                  fontSize: isMobile ? "1rem" : "1.1rem"
                }}
              >
                Apply Now 🚀
              </Button>
              
              <Button
                as={Link}
                to="/programs"
                variant="outline-light"
                size="lg"
                className={`rounded-pill ${isMobile ? "w-100 py-2" : "py-3 px-5"}`}
                style={{ 
                  border: "2px solid white",
                  color: "white",
                  fontWeight: "600",
                  fontSize: isMobile ? "1rem" : "1.1rem"
                }}
              >
                View All Programs
              </Button>
            </div>
            
            <p className="mt-4 small text-white opacity-75" style={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}>
              ✅ 100% Practical Training • ✅ Certificate Included • ✅ African Job Placement Support
            </p>
          </motion.div>
        </Container>
      </section>

      {/* AFRICAN PARTNERS SECTION - RESPONSIVE */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-4">
            <h3 className={`fw-bold ${isMobile ? "h5" : ""}`} style={{ color: "#047857" }}>
              Trusted Across Africa
            </h3>
            <p className={`text-muted ${isMobile ? "small" : ""}`}>Students from across East Africa trust our programs</p>
          </div>
          <Row className="justify-content-center text-center">
            {["🇷🇼", "🇺🇬", "🇰🇪", "🇹🇿", "🇧🇮"].map((flag, index) => (
              <Col xs={4} sm={2} md={2} key={index} className="mb-3">
                <div className="p-2 p-md-3">
                  <div style={{ fontSize: isMobile ? "1.5rem" : "2rem", color: "#10B981" }}>{flag}</div>
                  <h5 className="fw-bold mt-2" style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                    {["Rwanda", "Uganda", "Kenya", "Tanzania", "Burundi"][index]}
                  </h5>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <Container className={`bg-success mt-5 p-3 p-md-4 rounded-2 ${isMobile ? "mx-2" : ""}`}>
          <Row className="align-items-center">
            <Col md={8}>
              <h5 className={`fw-bold text-white mb-0 ${isMobile ? "h6" : ""}`}>
                🇷🇼 Building Africa's Tech Future Together
              </h5>
              <small className="text-white opacity-75 d-none d-sm-block">
                Contributing to Africa's vision of becoming a digital hub
              </small>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button
                as={Link}
                to="/contact"
                variant="outline-light"
                size={isMobile ? "sm" : "sm"}
                className="rounded-pill"
              >
                Partner With Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;