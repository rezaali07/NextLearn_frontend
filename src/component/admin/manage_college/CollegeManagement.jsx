// import React, { useState, useEffect } from "react";
// import Sidebar from "../../component/admin/Sidebar";
// import axios from "axios";
// import "./CollegeManagement.css";

// const CollegeManagement = () => {
//   const [tab, setTab] = useState("colleges");

//   // Data states
//   const [colleges, setColleges] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [programs, setPrograms] = useState([]);

//   // Form states for College (expanded fields)
//   const [collegeForm, setCollegeForm] = useState({
//     name: "",
//     description: "",
//     established: "",
//     province: "",
//     district: "",
//     city: "",
//     address: "",
//     latitude: "",
//     longitude: "",
//     website: "",
//     email: "",
//     phone: "",
//     affiliation: "",
//     type: "",
//     collegePrograms: [],
//     collegeCategories: [],
//     intakes: "",
//     hostelAvailable: false,
//     library: false,
//     sportsFacilities: false,
//     wifiAvailable: false,
//     transportation: false,
//     logo: null,
//     coverImage: null,
//     gallery: [],
//   });

//   const [categoryForm, setCategoryForm] = useState({ name: "" });
//   const [programForm, setProgramForm] = useState({ name: "" });

//   // Load all data
//   const fetchAll = async () => {
//     try {
//       const [cRes, catRes, pRes] = await Promise.all([
//         axios.get("/api/v2/colleges"),
//         axios.get("/api/v2/college-categories"),
//         axios.get("/api/v2/college-programs"),
//       ]);
//       setColleges(cRes.data);
//       setCategories(catRes.data);
//       setPrograms(pRes.data);
//     } catch (error) {
//       alert("Error loading data: " + error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   // Input change handler for text/checkbox/select inputs
//   const handleInputChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type === "checkbox") {
//       setCollegeForm((prev) => ({ ...prev, [name]: checked }));
//     } else if (type === "file") {
//       if (name === "gallery") {
//         setCollegeForm((prev) => ({ ...prev, gallery: Array.from(files) }));
//       } else {
//         setCollegeForm((prev) => ({ ...prev, [name]: files[0] }));
//       }
//     } else {
//       setCollegeForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Multiple select handler for programs and categories
//   const handleMultiSelect = (e) => {
//     const { name, options } = e.target;
//     const values = Array.from(options)
//       .filter((opt) => opt.selected)
//       .map((opt) => opt.value);

//     setCollegeForm((prev) => ({ ...prev, [name]: values }));
//   };

//   // Add handlers
//   const addCollege = async () => {
//     try {
//       const formData = new FormData();

//       // Append text fields
//       for (const key in collegeForm) {
//         if (
//           key !== "logo" &&
//           key !== "coverImage" &&
//           key !== "gallery" &&
//           key !== "collegePrograms" &&
//           key !== "collegeCategories"
//         ) {
//           formData.append(key, collegeForm[key]);
//         }
//       }

//       // Append ObjectId arrays individually (NOT as JSON strings)
//       collegeForm.collegePrograms.forEach((id) =>
//         formData.append("collegePrograms", id)
//       );
//       collegeForm.collegeCategories.forEach((id) =>
//         formData.append("collegeCategories", id)
//       );

//       // Append files
//       if (collegeForm.logo) formData.append("logo", collegeForm.logo);
//       if (collegeForm.coverImage) formData.append("coverImage", collegeForm.coverImage);
//       if (collegeForm.gallery.length > 0) {
//         collegeForm.gallery.forEach((file) => formData.append("gallery", file));
//       }

