// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import Header from "../Home/Header";
// import Footer from "../../more/Footer";
// import BottomTab from "../../more/BottomTab";
// import "./CourseLessonView.css";

// const CourseLessonView = () => {
//   const { id } = useParams(); // Course ID
//   const history = useHistory();

//   const [course, setCourse] = useState(null);
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axios.get(`/api/v2/courses/${id}`);
//         setCourse(data);
//       } catch (error) {
//         console.error("Failed to fetch course lessons", error);
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   if (!course) return <p>Loading course data...</p>;
//   if (!course.lessons || course.lessons.length === 0)
//     return <p>No lessons found.</p>;

//   const currentLesson = course.lessons[currentLessonIndex];

//   const handleNext = () => {
//     if (currentLessonIndex < course.lessons.length - 1) {
//       setCurrentLessonIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentLessonIndex > 0) {
//       setCurrentLessonIndex((prev) => prev - 1);
//     }
//   };

//   const handleQuiz = () => {
//     // ✅ Corrected route to the frontend quiz page
//     history.push(`/course/${id}/quiz`);
//   };

//   const renderVideo = () => {
//     const { videoUrl } = currentLesson;

//     if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
//       let videoId = "";

//       if (videoUrl.includes("youtu.be")) {
//         videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
//       } else if (videoUrl.includes("v=")) {
//         videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
//       }

//       return (
//         <iframe
//           width="100%"
//           height="400px"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           title="YouTube Video"
//           className="lesson-video"
//         ></iframe>
//       );
//     }

//     return (
//       <video controls width="100%" src={videoUrl} className="lesson-video" />
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="lesson-view-container">
//         {/* Sidebar */}
//         <aside className="lesson-sidebar">
//           <h3>{course.title}</h3>
//           <ul>
//             {course.lessons.map((lesson, index) => (
//               <li
//                 key={lesson._id}
//                 className={index === currentLessonIndex ? "active-lesson" : ""}
//                 onClick={() => setCurrentLessonIndex(index)}
//               >
//                 {lesson.title}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="lesson-main">
//           <div className="lesson-header">
//             <h2>{currentLesson.title}</h2>
//             <button className="quiz-button" onClick={handleQuiz}>
//               Quiz
//             </button>
//           </div>

//           <div className="lesson-content-box">
//             {renderVideo()}
//             <div className="lesson-description">
//               <p>{currentLesson.content}</p>
//             </div>
//           </div>

//           <div className="lesson-navigation">
//             <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
//               &lt; Previous
//             </button>
//             <button
//               onClick={handleNext}
//               disabled={currentLessonIndex === course.lessons.length - 1}
//             >
//               Next &gt;
//             </button>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <BottomTab />
//     </>
//   );
// };

// export default CourseLessonView;
// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import axios from "axios";
// import Header from "../Home/Header";
// import Footer from "../../more/Footer";
// import BottomTab from "../../more/BottomTab";
// import "./CourseLessonView.css";

// const CourseLessonView = () => {
//   const { id } = useParams(); // Course ID
//   const history = useHistory();

//   const [course, setCourse] = useState(null);
//   const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
//   const [completedLessons, setCompletedLessons] = useState([]);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const { data } = await axios.get(`/api/v2/courses/${id}`);
//         setCourse(data);
//       } catch (error) {
//         console.error("Failed to fetch course lessons", error);
//       }
//     };

//     const fetchLessonProgress = async () => {
//       try {
//         const { data } = await axios.get(`/api/v2/users/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const progress = data.user.lessonProgress.find(
//           (p) => p.course === id || p.course._id === id
//         );

//         if (progress) {
//           setCompletedLessons(progress.lessonsCompleted || []);
//         }
//       } catch (error) {
//         console.error("Failed to fetch lesson progress", error);
//       }
//     };

//     fetchCourse();
//     fetchLessonProgress();
//   }, [id, token]);

//   if (!course) return <p>Loading course data...</p>;
//   if (!course.lessons || course.lessons.length === 0)
//     return <p>No lessons found.</p>;

//   const currentLesson = course.lessons[currentLessonIndex];
//   const isCompleted = completedLessons.includes(currentLesson._id);

//   const toggleLessonCompletion = async () => {
//     try {
//       await axios.post(
//         `/api/v2/courses/${id}/lessons/${currentLesson._id}/complete`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setCompletedLessons((prev) =>
//         prev.includes(currentLesson._id)
//           ? prev.filter((lid) => lid !== currentLesson._id)
//           : [...prev, currentLesson._id]
//       );
//     } catch (error) {
//       console.error("Failed to update lesson progress", error);
//     }
//   };

//   const handleNext = () => {
//     if (currentLessonIndex < course.lessons.length - 1) {
//       setCurrentLessonIndex((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentLessonIndex > 0) {
//       setCurrentLessonIndex((prev) => prev - 1);
//     }
//   };

//   const handleQuiz = () => {
//     history.push(`/course/${id}/quiz`);
//   };

//   const renderVideo = () => {
//     const { videoUrl } = currentLesson;

//     if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
//       let videoId = "";

//       if (videoUrl.includes("youtu.be")) {
//         videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
//       } else if (videoUrl.includes("v=")) {
//         videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
//       }

//       return (
//         <iframe
//           width="100%"
//           height="400px"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           title="YouTube Video"
//           className="lesson-video"
//         ></iframe>
//       );
//     }

