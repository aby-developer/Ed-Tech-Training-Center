// src/pages/Admin/AdminLogin.jsx
import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppNavbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      toast.success("Login successful 🎉");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar included */}
      <AppNavbar />

      {/* Login Form */}
      <Container fluid className="bg-light min-vh-100 d-flex align-items-center">
        <Row className="w-100 justify-content-center">
          <Col md={5} lg={4}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <img src="/logo.png" alt="Logo" height="60" className="mb-2" />
                  <h4 className="fw-bold text-primary">Admin Login</h4>
                  <p className="text-muted small">
                    Access your dashboard securely
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 rounded-pill py-2 fw-semibold"
                    style={{ backgroundColor: "#10B981", border: "none" }}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <p className="text-center text-muted small mt-3">
              © {new Date().getFullYear()} Ed Tech Solutions
            </p>
          </Col>
        </Row>
      </Container>

      {/* Footer included */}
      <Footer />

      {/* Toast notifications */}
      <ToastContainer position="top-end" className="p-3" autoClose={3000} />
    </>
  );
};

export default AdminLogin;
