import { useState, useEffect } from "react";
import { Card, Table, Button, Badge, Form, InputGroup, Dropdown, Row, Col, Modal, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsFilter,
  BsDownload,
  BsEnvelope,
  BsTelephone,
  BsThreeDotsVertical,
  BsCheckCircle,
  BsClockHistory,
  BsXCircle,
  BsEye,
  BsPerson,
  BsEnvelopeFill,
  BsPhone,
  BsHouseDoor,
  BsPeople,
  BsChatDots,
  BsGear,
  BsPersonCircle
} from "react-icons/bs";
import api from "../../services/api";

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const primaryColor = "#4361ee";
  const lightBg = "#f8f9fa";

  // Navigation buttons
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
      active: true,
      count: applications.length,
      description: "Manage"
    },
    {
      title: "Messages",
      icon: <BsChatDots size={18} />,
      path: "/admin/messages",
      description: "View"
    }
    // {
    //   title: "Settings",
    //   icon: <BsGear size={18} />,
    //   path: "/admin/settings",
    //   description: "System"
    // }
  ];

  // Fetch applications from your API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }
        
        const response = await api.get("/admin/applications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("Applications data:", response.data); // Debug
        
        // Your backend returns array directly
        const apps = Array.isArray(response.data) ? response.data : [];
        
        // Format applications (add status field since your model doesn't have it)
        const formattedApps = apps.map(app => ({
          _id: app._id,
          fullName: app.fullName,
          email: app.email,
          phone: app.phone,
          program: app.program,
          fee: app.fee || 0,
          status: app.status || "pending", // Default since your schema doesn't have status
          appliedDate: app.createdAt,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt
        }));
        
        setApplications(formattedApps);
        setFilteredApplications(formattedApps);
        
      } catch (err) {
        console.error("Error fetching applications:", err);
        
        if (err.response?.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }
        
        setError("Failed to fetch applications. Please check your connection.");
        setApplications([]);
        setFilteredApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  // Filter applications
  useEffect(() => {
    let filtered = applications;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app =>
        app.fullName?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.program?.toLowerCase().includes(term) ||
        app.phone?.includes(searchTerm)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, applications]);

  // Handle status update
  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("adminToken");
      
      // Use your backend endpoint
      await api.patch(`/admin/applications/${appId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update in local state
      setApplications(prev => prev.map(app =>
        app._id === appId ? { ...app, status: newStatus } : app
      ));
      
      if (selectedApp?._id === appId) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
      
      setShowModal(false);
      alert(`Application status updated to ${newStatus}`);
      
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  // Handle application deletion
  const handleDeleteApplication = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/applications/${appId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove from local state
      setApplications(prev => prev.filter(app => app._id !== appId));
      
      if (selectedApp?._id === appId) {
        setSelectedApp(null);
        setShowModal(false);
      }
      
      alert("Application deleted successfully");
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
    }
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: "warning", icon: <BsClockHistory className="me-1" /> },
      accepted: { color: "success", icon: <BsCheckCircle className="me-1" /> },
      rejected: { color: "danger", icon: <BsXCircle className="me-1" /> }
    };
    const cfg = config[status] || config.pending;
    
    return (
      <Badge 
        bg={cfg.color} 
        className="d-inline-flex align-items-center px-2 py-1"
        style={{ fontSize: '0.7rem', borderRadius: '12px' }}
      >
        {cfg.icon}
        {status?.charAt(0)?.toUpperCase() + status?.slice(1) || 'Pending'}
      </Badge>
    );
  };

  const getProgramColor = (program) => {
    const colors = {
      "Software Development": "#4361ee",
      "Networking & Internet Technology": "#3a0ca3",
      "Computer Systems and Architecture": "#f72585",
      "Multimedia Productions": "#4cc9f0",
      "Electronics & Telecommunication": "#7209b7",
      "Electrical Technology": "#4895ef"
    };
    
    for (const [key, color] of Object.entries(colors)) {
      if (program?.includes(key)) return color;
    }
    return "#4361ee";
  };

  // Modal Component
  const ApplicationDetailsModal = ({ application, show, onHide }) => {
    if (!application) return null;
    
    return (
      <Modal 
        show={show} 
        onHide={onHide} 
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            Application Details
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          {/* Program Header */}
          <div className="text-center mb-4">
            <div 
              className="badge mb-2 px-3 py-2"
              style={{ 
                backgroundColor: `${getProgramColor(application.program)}20`,
                color: getProgramColor(application.program),
                fontSize: '0.9rem',
                borderRadius: '12px'
              }}
            >
              {application.program || 'Program'}
            </div>
            <div className="border-bottom pb-3 mb-3"></div>
          </div>

          {/* Applicant Information */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-semibold mb-2 d-flex align-items-center gap-1">
                  <BsPerson size={16} />
                  Personal Information
                </h6>
                
                <div className="bg-light rounded-2 p-2">
                  <div className="mb-2">
                    <small className="text-muted d-block mb-1">Full Name</small>
                    <div className="fw-medium d-flex align-items-center gap-1">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          width: 28, 
                          height: 28, 
                          backgroundColor: `${getProgramColor(application.program)}20`,
                          color: getProgramColor(application.program),
                          fontSize: '0.8rem'
                        }}
                      >
                        {application.fullName?.charAt(0) || 'A'}
                      </div>
                      <span style={{ fontSize: '0.9rem' }}>{application.fullName || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <small className="text-muted d-block mb-1 d-flex align-items-center gap-1">
                      <BsEnvelopeFill size={12} />
                      Email
                    </small>
                    <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{application.email || 'N/A'}</div>
                  </div>
                  
                  <div className="mb-0">
                    <small className="text-muted d-block mb-1 d-flex align-items-center gap-1">
                      <BsPhone size={12} />
                      Phone
                    </small>
                    <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{application.phone || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <h6 className="fw-semibold mb-2">Application Details</h6>
                
                <div className="bg-light rounded-2 p-2 h-100">
                  <div className="mb-2">
                    <small className="text-muted d-block mb-1">Program</small>
                    <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{application.program || 'Not specified'}</div>
                  </div>
                  
                  <div className="mb-2">
                    <small className="text-muted d-block mb-1">Registration Fee</small>
                    <div className="fw-medium" style={{ fontSize: '0.9rem' }}>
                      {application.fee ? `RWF ${application.fee.toLocaleString()}` : 'Free'}
                    </div>
                  </div>
                  
                  <div className="mb-0">
                    <small className="text-muted d-block mb-1">Applied Date</small>
                    <div className="fw-medium" style={{ fontSize: '0.9rem' }}>
                      {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="border-top pt-3">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center gap-1">
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Status:</span>
                {getStatusBadge(application.status)}
              </div>
              <div className="d-flex gap-2 w-100 w-md-auto">
                <Button 
                  variant="success" 
                  size="sm"
                  className="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleStatusUpdate(application._id, "accepted")}
                  disabled={updating}
                  style={{ fontSize: '0.85rem' }}
                >
                  <BsCheckCircle className="me-1" />
                  Accept
                </Button>
                <Button 
                  variant="danger"
                  size="sm"
                  className="flex-grow-1 flex-md-grow-0"
                  onClick={() => handleStatusUpdate(application._id, "rejected")}
                  disabled={updating}
                  style={{ fontSize: '0.85rem' }}
                >
                  <BsXCircle className="me-1" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: lightBg }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading applications...</span>
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
                <h6 className="fw-bold mb-0" style={{ fontSize: '1rem' }}>Applications</h6>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {applications.length} total applications
                </small>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-1">
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

          {/* NAVIGATION */}
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

          {/* DESKTOP NAVIGATION */}
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
        {/* SEARCH AND FILTERS */}
        <Card className="border-0 shadow-sm mb-3">
          <Card.Body className="p-3">
            <Row className="g-2 align-items-center">
              <Col xs={12} md={8}>
                <InputGroup size="sm">
                  <InputGroup.Text style={{ backgroundColor: lightBg, borderRight: 0 }}>
                    <BsSearch size={14} color="#6c757d" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search by name, email, phone, or program..."
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
                      {statusFilter === 'all' ? 'All Status' : statusFilter}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setStatusFilter("all")}>All Status</Dropdown.Item>
                      <Dropdown.Item onClick={() => setStatusFilter("pending")}>Pending</Dropdown.Item>
                      <Dropdown.Item onClick={() => setStatusFilter("accepted")}>Accepted</Dropdown.Item>
                      <Dropdown.Item onClick={() => setStatusFilter("rejected")}>Rejected</Dropdown.Item>
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
            {error}
          </Alert>
        )}

        {/* NO APPLICATIONS */}
        {!loading && applications.length === 0 && !error && (
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-5">
              <BsPeople size={48} className="text-muted mb-3" />
              <h5 className="fw-bold mb-2">No Applications Yet</h5>
              <p className="text-muted mb-0">When students apply for internships, they will appear here.</p>
            </Card.Body>
          </Card>
        )}

        {/* APPLICATIONS TABLE - DESKTOP */}
        {!loading && applications.length > 0 && (
          <div className="d-none d-lg-block">
            <Card className="border-0 shadow-sm">
              <div className="table-responsive">
                <Table hover className="mb-0" style={{ fontSize: '0.9rem' }}>
                  <thead style={{ backgroundColor: lightBg }}>
                    <tr>
                      <th className="py-2 px-3 fw-semibold border-0">APPLICANT</th>
                      <th className="py-2 px-3 fw-semibold border-0">PROGRAM</th>
                      <th className="py-2 px-3 fw-semibold border-0">PHONE</th>
                      <th className="py-2 px-3 fw-semibold border-0">FEE</th>
                      <th className="py-2 px-3 fw-semibold border-0">STATUS</th>
                      <th className="py-2 px-3 fw-semibold border-0 text-end">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app._id}>
                        <td className="py-2 px-3 border-top">
                          <div className="d-flex align-items-center gap-2">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ 
                                width: 36, 
                                height: 36, 
                                backgroundColor: getProgramColor(app.program) + '20',
                                color: getProgramColor(app.program),
                                fontSize: '0.9rem'
                              }}
                            >
                              {app.fullName?.charAt(0) || 'A'}
                            </div>
                            <div>
                              <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>{app.fullName || 'Unknown'}</div>
                              <small className="text-muted" style={{ fontSize: '0.8rem' }}>{app.email || 'No email'}</small>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{app.program || 'Not specified'}</div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="fw-medium" style={{ fontSize: '0.9rem' }}>{app.phone || 'N/A'}</div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          <div className="fw-medium" style={{ fontSize: '0.9rem' }}>
                            {app.fee ? `RWF ${app.fee.toLocaleString()}` : 'Free'}
                          </div>
                        </td>
                        <td className="py-2 px-3 border-top">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="py-2 px-3 border-top text-end">
                          <div className="d-flex gap-1 justify-content-end">
                            <Button 
                              variant="outline-info" 
                              size="sm"
                              className="p-1"
                              title="View Details"
                              onClick={() => handleViewDetails(app)}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <BsEye size={14} />
                            </Button>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              className="p-1"
                              title="Send Email"
                              onClick={() => window.location.href = `mailto:${app.email}`}
                              style={{ width: '32px', height: '32px' }}
                            >
                              <BsEnvelope size={14} />
                            </Button>
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant="outline-secondary" 
                                size="sm"
                                className="p-1"
                                style={{ width: '32px', height: '32px' }}
                              >
                                <BsThreeDotsVertical size={14} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleStatusUpdate(app._id, "accepted")}>
                                  <BsCheckCircle className="me-2" />
                                  Accept Application
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusUpdate(app._id, "rejected")}>
                                  <BsXCircle className="me-2" />
                                  Reject Application
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item 
                                  className="text-danger" 
                                  onClick={() => handleDeleteApplication(app._id)}
                                >
                                  Delete Application
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
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

        {/* APPLICATIONS CARDS - MOBILE */}
        {!loading && applications.length > 0 && (
          <div className="d-lg-none">
            <div className="d-flex flex-column gap-2">
              {filteredApplications.map((app) => (
                <Card 
                  key={app._id}
                  className="border-0 shadow-sm"
                  style={{ 
                    borderLeft: `4px solid ${getProgramColor(app.program)}`
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
                            backgroundColor: getProgramColor(app.program) + '20',
                            color: getProgramColor(app.program),
                            fontSize: '0.9rem'
                          }}
                        >
                          {app.fullName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>{app.fullName || 'Unknown'}</div>
                          <small className="text-muted" style={{ fontSize: '0.75rem' }}>{app.email || 'No email'}</small>
                        </div>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    
                    <div className="mb-2">
                      <div className="fw-medium mb-1" style={{ fontSize: '0.85rem' }}>{app.program || 'Not specified'}</div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>{app.phone || 'N/A'}</small>
                        <small className="fw-medium" style={{ fontSize: '0.75rem' }}>
                          {app.fee ? `RWF ${app.fee.toLocaleString()}` : 'Free'}
                        </small>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Unknown date'}
                      </small>
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          className="p-1"
                          title="View Details"
                          onClick={() => handleViewDetails(app)}
                          style={{ width: '30px', height: '30px' }}
                        >
                          <BsEye size={12} />
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="p-1"
                          title="Send Email"
                          onClick={() => window.location.href = `mailto:${app.email}`}
                          style={{ width: '30px', height: '30px' }}
                        >
                          <BsEnvelope size={12} />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Application Details Modal */}
        <ApplicationDetailsModal
          application={selectedApp}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      </div>

      {/* MOBILE BOTTOM SPACER */}
      <div className="d-lg-none" style={{ height: '60px' }}></div>
    </div>
  );
};

export default Applications;