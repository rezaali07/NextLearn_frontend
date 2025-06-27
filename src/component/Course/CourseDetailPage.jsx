import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import ChatSupport from "../../component/Home/chat_support";
import LikeButton from "../../more/LikeButton";

import CourseAccessButton from "../../component/Course/CourseAccessButton"; // ✅ imported access logic component

import "./CourseDetailPage.css";

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/v2/courses/${id}`);
        setCourse(data);

        if (data.images && data.images.length > 0) {
          const urls = data.images.map((img) =>
            img.startsWith("http") ? img : `http://localhost:4000${img}`
          );
          setImages(urls);
        } else {
          setImages(["https://via.placeholder.com/300x200?text=No+Image"]);
        }
      } catch (err) {
        console.error("Error loading course:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <>
      <MetaData title={course.title || "Course Details"} />
      <Header />

      <div className="course-detail-container">
        <div className="course-left">
          <div className="image-hover-wrapper">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Course ${index}`}
                className="course-image"
                style={{
                  animationDelay: `${index * 3}s`,
                  zIndex: images.length - index,
                }}
              />
            ))}
          </div>

          <h3 className="course-title">{course.title}</h3>
          <p className="course-author">{course.author} | Author</p>

          <div className="course-rating">
            {[...Array(4)].map((_, i) => (
              <FontAwesomeIcon icon={faSolidStar} key={i} />
            ))}
            <FontAwesomeIcon icon={faRegularStar} />
          </div>

          <div className="course-icons">
            <LikeButton courseId={course._id} />
          </div>

          <div className="course-category">
            <strong>Category:</strong> {course.category?.name || "N/A"}
          </div>

          <div className="course-price">
            <strong>Price:</strong>{" "}
            {course.type === "Paid" ? `₹${course.price}` : "Free"}
          </div>

          <div className="course-created">
            <strong>Instructor:</strong> {course.createdBy?.name} (
            {course.createdBy?.email})
          </div>
        </div>

        <div className="course-right">
          <p className="breadcrumb">
            HOME &gt; COURSE &gt; {course.category?.name || "Category"}
          </p>

          <div className="course-info-box">
            <h2>What you'll learn:</h2>
            <p>{course.description}</p>

            <h3>Lessons</h3>
            <ul className="lesson-list">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons.map((lesson) => (
                  <li key={lesson._id} className="lesson-item">
                    <strong>{lesson.title}</strong>
                  </li>
                ))
              ) : (
                <li>No lessons available.</li>
              )}
            </ul>

            {/* ✅ Separated access logic here */}
            <CourseAccessButton course={course} />
          </div>
        </div>
      </div>

      <Footer />
      <BottomTab />
      <ChatSupport />
    </>
  );
};

export default CourseDetailPage;
