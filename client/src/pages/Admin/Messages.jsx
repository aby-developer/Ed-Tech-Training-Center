// client/src/pages/admin/Messages.jsx
import { useState, useEffect } from "react";
import { Card, Table, Button, Badge, Form, InputGroup, Dropdown, Row, Col, Modal, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsFilter,
  BsTrash,
  BsEye,
  BsEnvelope,
  BsPerson,
  BsCalendar,
  BsHouseDoor,
  BsPeople,
  BsChatDots,
  BsGear,
  BsPersonCircle,
  BsBell,
  BsReply,
  BsDownload,
  BsXCircle,
  BsCheckCircle,
  BsTelephone
} from "react-icons/bs";
import api from "../../services/api";

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const primaryColor = "#4361ee";
  const lightBg = "#f8f9fa";

  // Navigation buttons - same as Applications.jsx
  const navigationButtons = [
    {
      title: "Dashboard",
      icon: <BsHouseDoor size={18} />,
      path: "/admin/dashboard",
      description: "Overview"
    },
    {
      title: "Applications",
      icon: <BsPeople size={18} />,
      path: "/admin/applications",
      count: 0, // You can fetch this count if needed
      description: "Manage"
    },
    {
      title: "Messages",
      icon: <BsChatDots size={18} />,
      path: "/admin/messages",
      active: true,
      count: messages.filter(m => !m.isRead).length,
      description: "View"
    }
    // {
    //   title: "Settings",
    //   icon: <BsGear size={18} />,
    //   path: "/admin/settings",
    //   description: "System"
    // }
  ];

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }
        
        const response = await api.get("/admin/messages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("Messages data:", response.data);
        
        let msgs = [];
        if (response.data.success) {
          msgs = response.data.messages || [];
        } else if (Array.isArray(response.data)) {
          msgs = response.data;
        }
        
        setMessages(msgs);
        setFilteredMessages(msgs);
        
      } catch (err) {
        console.error("Error fetching messages:", err);
        
        if (err.response?.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }
        
        setError("Failed to fetch messages. Please check your connection.");
        setMessages([]);
        setFilteredMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [navigate]);

  // Filter messages
  useEffect(() => {
    let filtered = messages;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(msg =>
        msg.name?.toLowerCase().includes(term) ||
        msg.email?.toLowerCase().includes(term) ||
        msg.subject?.toLowerCase().includes(term) ||
        msg.message?.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(msg => 
        statusFilter === "unread" ? !msg.isRead : msg.isRead
      );
    }
    
    setFilteredMessages(filtered);
  }, [searchTerm, statusFilter, messages]);

  // Mark message as read
  const handleMarkAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.patch(`/admin/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, isRead: true } : msg
      ));
      
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(prev => ({ ...prev, isRead: true }));
      }
      
      alert("Message marked as read");
    } catch (err) {
      console.error("Error marking message as read:", err);
      alert("Failed to mark message as read.");
    }
  };

  // Mark message as unread
  const handleMarkAsUnread = async (messageId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.patch(`/admin/messages/${messageId}/unread`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(prev => prev.map(msg =>
        msg._id === messageId ? { ...msg, isRead: false } : msg
      ));
      
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(prev => ({ ...prev, isRead: false }));
      }
      
      alert("Message marked as unread");
    } catch (err) {
      console.error("Error marking message as unread:", err);
      alert("Failed to mark message as unread.");
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }
    
    try {
      setDeleting(true);
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(prev => prev.filter(msg => msg._id !== messageId));
      
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
        setShowModal(false);
      }
      
      alert("Message deleted successfully");
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message.");
    } finally {
      setDeleting(false);
    }
  };

  // Handle view details
  const handleViewDetails = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    
    // Mark as read when viewing details
    if (!message.isRead) {
      handleMarkAsRead(message._id);
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Modal Component
  const MessageDetailsModal = ({ message, show, onHide }) => {
    if (!message) return null;
    
    return (
      <Modal 
        show={show} 
        onHide={onHide} 
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            Message Details
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          {/* Sender Info */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: 50, 
                height: 50, 
                backgroundColor: `${primaryColor}20`,
                color: primaryColor,
                fontSize: '1rem'
              }}
            >
              <BsPerson size={20} />
            </div>
            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1">{message.name || "Unknown Sender"}</h5>
              <p className="text-muted mb-0">{message.email}</p>
              {message.phone && (
                <small className="text-muted d-flex align-items-center gap-1 mt-1">
                  <BsTelephone size={12} />
                  {message.phone}
                </small>
              )}
            </div>
            <Badge 
              bg={message.isRead ? "secondary" : "success"}
              className="px-3 py-2"
            >
              {message.isRead ? "Read" : "New"}
            </Badge>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Subject</h6>
            <div className="bg-light rounded-2 p-2">
              <p className="fw-medium mb-0">{message.subject || "No Subject"}</p>
            </div>
          </div>

          {/* Message Content */}
          <div className="mb-4">
            <h6 className="fw-semibold mb-2">Message</h6>
            <div className="bg-light rounded-2 p-2">
              <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {message.message || "No message content"}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="bg-light rounded-2 p-2">
                <h6 className="fw-semibold mb-2">Message Details</h6>
                <div className="mb-2">
                  <small className="text-muted d-block mb-1">Received</small>
                  <div className="fw-medium d-flex align-items-center gap-1">
                    <BsCalendar size={14} />
                    {message.createdAt ? new Date(message.createdAt).toLocaleDateString() : "N/A"}
                  </div>
                </div>
                <div className="mb-0">
                  <small className="text-muted d-block mb-1">Status</small>
                  <div className="fw-medium">
                    {message.isRead ? "Read" : "Unread"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="bg-light rounded-2 p-2 h-100">
                <h6 className="fw-semibold mb-2">Quick Actions</h6>
                <div className="d-flex flex-column gap-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleReply(message.email)}
                  >
                    <BsReply />
                    Reply via Email
                  </Button>
                  {message.isRead ? (
                    <Button 
                      variant="outline-warning" 
                      size="sm"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleMarkAsUnread(message._id)}
                    >
                      <BsCheckCircle />
                      Mark as Unread
                    </Button>
                  ) : (
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleMarkAsRead(message._id)}
                    >
                      <BsCheckCircle />
                      Mark as Read
                    </Button>
                  )}
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    className="d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleDeleteMessage(message._id)}
                    disabled={deleting}
                  >
                    <BsTrash />
                    Delete Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: lightBg }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: lightBg }}>
      {/* HEADER */}
      <div className="bg-white border-bottom sticky-top">
        <div className="container-fluid px-3 py-2">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ 
                  width: 36, 
                  height: 36, 
                  backgroundColor: primaryColor,
                  color: 'white',
                  fontSize: '0.9rem'
                }}
              >
                ET
              </div>
              <div>
                <h6 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>Messages</h6>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {messages.length} total messages • {messages.filter(m => !m.isRead).length} unread
                </small>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-1">
              {/* Profile Dropdown - same as Applications.jsx */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline"
                  className="p-1"
                  style={{ border: 'none', width: '36px', height: '36px' }}
                >
                  <BsPersonCircle size={20} color={primaryColor} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item onClick={() => navigate("/admin/profile")}>
                    Profile
                  </Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* NAVIGATION - Same as Applications.jsx */}
          <div className="d-lg-none">
            <div className="d-flex justify-content-between bg-light rounded-3 p-1">
              {navigationButtons.map((nav, index) => (
                <Button
                  key={index}
                  variant={nav.active ? "primary" : "outline"}
                  className="d-flex flex-column align-items-center justify-content-center py-1 px-2"
                  onClick={() => navigate(nav.path)}
                  style={{
                    backgroundColor: nav.active ? primaryColor : 'transparent',
                    border: 'none',
                    color: nav.active ? 'white' : '#6c757d',
                    borderRadius: '8px',
                    flex: 1,
                    margin: '0 2px',
                    minHeight: '60px'
                  }}
                >
                  <div className="position-relative">
                    {nav.icon}
                    {nav.count !== undefined && nav.count > 0 && (
                      <Badge 
                        bg={nav.active ? "light" : "danger"}
                        text={nav.active ? "dark" : "white"}
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: "0.6rem", padding: "0.1rem 0.3rem" }}
                      >
                        {nav.count}
                      </Badge>
                    )}
                  </div>
                  <small className="mt-1" style={{ fontSize: '0.7rem', lineHeight: '1.1' }}>
                    {nav.title}
                  </small>
                  <small className="text-muted opacity-75" style={{ fontSize: '0.6rem' }}>
                    {nav.description}
                  </small>
                </Button>
              ))}
            </div>
          </div>

          {/* DESKTOP NAVIGATION - Same as Applications.jsx */}
          <div className="d-none d-lg-flex justify-content-center mt-2">
            <div className="d-flex gap-1 bg-light rounded-3 p-1">
              {navigationButtons.map((nav, index) => (
                <Button
                  key={index}
                  variant={nav.active ? "primary" : "outline"}
                  className="d-flex align-items-center gap-2 px-3 py-1"
                  onClick={() => navigate(nav.path)}
                  style={{
                    backgroundColor: nav.active ? primaryColor : 'transparent',
                    border: 'none',
                    color: nav.active ? 'white' : '#6c757d',
                    borderRadius: '6px',
                    fontSize: '0.85rem'
                  }}
                >
                  {nav.icon}
                  <span>{nav.title}</span>
                  {nav.count !== undefined && nav.count > 0 && (
                    <Badge 
                      bg={nav.active ? "light" : "danger"}
                      text={nav.active ? "dark" : "white"}
                      style={{ fontSize: "0.65rem", padding: "0.1rem 0.3rem" }}
                    >
                      {nav.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container-fluid px-3 py-3">
        {/* SEARCH AND FILTERS - Same style as Applications.jsx */}
        <Card className="border-0 shadow-sm mb-3">
          <Card.Body className="p-3">
            <Row className="g-2 align-items-center">
              <Col xs={12} md={8}>
                <InputGroup size="sm">
                  <InputGroup.Text style={{ backgroundColor: lightBg, borderRight: 0 }}>
                    <BsSearch size={14} color="#6c757d" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by name, email, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderLeft: 0, backgroundColor: lightBg, fontSize: '0.85rem' }}
                  />
                </InputGroup>
              </Col>
              
              <Col xs={12} md={4}>
                <div className="d-flex gap-1">
                  <Dropdown className="flex-grow-1">
                    <Dropdown.Toggle 
                      variant="outline-secondary" 
                      size="sm"
                      className="d-flex align-items-center justify-content-center gap-1 w-100"
                      style={{ fontSize: '0.85rem' }}
                    >
                      <BsFilter size={12} />
                      {statusFilter === 'all' ? 'All Messages' : statusFilter === 'unread' ? 'Unread' : 'Read'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setStatusFilter("all")}>All Messages</Dropdown.Item>
                      <Dropdown.Item onClick={() => setStatusFilter("unread")}>Unread Only</Dropdown.Item>
                      <Dropdown.Item onClick={() => setStatusFilter("read")}>Read Only</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '40px' }}
                  >
                    <BsDownload size={14} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ERROR MESSAGE */}
        {error && (
          <Alert variant="danger" className="mb-3">
            <BsXCircle className="me-2" />
            {error}
          </Alert>
        )}

        {/* NO MESSAGES */}
        {!loading && messages.length === 0 && !error && (
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-5">
              <BsEnvelope size={48} className="text-muted mb-3" />
              <h5 className="fw-bold mb-2">No Messages Yet</h5>
              <p className="text-muted mb-0">When visitors contact you, messages will appear here.</p>
            </Card.Body>
          </Card>
        )}

        {/* MESSAGES TABLE - DESKTOP */}
        {!loading && messages.length > 0 && (
          <div className="d-none d-lg-block">
            <Card className="border-0 shadow-sm">
              <div className="table-responsive">
                <Table hover className="mb-0" style={{ fontSize: '0.9rem' }}>
                  <thead style={{ backgroundColor: lightBg }}>
                    <tr>
                      <th className="py-2 px-3 fw-semibold border-0">SENDER</th>
                      <th className="py-2 px-3 fw-semibold border-0">SUBJECT</th>
                      <th className="py-2 px-3 fw-semibold border-0">MESSAGE</th>
                      <th className="py-2 px-3 fw-semibold border-0">DATE</th>
                      <th className="py-2 px-3 fw-semibold border-0">STATUS</th>
                      <th className="py-2 px-3 fw-semibold border-0 text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((msg) => (
                      <tr 
                        key={msg._id} 
                        className={`align-middle ${!msg.isRead ? 'bg-light' : ''}`}
                      >
                        <td className="py-2 px-3 border-top">
                          <div className="d-flex align-items-center gap-2">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ 
                                width: 36, 
                                height: 36, 
                                backgroundColor: `${primaryColor}20`,
                                color: primaryColor,
                                fontSize: '0.9rem'
                              }}
                            >
                              {msg.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>
                                {msg.name || "Unknown"}
                                {!msg.isRead && (
                                  <Badge 
                                    bg="success" 
                                    className="ms-2"
                                    style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}
                                  >
                                    New
                                  </Badge>
                                )}
                              </div>
                              <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                {msg.email || 'No email'}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="fw-medium" style={{ fontSize: '0.9rem' }}>
                            {msg.subject || "No Subject"}
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="text-muted" style={{ 
                            fontSize: '0.85rem',
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {msg.message || "No message content"}
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="fw-medium" style={{ fontSize: '0.9rem' }}>
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <Badge 
                            bg={msg.isRead ? "secondary" : "success"}
                            className="px-2 py-1"
                            style={{ fontSize: '0.8rem', borderRadius: '12px' }}
                          >
                            {msg.isRead ? "Read" : "Unread"}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 border-top text-end">
                          <div className="d-flex gap-1 justify-content-end">
                            <Button 
                              variant="outline-info" 
                              size="sm"
                              className="p-1"
                              title="View Message"
                              onClick={() => handleViewDetails(msg)}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <BsEye size={14} />
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              className="p-1"
                              title="Reply"
                              onClick={() => handleReply(msg.email)}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <BsReply size={14} />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              className="p-1"
                              title="Delete"
                              onClick={() => handleDeleteMessage(msg._id)}
                              disabled={deleting}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <BsTrash size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </div>
        )}

        {/* MESSAGES CARDS - MOBILE */}
        {!loading && messages.length > 0 && (
          <div className="d-lg-none">
            <div className="d-flex flex-column gap-2">
              {filteredMessages.map((msg) => (
                <Card 
                  key={msg._id}
                  className="border-0 shadow-sm"
                  style={{ 
                    borderLeft: !msg.isRead ? `4px solid ${primaryColor}` : '4px solid transparent',
                    backgroundColor: !msg.isRead ? `${primaryColor}05` : 'white'
                  }}
                >
                  <Card.Body className="p-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ 
                            width: 36, 
                            height: 36, 
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                            fontSize: '0.9rem'
                          }}
                        >
                          {msg.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>
                            {msg.name || "Unknown"}
                            {!msg.isRead && (
                              <Badge 
                                bg="success" 
                                className="ms-2"
                                style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}
                              >
                                New
                              </Badge>
                            )}
                          </div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            {msg.email || 'No email'}
                          </small>
                        </div>
                      </div>
                      <Badge 
                        bg={msg.isRead ? "secondary" : "success"}
                        className="px-2 py-1"
                        style={{ fontSize: '0.7rem', borderRadius: '12px' }}
                      >
                        {msg.isRead ? "Read" : "New"}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <div className="fw-medium mb-1" style={{ fontSize: '0.85rem' }}>
                        {msg.subject || "No Subject"}
                      </div>
                      <div className="text-muted mb-2" style={{ 
                        fontSize: '0.8rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {msg.message || "No message content"}
                      </div>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                        <BsCalendar className="me-1" />
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Unknown date'}
                      </small>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          className="p-1"
                          title="View Message"
                          onClick={() => handleViewDetails(msg)}
                          style={{ width: '30px', height: '30px' }}
                        >
                          <BsEye size={12} />
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="p-1"
                          title="Reply"
                          onClick={() => handleReply(msg.email)}
                          style={{ width: '30px', height: '30px' }}
                        >
                          <BsReply size={12} />
                        </Button>
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        className="p-1"
                        title="Delete"
                        onClick={() => handleDeleteMessage(msg._id)}
                        disabled={deleting}
                        style={{ width: '30px', height: '30px' }}
                      >
                        <BsTrash size={12} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Message Details Modal */}
        <MessageDetailsModal
          message={selectedMessage}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>

      {/* MOBILE BOTTOM SPACER */}
      <div className="d-lg-none" style={{ height: '60px' }}></div>
    </div>
  );
};

export default Messages;