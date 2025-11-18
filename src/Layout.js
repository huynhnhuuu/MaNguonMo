import "./assets/css/main.css";
import anhlogo from "./assets/images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <html>
      <header>
        <div id="divheader" className="header1">
          <div id="banner" className="banner1">
            <div id="logo" className="logo1">
              <img src={anhlogo} width="548" />
            </div>

            {/* ----- Ô tìm kiếm mới ----- */}
            <div id="divtimkiem" className="search-box">
              <input type="text" placeholder="Tìm kiếm..." />
              <button>Tìm</button>
            </div>
          </div>

          {/* ----- MENUBAR ----- */}
          <div id="menubar" className="menubar">
            <div className="menubar-left">
              <a href="/#" className="menu-item">
                TRANG CHỦ
              </a>
              <a href="/trang1" className="menu-item">
                EGOV
              </a>
              <a href="/admin/products" className="menu-item">
                QUẢN TRỊ
              </a>
            </div>

            <div className="menubar-right">
              {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <body>
        <div id="container" className="container">
          <Outlet />
        </div>
      </body>

      <footer></footer>
    </html>
  );
};

export default Layout;
