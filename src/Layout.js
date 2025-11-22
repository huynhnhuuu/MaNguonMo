import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="layout">
      {/* HEADER */}
      <header>
        <div id="divheader" className="header1">
          {/* BANNER WITH LOGO + SEARCH */}
          <div
            id="banner"
            className="banner1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            {/* LOGO */}
            <div id="logo" className="logo1">
              <img
                src={anhlogo}
                alt="Logo"
                className="logo-img"
                style={{ height: "140px", objectFit: "contain" }}
              />
            </div>

            {/* SEARCH BOX */}
            <div
              id="divtimkiem"
              className="search-box"
              style={{ display: "flex", gap: "5px" }}
            >
              <input
                type="text"
                placeholder="Tìm kiếm..."
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="button"
                style={{ padding: "8px 15px", borderRadius: "5px" }}
              >
                Tìm
              </button>
            </div>
          </div>

          {/* MENUBAR */}
          <div
            id="menubar"
            className="menubar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 20px",
            }}
          >
            <div
              className="menubar-left"
              style={{ display: "flex", gap: "20px" }}
            >
              <Link to="/" className="menu-item">
                TRANG CHỦ
              </Link>
              <Link to="/trang1" className="menu-item">
                SẢN PHẨM
              </Link>
              <Link to="/admin/products" className="menu-item">
                QUẢN TRỊ
              </Link>
            </div>

            <div
              className="menubar-right"
              style={{ display: "flex", gap: "10px" }}
            >
              {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link to="/login" className="login-link">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* NỘI DUNG */}
      <main className="container">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-row">
          <span className="footer-item">© 2025 — Bản quyền thuộc về HN</span>
          <span className="footer-item">Liên hệ: support@example.com</span>
          <span className="footer-item">Hotline: 0933 690 031</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
