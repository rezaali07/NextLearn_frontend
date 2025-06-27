import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import "./CourseLessonView.css";

const CourseLessonView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course lessons", error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading course data...</p>;
  if (!course.lessons || course.lessons.length === 0) return <p>No lessons found.</p>;

  const currentLesson = course.lessons[currentLessonIndex];

  const handleNext = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  const renderVideo = () => {
    const { videoUrl } = currentLesson;

    // If YouTube URL, embed via iframe
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      let videoId = "";

      if (videoUrl.includes("youtu.be")) {
        videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
      } else if (videoUrl.includes("v=")) {
        videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      }

      return (
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Video"
          className="lesson-video"
        ></iframe>
      );
    }

    // Default video tag for direct file URLs
    return (
      <video
        controls
        width="100%"
        src={videoUrl}
        className="lesson-video"
      />
    );
  };

  return (
    <>
      <Header />
      <div className="lesson-view-container">
        {/* Sidebar */}
        <aside className="lesson-sidebar">
          <h3>{course.title}</h3>
          <ul>
            {course.lessons.map((lesson, index) => (
              <li
                key={lesson._id}
                className={index === currentLessonIndex ? "active-lesson" : ""}
                onClick={() => setCurrentLessonIndex(index)}
              >
                {lesson.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="lesson-main">
          <div className="lesson-header">
            <h2>{course.title}</h2>
            <button className="quiz-button">Quiz</button>
          </div>

          <div className="lesson-content-box">
            {renderVideo()}
            <div className="lesson-description">
              <p><strong></strong> {currentLesson.content}</p>
            </div>
          </div>

          <div className="lesson-navigation">
            <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
              &lt; Previous
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
