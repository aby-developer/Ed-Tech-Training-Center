import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AppNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{ backgroundColor: darkMode ? "#1E1E2F" : "#F9FAFB" }}
      className="shadow-sm py-2"
      variant={darkMode ? "dark" : "light"}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src="/logo.png" alt="EdTech Solutions" height="45" />
          <span
            style={{
              color: darkMode ? "#10B981" : "#1E3A8A",
              fontWeight: "700",
              fontSize: "1.3rem"
            }}
          >
            Ed Tech Solutions
          </span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-4 fw-semibold">
            <Nav.Link as={Link} to="/" style={{ color: darkMode ? "#fff" : "#1E3A8A" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: darkMode ? "#fff" : "#1E3A8A" }}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/programs" style={{ color: darkMode ? "#fff" : "#1E3A8A" }}>
              Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ color: darkMode ? "#fff" : "#1E3A8A" }}>
              Contact
            </Nav.Link>
            <Button
              as={Link}
              to="/apply"
              style={{ backgroundColor: "#10B981", border: "none" }}
              className="px-4 rounded-pill"
            >
              Apply Now
            </Button>

   


            {/* Dark Mode Toggle */}
            <Form.Check 
              type="switch"
              id="dark-mode-toggle"
              label=""
              className="ms-3"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
