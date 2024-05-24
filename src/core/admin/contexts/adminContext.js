import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../../auth/contexts/authContext";
import { AlertPopper } from "../../../shared";

const AdminContext = createContext();

const useAdmin = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    totalEditors: 0,
    activeEditors: 0,
    totalClients: 0,
    activeClients: 0,
    totalCourses: 0,
    averageCourseRating: 0,
    totalProjects: 0,
    averageProjectRating: 0,
    reviews: 0,
  });
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { userData } = useAuthContext();
  const [error, setError] = useState(null);
  const [response, setResponse] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const authToken = userData?.token;
  
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        console.log("Fetching admin stats...");
        const statsConfig = {
          headers: { Authorization: `Bearer ${authToken}` },
        };
        const statsResponse = await axios.get('http://localhost:4000/api/admin/stats', statsConfig);
        setStats(statsResponse.data);
        console.log("Admin stats fetched successfully:", statsResponse.data);

        console.log("Fetching student data...");
        const studentsResponse = await axios.get('http://localhost:4000/studentdata');
        console.log("Raw student data:", studentsResponse.data);

        const processedStudents = studentsResponse.data.map((student, index) => ({
          id: index.toString(),  
          name: student.fullname || "Unknown",
          email: student.email || "Unknown",
          phone: student.phone || "Unknown",
          dateJoined: student.dateJoined || new Date().toISOString().substring(0, 10),
          level: "Beginner",  
          coursesEnrolled: 0,  
          coursesCompleted: 0,  
          profilePhoto: student.profilePic ? `http://localhost:4000/${student.profilePic}` : "http://localhost:4000/uploads/default_profile_pic.png"
        }));
        console.log("Processed student data:", processedStudents);

        setStudents(processedStudents);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        console.error("Error details:", error);
        setError(error.message);
        setResponse({
          show: true,
          type: "error",
          message: "Failed to fetch admin data",
        });
        setIsFetching(false);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  const fetchStudentById = (id) => {
    return students.find(student => student.id === id);
  };

  return (
    <>
      <AdminContext.Provider value={{ stats, students, isFetching, error, fetchStudentById }}>
        {children}
      </AdminContext.Provider>
      <AlertPopper
        showAlert={response.show}
        handleClose={() =>
          setResponse({ ...response, show: false, message: "" })
        }
        alertType={response.type}
      >
        {response.message}
      </AlertPopper>
    </>
  );
};

export { useAdmin, AdminProvider };
