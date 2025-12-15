import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { sampleProducts } from "@/data/products"; // fallback, optional

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Product[] = await res.json();

        // Map backend data to your Product type
        const mappedData = data.map((p) => ({
          id: p.id.toString(),
          name: p.name,
          description: p.description,
          price: Number(p.price),
          stock: p.stock,
          image_url: p.image_url, // now backend always has this
          category: p.category || "General",
        }));

        setProducts(mappedData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to fetch products. Showing fallback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products List</h1>
      {error && <p style={{ color: "orange" }}>{error}</p>}
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            />
            <h2 style={{ marginBottom: "5px" }}>{product.name}</h2>
            <p style={{ fontStyle: "italic", marginBottom: "5px" }}>{product.category}</p>
            <p style={{ marginBottom: "5px" }}>{product.description}</p>
            <p>
              <strong>Price:</strong> R{product.price}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
