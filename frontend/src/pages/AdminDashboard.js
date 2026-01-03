import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  AppBar,
  Container,
  Toolbar,
  Drawer,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import RefreshIcon from "@mui/icons-material/Refresh";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import API from "../utils/api";

const drawerWidth = 240;

const StyledCard = ({ title, count, icon, color }) => (
  <Card
    sx={{
      minHeight: 160,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "0.3s",
      "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
      bgcolor: color,
    }}
  >
    <CardContent sx={{ textAlign: "center" }}>
      <Box sx={{ color: "white", mb: 1 }}>{icon}</Box>
      <Typography variant="h6" sx={{ color: "white", opacity: 0.9 }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
        {count}
      </Typography>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, classes: 0, subjects: 0 });
  const [notices, setNotices] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [statsRes, noticeRes, studentRes, subjectRes] = await Promise.all([
        API.get("/AdminStats"),
        API.get("/NoticeList"),
        API.get("/StudentList"),
        API.get("/AllSubjects"),
      ]);

      setStats(statsRes.data);
      setNotices(noticeRes.data);
      setStudents(studentRes.data);
      setSubjects(subjectRes.data.slice(0, 6)); // show first 6 recent subjects
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminID");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 1. TOP TOOLBAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            School Management System - Admin
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* 2. SIDEBAR NAVIGATION */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List sx={{ mt: 2 }}>
            <ListItem button onClick={() => navigate("/admin/dashboard")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard Home" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/classes")}>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Classes" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/subjects")}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Subjects" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/marks")}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Marks Entry" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/add-student")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Student" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/attendance")}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" />
            </ListItem>

            <ListItem button onClick={() => navigate("/admin/add-notice")}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Add Notice" />
            </ListItem>

            <ListItem button sx={{ color: "red" }} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* 3. MAIN CONTENT AREA */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Top spacer */}
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4">Admin Overview</Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchData}
            >
              Refresh
            </Button>
          </Box>
          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <StyledCard
                title="Students"
                count={stats.students}
                color="#1976d2"
                icon={<PeopleIcon sx={{ fontSize: 30 }} />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard
                title="Classes"
                count={stats.classes}
                color="#2e7d32"
                icon={<ClassIcon sx={{ fontSize: 30 }} />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard
                title="Subjects"
                count={stats.subjects}
                color="#ed6c02"
                icon={<SubjectIcon sx={{ fontSize: 30 }} />}
              />
            </Grid>
          </Grid>
          {/* Recent Students Table */}
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Recently Registered Students
          </Typography>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Roll Number</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Class</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {students.length > 0 ? (
    students.map((student) => (
      <TableRow
        key={student._id}
        hover
        onClick={() => navigate(`/admin/students/${student._id}`)}
        sx={{
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#f5f5f5' }
        }}
      >
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.rollNum}</TableCell>
        <TableCell>{student.sclassName?.sclassName || "N/A"}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3} align="center">
        No students found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
            </Table>
          </Paper>
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Current Subjects
          </Typography>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Subject Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Code</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Class</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.length > 0 ? (
                  subjects.map((sub) => (
                    <TableRow key={sub._id}>
                      <TableCell>{sub.subName}</TableCell>
                      <TableCell>{sub.subCode}</TableCell>
                      <TableCell>
                        {/* Accessing populated class name */}
                        {sub.sclassName?.sclassName || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>         
          {/* Announcement Board with Attachments */}
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Recent Announcements
          </Typography>

          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <React.Fragment key={notice._id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ flexDirection: "column", mb: 1 }}
                    >
                      <Typography variant="h6">{notice.title}</Typography>

                      <Typography variant="body2" color="text.secondary">
                        {new Date(notice.date).toLocaleDateString()}
                      </Typography>

                      <Typography sx={{ mb: 1 }}>
                        {notice.description}
                      </Typography>

                      {/* Display Attachment if present */}
                      {notice.attachmentUrl &&
                        notice.attachmentType !== "none" && (
                          <Box sx={{ mt: 1 }}>
                            {notice.attachmentType === "image" && (
                              <img
                                src={notice.attachmentUrl}
                                alt="Attachment"
                                style={{
                                  width: "100%",
                                  maxWidth: "300px",
                                  borderRadius: "6px",
                                  marginTop: "10px",
                                }}
                              />
                            )}

                            {notice.attachmentUrl && (
                              <Box sx={{ mt: 2 }}>
                                {notice.attachmentType === "image" ? (
                                  <img
                                    src={`http://localhost:5000${notice.attachmentUrl}`}
                                    width="35%"
                                    alt="notice"
                                  />
                                ) : (
                                  <Button
                                    href={`http://localhost:5000${notice.attachmentUrl}`}
                                    target="_blank"
                                  >
                                    Download PDF
                                  </Button>
                                )}
                              </Box>
                            )}
                            {notice.attachmentType === "pdf" && (
                              <Button
                                variant="outlined"
                                href={notice.attachmentUrl}
                                target="_blank"
                                sx={{ mt: 1 }}
                              >
                                📄 Open PDF
                              </Button>
                            )}
                          </Box>
                        )}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <Typography sx={{ p: 2 }}>
                  No announcements available.
                </Typography>
              )}
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
export default AdminDashboard;
