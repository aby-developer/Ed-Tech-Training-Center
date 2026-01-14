import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success("✅ Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("❌ Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: "#1E3A8A" }}>
          Contact Us
        </h1>
        <p className="text-muted">
          We’re here to help you start your journey in technology.
        </p>
      </div>

      <Row className="g-4">
        {/* SEND MESSAGE */}
        <Col md={6}>
          <Card className="p-4 shadow-sm h-100">
            <h4 className="fw-bold mb-3">Send Message</h4>

            <Form onSubmit={sendMessage}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Message"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                disabled={loading}
                style={{ backgroundColor: "#10B981", border: "none" }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* CONTACT INFO */}
        <Col md={6}>
          <Card
            className="p-4 shadow-sm h-100 text-white"
            style={{ backgroundColor: "#10B981" }}
          >
            <h4 className="fw-bold mb-4">Contact Information</h4>

            <p>
              <FaMapMarkerAlt className="me-2" />
              Kigali - Kicukiro Sonatube - Inindi House
            </p>

            <p>
              <a
                href="tel:+250789402303"
                className="text-white text-decoration-none"
              >
                <FaPhoneAlt className="me-2" /> +250 789 402 303
              </a>
            </p>

            <p>
              <a
                href="mailto:edtechsolutions72@gmail.com"
                className="text-white text-decoration-none"
              >
                <FaEnvelope className="me-2" /> edtechsolutions72@gmail.com
              </a>
            </p>

            <p>
              <FaClock className="me-2" /> Mon - Fri: 8AM - 5PM
            </p>

            <div className="mt-4">
              <h6 className="fw-bold">Follow Us</h6>
              <div className="d-flex gap-3 mt-2">
                <FaInstagram size={22} />
                <FaLinkedin size={22} />
                <FaYoutube size={22} />
                <FaTiktok size={22} />
                <FaXTwitter size={22} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>


      {/* MAP */}
      <div className="mt-5 shadow-sm rounded overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4690906048304!2d30.100819776001977!3d-1.966278936749529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca79bea85f843%3A0x10e9fa9ee8d8da4e!2sEdTech%20Solutions%20Ltd!5e0!3m2!1sen!2srw!4v1768047371919!5m2!1sen!2srw"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Ready to Start Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mt-5 py-5"
              style={{ backgroundColor: "#96eae1", borderRadius: "12px" }}
            >
              <h2 style={{ color: "#1E3A8A", fontWeight: "700" }}>Ready To Start Your Journey in Technology?</h2>
              <p style={{ color: "#14B8A6", fontSize: "1.2rem" }}>
                <span style={{ textDecoration: "line-through", marginRight: "10px" }}>45000 FRW</span>
                <span style={{ fontWeight: "700" }}>30000 FRW</span>
              </p>
              <Button href="/apply" style={{ backgroundColor: "#10B981", border: "none", padding: "12px 30px", fontSize: "1.1rem" }}>
                Apply Now
              </Button>
            </motion.div>
    </Container>
  );
};

export default Contact;
