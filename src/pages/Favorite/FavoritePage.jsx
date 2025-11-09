import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../context/FavoriteContext";
import { useAuth } from "../../context/AuthContext";
import "./FavoritePage.css";

const FavoritePage = () => {
  const navigate = useNavigate();
  const { favoriteItems, removeFromFavorite } = useFavorite();
  const { logout } = useAuth();

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini dari favorit?")) {
      removeFromFavorite(id);
    }
  };

  const handleEdit = (item) => {
    // Navigate ke detail order dengan item favorit
    navigate("/detail-order", { state: { item } });
  };

  return (
    <div className="favorite-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <h1 className="logo" onClick={() => navigate("/")}>
            Nova Cafe
          </h1>
          <nav className="menu">
            <a onClick={() => navigate("/menu")}>
              Kembali ke Menu
            </a>
            <a onClick={() => navigate("/history")}>
              Riwayat Pesanan
            </a>
            <a onClick={() => navigate("/favorite")}>
              Favorit
            </a>
          </nav>
        </div>
        <button className="logout-btn" onClick={logout}>🚪 Log Out</button>
      </aside>

      {/* Konten utama */}
      <main className="main-content">
        <div className="user-profile">
          <img 
            src="/images/profile.png" 
            alt="User" 
            className="profile-img"
            onClick={() => navigate("/userprofile")}
            style={{ cursor: "pointer" }}
          />
          <h2>Profil Pengguna</h2>
        </div>

        <h3 className="title">Favorit ({favoriteItems.length} Item)</h3>

        {favoriteItems.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada item favorit</p>
            <button onClick={() => navigate("/menu")}>Lihat Menu</button>
          </div>
        ) : (
          <div className="grid-container">
            {favoriteItems.map((item) => (
              <div className="card" key={item.id}>
                <img 
                  src={item.image || item.img} 
                  alt={item.name} 
                  className="drink-img" 
                />
                <h4>{item.name}</h4>
                <p>Rp. {(item.price || 0).toLocaleString("id-ID")}</p>
                <div className="btn-group">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(item)}
                  >
                    📝 Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritePage;