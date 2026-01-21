import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Badge, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BsClipboardCheck,
  BsClockHistory,
  BsCheckCircle,
  BsEnvelopeExclamation,
  BsPeople,
  BsChatDots,
  BsHouseDoor,
  BsBell,
  BsPersonCircle,
  BsGear
} from "react-icons/bs";
import api from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }
        
        // Fetch dashboard stats from your API
        const statsRes = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch applications
        const appsRes = await api.get("/admin/applications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch messages
        const messagesRes = await api.get("/admin/messages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Set stats from your backend
        setStats({
          totalApplications: statsRes.data.totalApplications || 0,
          pendingApplications: statsRes.data.pendingApplications || 0,
          acceptedApplications: 0, // Your backend doesn't track accepted
          unreadMessages: statsRes.data.unreadMessages || 0,
        });
        
        // Get recent applicants (last 4)
        const applications = appsRes.data || [];
        const recentApps = applications
          .slice(0, 4)
          .map(app => ({
            _id: app._id,
            fullName: app.fullName,
            email: app.email,
            program: app.program,
            status: "pending",
            createdAt: app.createdAt
          }));
        
        setRecentApplicants(recentApps);
        
        // Get recent messages (last 3)
        const messages = messagesRes.data || [];
        const recentMsgs = messages
          .slice(0, 3)
          .map(msg => ({
            _id: msg._id,
            name: msg.name,
            email: msg.email,
            message: msg.message || msg.subject,
            isRead: false, // Your schema doesn't have isRead field
            createdAt: msg.createdAt
          }));
        
        setRecentMessages(recentMsgs);
        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        }
        
        // Set default empty data
        setStats({
          totalApplications: 0,
          pendingApplications: 0,
          acceptedApplications: 0,
          unreadMessages: 0,
        });
        setRecentApplicants([]);
        setRecentMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const primaryColor = "#4361ee";
  const secondaryColor = "#3a0ca3";
  const warningColor = "#f72585";
  const successColor = "#4cc9f0";
  const lightBg = "#f8f9fa";

  const navigationButtons = [
    {
      title: "Dashboard",
      icon: <BsHouseDoor size={18} />,
      path: "/admin/dashboard",
      active: true,
      description: "Overview"
    },
    {
      title: "Applications",
      icon: <BsPeople size={18} />,
      path: "/admin/applications",
      count: stats?.totalApplications || 0,
      description: "Manage"
    },
    {
      title: "Messages",
      icon: <BsChatDots size={18} />,
      path: "/admin/messages",
      count: stats?.unreadMessages || 0,
      description: "View"
    }
    // {
    //   title: "Settings",
    //   icon: <BsGear size={18} />,
    //   path: "/admin/settings",
    //   description: "System"
    // }
  ];

  const statsCards = [
    {
      title: "Total Applicants",
      value: stats?.totalApplications || 0,
      icon: <BsClipboardCheck size={20} />,
      color: primaryColor,
      bg: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)`,
      borderColor: primaryColor,
      onClick: () => navigate("/admin/applications"),
    },
    {
      title: "Pending",
      value: stats?.pendingApplications || 0,
      icon: <BsClockHistory size={20} />,
      color: warningColor,
      bg: `linear-gradient(135deg, ${warningColor}15, ${warningColor}05)`,
      borderColor: warningColor,
      onClick: () => navigate("/admin/applications"),
    },
    {
      title: "Accepted",
      value: stats?.acceptedApplications || 0,
      icon: <BsCheckCircle size={20} />,
      color: successColor,
      bg: `linear-gradient(135deg, ${successColor}15, ${successColor}05)`,
      borderColor: successColor,
      onClick: () => navigate("/admin/applications"),
    },
    {
      title: "Messages",
      value: stats?.unreadMessages || 0,
      icon: <BsEnvelopeExclamation size={20} />,
      color: secondaryColor,
      bg: `linear-gradient(135deg, ${secondaryColor}15, ${secondaryColor}05)`,
      borderColor: secondaryColor,
      onClick: () => navigate("/admin/messages"),
    },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: lightBg }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: lightBg }}>
      {/* TOP NAVIGATION BAR */}
      <nav className="navbar navbar-light bg-white shadow-sm border-bottom sticky-top py-2">
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center justify-content-between w-100">
            {/* Logo and Title */}
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
                <h6 className="fw-bold mb-0" style={{ color: primaryColor, fontSize: '1rem' }}>
                  Admin Dashboard
                </h6>
                <small className="text-muted d-none d-sm-inline" style={{ fontSize: '0.75rem' }}>
                  EdTech Training Center
                </small>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline"
                className="position-relative p-1"
                style={{ border: 'none', width: '36px', height: '36px' }}
              >
                <BsBell size={16} color="#6c757d" />
                {stats?.unreadMessages > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.6rem", padding: "0.1rem 0.3rem" }}
                  >
                    {stats.unreadMessages}
                  </Badge>
                )}
              </Button>

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

          {/* MOBILE NAVIGATION TABS */}
          <div className="d-lg-none mt-2">
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
          <div className="d-none d-lg-flex justify-content-center mt-3">
            <div className="d-flex gap-2 bg-light rounded-3 p-1">
              {navigationButtons.map((nav, index) => (
                <Button
                  key={index}
                  variant={nav.active ? "primary" : "outline"}
                  className="d-flex align-items-center gap-2 px-3 py-2"
                  onClick={() => navigate(nav.path)}
                  style={{
                    backgroundColor: nav.active ? primaryColor : 'transparent',
                    border: 'none',
                    color: nav.active ? 'white' : '#6c757d',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}
                >
                  {nav.icon}
                  <span>{nav.title}</span>
                  {nav.count !== undefined && nav.count > 0 && (
                    <Badge 
                      bg={nav.active ? "light" : "danger"}
                      text={nav.active ? "dark" : "white"}
                      style={{ fontSize: "0.7rem", padding: "0.2rem 0.4rem" }}
                    >
                      {nav.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container-fluid px-3 py-3">
        {/* STATS CARDS */}
        <Row className="g-2 mb-4">
          {statsCards.map((card, index) => (
            <Col xs={6} md={3} key={index}>
              <div 
                className="rounded-3 p-3 h-100"
                onClick={card.onClick}
                style={{ 
                  cursor: 'pointer',
                  background: card.bg,
                  border: `1px solid ${card.borderColor}20`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div className="d-flex align-items-start justify-content-between mb-2">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: `${card.color}20`,
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
                
                <h4 className="fw-bold mb-1" style={{ color: card.color, fontSize: '1.5rem' }}>
                  {card.value}
                </h4>
                <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>
                  {card.title}
                </p>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={card.onClick}
                  className="w-100 mt-2"
                  style={{
                    borderColor: card.color,
                    color: card.color,
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem'
                  }}
                >
                  View Details →
                </Button>
              </div>
            </Col>
          ))}
        </Row>

        {/* RECENT ACTIVITY */}
        <Row className="g-3">
          {/* Recent Applicants Card */}
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Recent Applicants</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Latest internship applications
                    </small>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => navigate("/admin/applications")}
                    className="py-1 px-2"
                    style={{ 
                      borderColor: primaryColor,
                      color: primaryColor,
                      fontSize: '0.75rem'
                    }}
                  >
                    View all →
                  </Button>
                </div>

                {recentApplicants.length === 0 ? (
                  <div className="text-center py-4">
                    <div 
                      className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: 48, 
                        height: 48, 
                        backgroundColor: `${primaryColor}10`,
                        color: primaryColor
                      }}
                    >
                      <BsPeople size={20} />
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      No applications yet
                    </p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {recentApplicants.map((app, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center p-2 rounded border"
                        style={{ 
                          backgroundColor: `${warningColor}08`,
                          borderColor: `${warningColor}20`,
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/admin/applications`)}
                      >
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                          style={{ 
                            width: 36, 
                            height: 36, 
                            backgroundColor: getProgramColor(app.program),
                            color: 'white',
                            fontSize: '0.9rem'
                          }}
                        >
                          {app.fullName?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <div className="d-flex justify-content-between align-items-center">
                            <div 
                              className="fw-semibold text-dark text-truncate"
                              style={{ fontSize: '0.85rem' }}
                            >
                              {app.fullName}
                            </div>
                            <Badge 
                              style={{ 
                                backgroundColor: warningColor,
                                color: 'white',
                                fontSize: '0.65rem'
                              }}
                              className="px-1 py-0"
                            >
                              pending
                            </Badge>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <small 
                              className="text-muted text-truncate"
                              style={{ fontSize: '0.7rem' }}
                            >
                              {app.program}
                            </small>
                            <small 
                              className="text-muted"
                              style={{ fontSize: '0.65rem' }}
                            >
                              {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Messages Card */}
          <Col xs={12} lg={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="fw-bold mb-0">Recent Messages</h6>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      Latest contact inquiries
                    </small>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => navigate("/admin/messages")}
                    className="py-1 px-2"
                    style={{ 
                      borderColor: primaryColor,
                      color: primaryColor,
                      fontSize: '0.75rem'
                    }}
                  >
                    View all →
                  </Button>
                </div>

                {recentMessages.length === 0 ? (
                  <div className="text-center py-4">
                    <div 
                      className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: 48, 
                        height: 48, 
                        backgroundColor: `${secondaryColor}10`,
                        color: secondaryColor
                      }}
                    >
                      <BsChatDots size={20} />
                    </div>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                      No messages yet
                    </p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {recentMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className="p-2 rounded border"
                        style={{ 
                          backgroundColor: `${primaryColor}05`,
                          borderColor: `${primaryColor}20`
                        }}
                        onClick={() => navigate(`/admin/messages`)}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <div className="d-flex align-items-center gap-1">
                            <div 
                              className="fw-semibold text-dark text-truncate"
                              style={{ fontSize: '0.85rem' }}
                            >
                              {msg.name}
                            </div>
                            <Badge 
                              style={{ 
                                backgroundColor: primaryColor,
                                color: 'white',
                                fontSize: '0.6rem'
                              }}
                              className="px-1 py-0"
                            >
                              New
                            </Badge>
                          </div>
                          <small 
                            className="text-muted"
                            style={{ fontSize: '0.65rem' }}
                          >
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'N/A'}
                          </small>
                        </div>
                        <small 
                          className="text-muted d-block text-truncate mb-1"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {msg.message}
                        </small>
                        <small 
                          className="text-muted d-block text-truncate"
                          style={{ fontSize: '0.7rem' }}
                        >
                          {msg.email}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* MOBILE BOTTOM SPACER */}
      <div className="d-lg-none" style={{ height: '60px' }}></div>
    </div>
  );
};

export default Dashboard;