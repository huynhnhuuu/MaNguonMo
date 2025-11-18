import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Sản phẩm nổi bật</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/detail/${p.id}`)}
            style={{
              display: "flex",
              gap: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "14px",
              background: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            {/* HÌNH SẢN PHẨM */}
            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                flexShrink: 0,
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

            {/* THÔNG TIN SẢN PHẨM */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem" }}>
                {p.title}
              </h3>

              <p
                style={{
                  color: "#1e88e5",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  margin: "0 0 6px",
                }}
              >
                ${p.price}
              </p>

              <small style={{ color: "#555", marginBottom: "8px" }}>
                ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
              </small>

              <p
                style={{
                  color: "#666",
                  lineHeight: "1.4",
                  maxHeight: "60px",
                  overflow: "hidden",
                }}
              >
                {p.description || "Không có mô tả."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;