//       await axios.post("/api/v2/colleges", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("College added successfully");
//       setCollegeForm({
//         name: "",
//         description: "",
//         established: "",
//         province: "",
//         district: "",
//         city: "",
//         address: "",
//         latitude: "",
//         longitude: "",
//         website: "",
//         email: "",
//         phone: "",
//         affiliation: "",
//         type: "",
//         collegePrograms: [],
//         collegeCategories: [],
//         intakes: "",
//         hostelAvailable: false,
//         library: false,
//         sportsFacilities: false,
//         wifiAvailable: false,
//         transportation: false,
//         logo: null,
//         coverImage: null,
//         gallery: [],
//       });
//       fetchAll();
//     } catch (err) {
//       alert("Error adding college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const addCategory = async () => {
//     try {
//       await axios.post("/api/v2/college-categories", categoryForm);
//       setCategoryForm({ name: "" });
//       fetchAll();
//     } catch (err) {
//       alert("Error adding category: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const addProgram = async () => {
//     try {
//       await axios.post("/api/v2/college-programs", programForm);
//       setProgramForm({ name: "" });
//       fetchAll();
//     } catch (err) {
//       alert("Error adding program: " + (err.response?.data?.error || err.message));
//     }
//   };

//   // Delete handlers
//   const deleteCollege = async (slug) => {
//     if (!window.confirm("Delete this college?")) return;
//     try {
//       await axios.delete(`/api/v2/colleges/${slug}`);
//       fetchAll();
//     } catch (err) {
//       alert("Error deleting college: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const deleteCategory = async (slug) => {
//     if (!window.confirm("Delete this category?")) return;
//     try {
//       await axios.delete(`/api/v2/college-categories/${slug}`);
//       fetchAll();
//     } catch (err) {
//       alert("Error deleting category: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const deleteProgram = async (slug) => {
//     if (!window.confirm("Delete this program?")) return;
//     try {
//       await axios.delete(`/api/v2/college-programs/${slug}`);
//       fetchAll();
//     } catch (err) {
//       alert("Error deleting program: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="college-management-container">
//       <Sidebar />

//       <main className="college-management-main">
//         <h1>College Management</h1>

//         {/* Tabs */}
//         <div className="tabs">
//           {["colleges", "categories", "programs"].map((t) => (
//             <button
//               key={t}
//               className={`tab-button ${tab === t ? "active" : ""}`}
//               onClick={() => setTab(t)}
//             >
//               {t.charAt(0).toUpperCase() + t.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Colleges Tab */}
//         {tab === "colleges" && (
//           <section>
//             <h2>Add College</h2>
//             <div className="form-group multi-column">

//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="College Name"
//                   value={collegeForm.name}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="description"
//                   placeholder="Description"
//                   value={collegeForm.description}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="number"
//                   name="established"
//                   placeholder="Established Year"
//                   value={collegeForm.established}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="province"
//                   placeholder="Province"
//                   value={collegeForm.province}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="district"
//                   placeholder="District"
//                   value={collegeForm.district}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={collegeForm.city}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address"
//                   value={collegeForm.address}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="number"
//                   name="latitude"
//                   placeholder="Latitude"
//                   value={collegeForm.latitude}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="number"
//                   name="longitude"
//                   placeholder="Longitude"
//                   value={collegeForm.longitude}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="website"
//                   placeholder="Website"
//                   value={collegeForm.website}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={collegeForm.email}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone"
//                   value={collegeForm.phone}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="affiliation"
//                   placeholder="Affiliation"
//                   value={collegeForm.affiliation}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="type"
//                   placeholder="Type"
//                   value={collegeForm.type}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="intakes"
//                   placeholder="Intakes (comma separated)"
//                   value={collegeForm.intakes}
//                   onChange={handleInputChange}
//                 />

//                 <label>
//                   <input
//                     type="checkbox"
//                     name="hostelAvailable"
//                     checked={collegeForm.hostelAvailable}
//                     onChange={handleInputChange}
//                   />
//                   Hostel Available
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="library"
//                     checked={collegeForm.library}
//                     onChange={handleInputChange}
//                   />
//                   Library
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="sportsFacilities"
//                     checked={collegeForm.sportsFacilities}
//                     onChange={handleInputChange}
//                   />
//                   Sports Facilities
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="wifiAvailable"
//                     checked={collegeForm.wifiAvailable}
//                     onChange={handleInputChange}
//                   />
//                   Wifi Available
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="transportation"
//                     checked={collegeForm.transportation}
//                     onChange={handleInputChange}
//                   />
//                   Transportation
//                 </label>

