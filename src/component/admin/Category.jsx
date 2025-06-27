import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./Category.css"; // reuse card styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v2/categories");
      setCategories(data.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return toast.error("Name required");

    try {
      await axios.post(
        "/api/v2/categories",
        { name },
        { withCredentials: true }
      );
      toast.success("Category created");
      setName("");
      fetchCategories();
    } catch (err) {
      toast.error("Create failed");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `/api/v2/categories/${id}`,
        { name: editName },
        { withCredentials: true }
      );
      toast.success("Category updated");
      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`/api/v2/categories/${id}`, {
        withCredentials: true,
      });
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="users-container">
          <h2>Manage Categories</h2>

          <div className="create-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New category name"
            />
            <button onClick={handleCreate}>Add</button>
          </div>

          <div className="user-cards">
            {categories.length === 0 ? (
              <p>No categories found.</p>
            ) : (
              categories.map((cat) => (
                <div className="user-card" key={cat._id}>
                  {editingId === cat._id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                      <button onClick={() => handleUpdate(cat._id)}>Save</button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h4>{cat.name}</h4>
                      <div className="card-actions">
                        <button onClick={() => handleEdit(cat)}>Edit</button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Category;