//     return (
//       <video controls width="100%" src={videoUrl} className="lesson-video" />
//     );
//   };

//   return (
//     <>
//       <Header />
//       <div className="lesson-view-container">
//         <aside className="lesson-sidebar">
//           <h3>{course.title}</h3>
//           <ul>
//             {course.lessons.map((lesson, index) => (
//               <li
//                 key={lesson._id}
//                 className={index === currentLessonIndex ? "active-lesson" : ""}
//                 onClick={() => setCurrentLessonIndex(index)}
//               >
//                 {lesson.title}{" "}
//                 {completedLessons.includes(lesson._id) && (
//                   <span style={{ color: "green" }}>✔</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         <main className="lesson-main">
//           <div className="lesson-header">
//             <h2>{currentLesson.title}</h2>
//             <button className="quiz-button" onClick={handleQuiz}>
//               Quiz
//             </button>
//           </div>

//           <div className="lesson-content-box">
//             {renderVideo()}
//             <div className="lesson-description">
//               <p>{currentLesson.content}</p>
//             </div>
//           </div>

//           <div className="lesson-navigation">
//             <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
//               &lt; Previous
//             </button>

//             <button onClick={toggleLessonCompletion}>
//               {isCompleted ? "✅ Marked as Read" : "📘 Mark as Read"}
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={currentLessonIndex === course.lessons.length - 1}
//             >
//               Next &gt;
//             </button>
//           </div>
//         </main>
//       </div>
//       <Footer />
//       <BottomTab />
//     </>
//   );
// };

// export default CourseLessonView;


// src/component/Course/CourseLessonView.jsx
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import "./CourseLessonView.css";

const CourseLessonView = () => {
  const { id } = useParams(); // Course ID
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  // 1) Fetch course data and user's lesson-progress on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course lessons", err);
      }
    };

    const fetchLessonProgress = async () => {
      try {
        const { data } = await axios.get("/api/v2/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // find this course's progress record
        const prog = data.user.lessonProgress.find(
          (p) => p.course._id === id
        );
        if (prog) setCompletedLessons(prog.lessonsCompleted || []);
      } catch (err) {
        console.error("Failed to fetch lesson progress", err);
      }
    };

    fetchCourse();
    fetchLessonProgress();
  }, [id, token]);

  if (!course) return <p>Loading course data...</p>;
  if (!course.lessons.length) return <p>No lessons found.</p>;

  const currentLesson = course.lessons[currentLessonIndex];
  const isCompleted = completedLessons.includes(currentLesson._id);

  // 2) Toggle read/unread: POST to mark, DELETE to unmark
  const toggleLessonCompletion = async () => {
    try {
      if (isCompleted) {
        await axios.delete(
          `/api/v2/courses/${id}/lessons/${currentLesson._id}/complete`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("📡 [API] DELETE /lessons/complete");
        setCompletedLessons((prev) =>
          prev.filter((lid) => lid !== currentLesson._id)
        );
      } else {
        await axios.post(
          `/api/v2/courses/${id}/lessons/${currentLesson._id}/complete`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("📡 [API] POST /lessons/complete");
        setCompletedLessons((prev) => [...prev, currentLesson._id]);
      }
    } catch (err) {
      console.error("Failed to update lesson progress", err);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((i) => i + 1);
    }
  };
  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((i) => i - 1);
    }
  };
  const handleQuiz = () => history.push(`/course/${id}/quiz`);

  const renderVideo = () => {
    const { videoUrl } = currentLesson;
    if (/youtu/.test(videoUrl)) {
      let videoId =
        videoUrl.includes("youtu.be")
          ? videoUrl.split("youtu.be/")[1].split("?")[0]
          : new URLSearchParams(new URL(videoUrl).search).get("v");
      return (
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video"
          className="lesson-video"
        />
      );
    }
    return (
      <video controls width="100%" src={currentLesson.videoUrl} className="lesson-video" />
    );
  };

  return (
    <>
      <Header />
      <div className="lesson-view-container">
        <aside className="lesson-sidebar">
          <h3>{course.title}</h3>
          <ul>
            {course.lessons.map((lesson, idx) => (
              <li
                key={lesson._id}
                className={`
                  ${idx === currentLessonIndex ? "active-lesson" : ""}
                  ${completedLessons.includes(lesson._id) ? "completed-lesson" : ""}
                `}
                onClick={() => setCurrentLessonIndex(idx)}
              >
                {lesson.title}
                {completedLessons.includes(lesson._id) && (
                  <span className="completed-check">✔</span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <main className="lesson-main">
          <div className="lesson-header">
            <h2>{currentLesson.title}</h2>
            <button className="quiz-button" onClick={handleQuiz}>
              Quiz
            </button>
          </div>

          <div className="lesson-content-box">
            {renderVideo()}
            <div className="lesson-description">
              <p>{currentLesson.content}</p>
            </div>
          </div>

          <div className="lesson-navigation">
            <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
              &lt; Previous
            </button>

            <button
              className={`mark-read-btn ${isCompleted ? "completed" : ""}`}
              onClick={toggleLessonCompletion}
            >
              {isCompleted ? "✅ Marked as Read" : "📘 Mark as Read"}
            </button>

            <button
              onClick={handleNext}
              disabled={currentLessonIndex === course.lessons.length - 1}
            >
              Next &gt;
            </button>
          </div>
        </main>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default CourseLessonView;
