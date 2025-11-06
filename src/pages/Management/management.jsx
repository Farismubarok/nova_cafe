import React, { useState, useEffect } from "react";
import "./management.css";
import { FaCreditCard, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import profileImg from "../../assets/icon/jmk.svg";
import { IoPersonSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { PiCoffeeFill } from "react-icons/pi";

const Management = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMenu, setEditingMenu] = useState(null);
  const [newMenu, setNewMenu] = useState({ name: "", price: "", image: "" });

  // === READ ===
  const fetchMenus = async () => {
    try {
      const res = await fetch("http://localhost:5000/menus");
      const data = await res.json();
      setMenus(data);
      setLoading(false);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // === CREATE ===
  const handleAddMenu = async (e) => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price) return alert("Lengkapi semua data!");
    try {
      const res = await fetch("http://localhost:5000/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenu),
      });
      if (res.ok) {
        setNewMenu({ name: "", price: "", image: "" });
        fetchMenus();
      }
    } catch (err) {
      console.error("Gagal tambah data:", err);
    }
  };

  // === DELETE ===
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus menu ini?")) return;
    try {
      await fetch(`http://localhost:5000/menus/${id}`, { method: "DELETE" });
      fetchMenus();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  // === UPDATE ===
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/menus/${editingMenu.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMenu),
      });
      setEditingMenu(null);
      fetchMenus();
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar-admin">
        <div className="logo-admin">
          <img src={logo} alt="Nova Cafe" />
          <h1>Nova Cafe</h1>
        </div>
        <hr />
        <div className="menu-admin">
          <button className="menu-item" onClick={() => navigate("/admin")}>
            <RxDashboard /> Dashboard
          </button>
          <button className="menu-item" onClick={() => navigate("/customers")}>
            <IoPersonSharp /> Customers
          </button>
          <button className="menu-item" onClick={() => navigate("/transactions")}>
            <FaCreditCard /> Transactions
          </button>
          <button className="menu-item back">
            <PiCoffeeFill /> Menu Management
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="main-content">
        <header className="topbar">
          <div></div>
          <div className="profile">
            <img src={profileImg} alt="Admin" />
            <span>Nova Admin</span>
          </div>
        </header>

        <section className="menu-section">
          <h2>Menu Management</h2>

          {/* Form Tambah Menu */}
          <form className="add-form" onSubmit={handleAddMenu}>
            <input
              type="text"
              placeholder="Nama menu"
              value={newMenu.name}
              onChange={(e) =>
                setNewMenu({ ...newMenu, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Harga"
              value={newMenu.price}
              onChange={(e) =>
                setNewMenu({ ...newMenu, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Link gambar (opsional)"
              value={newMenu.image}
              onChange={(e) =>
                setNewMenu({ ...newMenu, image: e.target.value })
              }
            />
            <button type="submit" className="btn-edit">
              <FaPlus /> Tambah
            </button>
          </form>

          {/* Data Menu */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="menu-grid">
              {menus.map((menu) => (
                <div className="menu-card" key={menu.id}>
                  <img
                    src={menu.image || "https://via.placeholder.com/200"}
                    alt={menu.name}
                    className="menu-img"
                  />
                  <div className="menu-info">
                    {editingMenu?.id === menu.id ? (
                      <form onSubmit={handleUpdate} className="edit-form">
                        <input
                          type="text"
                          value={editingMenu.name}
                          onChange={(e) =>
                            setEditingMenu({
                              ...editingMenu,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          value={editingMenu.price}
                          onChange={(e) =>
                            setEditingMenu({
                              ...editingMenu,
                              price: e.target.value,
                            })
                          }
                        />
                        <button type="submit" className="btn-edit">Simpan</button>
                        <button
                          type="button"
                          onClick={() => setEditingMenu(null)}
                          className="btn-delete"
                        >
                          Batal
                        </button>
                      </form>
                    ) : (
                      <>
                        <p className="menu-name">{menu.name}</p>
                        <p className="menu-price">
                          Rp {menu.price.toLocaleString("id-ID")}
                        </p>
                        <div className="menu-actions">
                          <button
                            className="btn-edit"
                            onClick={() => setEditingMenu(menu)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(menu.id)}
                          >
                            <FaTrashAlt /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Management;
