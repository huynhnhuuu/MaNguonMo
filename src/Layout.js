import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // COLOR THEME ĐỒNG BỘ
  const theme = {
    main: "#1e88e5", // xanh dương chủ đạo
    dark: "#1565c0",
    light: "#e3f2fd",
    text: "#ffffff",
  };

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
      {/* ===== HEADER ===== */}
      <header>
        <div
          id="divheader"
          className="header1"
          style={{
            backgroundColor: theme.main,
            color: theme.text,
            boxShadow: "0 3px 100px rgba(0,0,0,0.15)",
            paddingBottom: "5px",
          }}
        >
          {/* ----- LOGO + SEARCH ----- */}
          <div
            id="banner"
            className="banner1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 20px", // 👉 giúp search sát phải
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div id="logo" className="logo1">
              <img
                src={anhlogo}
                alt="Logo"
                className="logo-img"
                style={{ height: "120px", objectFit: "contain" }}
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
                  border: "1px solid white",
                  outline: "none",
                  background: theme.light,
                }}
              />
              <button
                type="button"
                style={{
                  padding: "8px 15px",
                  borderRadius: "5px",
                  background: theme.dark,
                  color: theme.text,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Tìm
              </button>
            </div>
          </div>

          {/* ----- MENUBAR ----- */}
          <div
            id="menubar"
            className="menubar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              background: theme.dark,
            }}
          >
            {/* LEFT MENU */}
            <div
              className="menubar-left"
              style={{ display: "flex", gap: "20px" }}
            >
              <Link to="/" className="menu-item" style={menuStyle}>
                TRANG CHỦ
              </Link>
              <Link to="/trang1" className="menu-item" style={menuStyle}>
                SẢN PHẨM
              </Link>

              <Link
                to="/admin/products"
                className="menu-item"
                style={menuStyle}
              >
                QUẢN TRỊ
              </Link>
            </div>

            {/* RIGHT MENU */}
            <div
              className="menubar-right"
              style={{ display: "flex", gap: "10px" }}
            >
              <Link to="/cart" className="menu-item" style={menuStyle}>
                GIỎ HÀNG
              </Link>
              {user ? (
                <>
                  <span className="username" style={{ color: "white" }}>
                    👤 {user.username}
                  </span>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    style={{
                      padding: "5px 12px",
                      background: "#ff5252",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="login-link"
                  style={{
                    color: "white",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="container" style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <footer
        className="footer"
        style={{
          background: theme.dark,
          color: "white",
          padding: "15px 20px",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <div
          className="footer-row"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 250px", marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "10px" }}>Về chúng tôi</h4>
            <p>
              Công ty HN cung cấp các sản phẩm chất lượng cao, dịch vụ tận tâm,
              và giá cả hợp lý.
            </p>
          </div>

          <div style={{ flex: "1 1 250px", marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "10px" }}>Liên hệ</h4>
            <p>Email: support@example.com</p>
            <p>Hotline: 0933 690 031</p>
            <p>Địa chỉ: 33 Vĩnh Viễn, Phường Vườn Lài, TP.HCM</p>
          </div>

          <div style={{ flex: "1 1 250px", marginBottom: "15px" }}>
            <h4 style={{ marginBottom: "10px" }}>Mạng xã hội</h4>
            <p>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.text, textDecoration: "underline" }}
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.text, textDecoration: "underline" }}
              >
                Twitter
              </a>
            </p>
            <p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: theme.text, textDecoration: "underline" }}
              >
                Instagram
              </a>
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.3)",
            marginTop: "20px",
            paddingTop: "10px",
            textAlign: "center",
          }}
        >
          © 2025 — Bản quyền thuộc về HN
        </div>
      </footer>
    </div>
  );
};

const menuStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1rem",
};

export default Layout;