//                 <label>
//                   Logo: <input type="file" name="logo" onChange={handleInputChange} />
//                 </label>
//                 <label>
//                   Cover Image:{" "}
//                   <input type="file" name="coverImage" onChange={handleInputChange} />
//                 </label>
//                 <label>
//                   Gallery: <input type="file" name="gallery" multiple onChange={handleInputChange} />
//                 </label>
//               </div>

//               <div>
//                 <label>
//                   Programs (Select multiple with Ctrl/Cmd):
//                   <select
//                     name="collegePrograms"
//                     multiple
//                     value={collegeForm.collegePrograms}
//                     onChange={handleMultiSelect}
//                     size={programs.length > 5 ? 5 : programs.length}
//                   >
//                     {programs.map((prog) => (
//                       <option key={prog._id} value={prog._id}>
//                         {prog.name}
//                       </option>
//                     ))}
//                   </select>
//                 </label>

//                 <label>
//                   Categories (Select multiple with Ctrl/Cmd):
//                   <select
//                     name="collegeCategories"
//                     multiple
//                     value={collegeForm.collegeCategories}
//                     onChange={handleMultiSelect}
//                     size={categories.length > 5 ? 5 : categories.length}
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//             </div>

//             <button className="btn btn-add" onClick={addCollege}>
//               Add College
//             </button>

//             {/* List of colleges */}
//             <h2>Colleges List</h2>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>City</th>
//                   <th>Province</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {colleges.map((c) => (
//                   <tr key={c._id}>
//                     <td>{c.name}</td>
//                     <td>{c.city}</td>
//                     <td>{c.province}</td>
//                     <td>
//                       <button className="btn btn-delete" onClick={() => deleteCollege(c.slug)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         )}

//         {/* Categories Tab */}
//         {tab === "categories" && (
//           <section>
//             <h2>Categories</h2>
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="name"
//                 placeholder="Category Name"
//                 value={categoryForm.name}
//                 onChange={(e) => setCategoryForm({ name: e.target.value })}
//               />
//               <button className="btn btn-add" onClick={addCategory}>
//                 Add Category
//               </button>
//             </div>

//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map((cat) => (
//                   <tr key={cat._id}>
//                     <td>{cat.name}</td>
//                     <td>
//                       <button className="btn btn-delete" onClick={() => deleteCategory(cat.slug)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         )}

//         {/* Programs Tab */}
//         {tab === "programs" && (
//           <section>
//             <h2>Programs</h2>
//             <div className="form-group">
//               <input
//                 className="form-input"
//                 type="text"
//                 name="name"
//                 placeholder="Program Name"
//                 value={programForm.name}
//                 onChange={(e) => setProgramForm({ name: e.target.value })}
//               />
//               <button className="btn btn-add" onClick={addProgram}>
//                 Add Program
//               </button>
//             </div>

//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {programs.map((prog) => (
//                   <tr key={prog._id}>
//                     <td>{prog.name}</td>
//                     <td>
//                       <button className="btn btn-delete" onClick={() => deleteProgram(prog.slug)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CollegeManagement;


// src/component/admin/CollegeManagement.jsx
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./CollegeManagement.css";

const CollegeManagement = () => {
  const history = useHistory();

  return (
    <div className="college-management-container">
      <Sidebar />
      <main className="college-management-main">
        <h1>College Management</h1>
        <div className="college-management-buttons">
          <button onClick={() => history.push("/admin/addCollege")}>Add College</button>
          <button onClick={() => history.push("/admin/editCollege")}>Edit College</button>
          <button onClick={() => history.push("/admin/collegeCategoriesPrograms")}>Categories</button>
          <button onClick={() => history.push("/admin/collegeCategoriesPrograms")}>Programs</button>
        </div>
      </main>
    </div>
  );
};

export default CollegeManagement;
