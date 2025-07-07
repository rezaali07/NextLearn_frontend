// import React, { useEffect, useState } from "react";
// import "./Home.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getCourses } from "../../actions/CourseActions";
// import CourseCard from "../../component/Course/CourseCard";
// import Header from "./Header";
// import MetaData from "../../more/MetaData";
// import Footer from "../../more/Footer";
// import BottomTab from "../../more/BottomTab";
// import { ToastContainer } from "react-toastify";
// import CustomCarousel from "../../component/Home/Carousel";
// import ChatSupport from "../../component/Home/chat_support";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { courses, loading, error } = useSelector((state) => state.courses);

//   const [currentPage, setCurrentPage] = useState(1);
//   const coursesPerPage = 12;

//   // Calculate pagination
//   const indexOfLastCourse = currentPage * coursesPerPage;
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
//   const totalPages = Math.ceil((courses?.length || 0) / coursesPerPage);

//   useEffect(() => {
//     dispatch(getCourses());
//   }, [dispatch]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <MetaData title="Next Learn" />
//       <Header />
//       <CustomCarousel />

//       {loading ? (
//         <div>Loading courses...</div>
//       ) : error ? (
//         <div style={{ color: "red" }}>Error: {error}</div>
//       ) : currentCourses?.length > 0 ? (
//         <>
//           {/* Section Heading */}
//           <div className="course-heading-container">
//             <h2 className="homeHeading">All Courses</h2>
//           </div>

//           {/* Course Cards */}
//           <div className="course-card-container">
//             {currentCourses.map((course) => (
//               <CourseCard key={course._id} course={course} />
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="pagination">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={currentPage === i + 1 ? "active" : ""}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       ) : (
//         <div>No courses available</div>
//       )}

//       <ToastContainer position="bottom-center" autoClose={5000} />
//       <Footer />
//       <BottomTab />
//       <ChatSupport />
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "../../actions/CourseActions";
import CourseCard from "../../component/Course/CourseCard";
import Header from "./Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import { ToastContainer } from "react-toastify";
import CustomCarousel from "../../component/Home/Carousel";
import ChatSupport from "../../component/Home/chat_support";

const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  const [trendingCourses, setTrendingCourses] = useState([]);
  const [forYouCourses, setForYouCourses] = useState([]);
  const [mustLearnCourses, setMustLearnCourses] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses?.length > 0) {
      const shuffled = [...courses].sort(() => 0.5 - Math.random());
      setTrendingCourses(shuffled.slice(0, 4));
      setForYouCourses(shuffled.slice(4, 8));
      setMustLearnCourses(shuffled.slice(8, 12));
    }
  }, [courses]);

  return (
    <>
      <MetaData title="Next Learn" />
      <Header />
      <CustomCarousel />

      {loading ? (
        <div>Loading courses...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : (
        <>
          {/* Trending Courses */}
          <div className="course-section">
            <h2 className="homeHeading">🔥 Trending Courses</h2>
            <div className="course-card-container">
              {trendingCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>

          {/* For You */}
          <div className="course-section">
            <h2 className="homeHeading">🎯 For You</h2>
            <div className="course-card-container">
              {forYouCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>

          {/* Must Learn */}
          <div className="course-section">
            <h2 className="homeHeading">📘 Must Learn</h2>
            <div className="course-card-container">
              {mustLearnCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </>
      )}

      <ToastContainer position="bottom-center" autoClose={5000} />
      <Footer />
      <BottomTab />
      <ChatSupport />
    </>
  );
};

export default Home;
