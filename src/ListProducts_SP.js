// src/ListProducts_SP.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

// Import ảnh banner từ thư mục assets/images
import hinh1 from "./assets/images/hinh1.jpg";
import hin1 from "./assets/images/hin1.jpg";

// Banner carousel component
const BannerCarousel = ({ banners, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(timer);
  }, [banners.length, interval]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        height: "300px",
        margin: "20px auto",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={banners[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });
        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  // Mảng chứa ảnh banner đã import
  const banners = [hinh1, hin1];

  return (
    <div style={{ padding: "20px" }}>
      {/* Banner quảng cáo phía trên */}
      <BannerCarousel banners={banners} interval={3000} />

      <h2>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          width: "1000px",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <h4
                style={{
                  margin: "10px 0 5px",
                  fontSize: "1rem",
                  minHeight: "40px",
                }}
              >
                {p.title}
              </h4>
              <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
                ${p.price}
              </p>
              <small
                style={{
                  color: "#555",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
              </small>
            </div>

            <button
              onClick={(e) => handleAddToCart(e, p)}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "10px",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0056b3")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#007bff")
              }
            >
              🛒 Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
