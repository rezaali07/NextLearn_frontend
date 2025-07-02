// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../component/Home/Header";
// import Footer from "../more/Footer";
// import BottomTab from "../more/BottomTab";

// const QuizProgress = () => {
//   const [progressData, setProgressData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProgress = async () => {
//       try {
//         const { data } = await axios.get("/api/v2/courses/me/quiz-progress");
//         setProgressData(data.progress || []);
//       } catch (err) {
//         console.error("Failed to fetch quiz progress", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProgress();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div style={{ padding: "2rem" }}>
//         <h2 style={{ marginBottom: "1rem" }}>📊 Quiz Progress</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : progressData.length === 0 ? (
//           <p>No quiz progress found.</p>
//         ) : (
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f0f0f0" }}>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>📅 Date</th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>📚 Course</th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>✅ Score %</th>
//               </tr>
//             </thead>
//             <tbody>
//               {progressData.map((entry) => {
//                 const total = entry.answers.length;
//                 const correct = entry.answers.filter((a) => a.isCorrect).length;
//                 const percent = ((correct / total) * 100).toFixed(0);
//                 const date = new Date(entry.date).toLocaleDateString();

//                 return (
//                   <tr key={entry._id}>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{date}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{entry.course?.title}</td>
//                     <td style={{ border: "1px solid #ddd", padding: "8px" }}>{percent}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <Footer />
//       <BottomTab />
//     </>
//   );
// };

// export default QuizProgress;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../component/Home/Header";
import Footer from "../more/Footer";
import BottomTab from "../more/BottomTab";

const QuizProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Retrieved token:", token);

        const { data } = await axios.get(
          "/api/v2/courses/me/quiz-progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Quiz progress data:", data.progress);
        setProgressData(data.progress);
      } catch (error) {
        console.error("Error fetching quiz progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <>
      <Header />
      <div className="quiz-progress-container" style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>📊 My Quiz Progress</h2>

        {loading ? (
          <p>Loading quiz progress...</p>
        ) : progressData.length === 0 ? (
          <p>No quiz progress data found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Course</th>
                <th style={thStyle}>Quiz %</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((entry, index) => {
                const total = entry.answers.length || 1;
                const correct = entry.answers.filter(a => a.isCorrect).length;
                const percent = ((correct / total) * 100).toFixed(0);

                console.log(
                  `Entry ${index}: ${entry.course?.title} - ${percent}%`
                ); 

                return (
                  <tr key={index}>
                    <td style={tdStyle}>
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td style={tdStyle}>{entry.course?.title || "Untitled"}</td>
                    <td style={tdStyle}>{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

// Inline styles for quick styling
const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default QuizProgress;
