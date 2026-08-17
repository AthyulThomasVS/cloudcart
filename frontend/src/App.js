import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="top-bar">
        🚚 Free shipping on orders above ₹999
        <span>|</span>
        7-day easy returns
        <span>|</span>
        🔒 Secure payments
      </div>

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <div className="logo-icon">🛒</div>
          <span>Cloud<span>Cart</span></span>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>

          <button className="icon-button">♡</button>

          <button className="cart-button">
            🛒
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
          </button>

          <button className="profile-button">◯</button>
        </div>

      </nav>

      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ WELCOME TO CLOUDCART - AKS CI/CD DEMO
          </div>

          <h1>
            Shop Smarter.
            <br />
            <span>Live Better.</span>
          </h1>

          <p>
            Discover amazing products at unbeatable prices.
            <br />
            Powered by the cloud. Delivered to you.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() =>
                document
                  .getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now →
            </button>

            <button className="secondary-button">
              Explore Categories
            </button>
          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            🎧
          </div>

          <div className="floating-card card-two">
            💻
          </div>

          <div className="shopping-cart">
            🛒
          </div>

          <div className="floating-card card-three">
            📱
          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature">
          <div className="feature-icon">🚚</div>
          <div>
            <h3>Free Shipping</h3>
            <p>On orders above ₹999</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🛡️</div>
          <div>
            <h3>Secure Payments</h3>
            <p>100% secure & trusted</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">↻</div>
          <div>
            <h3>Easy Returns</h3>
            <p>7-day easy returns</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon">🎧</div>
          <div>
            <h3>24/7 Support</h3>
            <p>We're here to help</p>
          </div>
        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories">

        <div className="section-heading">
          <div>
            <p className="section-label">EXPLORE</p>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-grid">

          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>Latest technology</p>
          </div>

          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Mobiles</h3>
            <p>Smart devices</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🎧</div>
            <h3>Accessories</h3>
            <p>Upgrade your setup</p>
          </div>

          <div className="category-card">
            <div className="category-icon">⌚</div>
            <h3>Wearables</h3>
            <p>Stay connected</p>
          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="products-section" id="products">

        <div className="section-heading">

          <div>
            <p className="section-label">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>

          <button className="view-all">
            View all products →
          </button>

        </div>

        <div className="products-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product, index) => (

              <div className="product-card" key={product.id}>

                <div className="product-image">

                  {index % 4 === 0 && (
                    <span className="product-badge purple">
                      BEST SELLER
                    </span>
                  )}

                  {index % 4 === 1 && (
                    <span className="product-badge green">
                      NEW
                    </span>
                  )}

                  {index % 4 === 2 && (
                    <span className="product-badge orange">
                      POPULAR
                    </span>
                  )}

                  <button className="wishlist">
                    ♡
                  </button>

                  <div className="product-placeholder">
                    {index % 4 === 0 && "💻"}
                    {index % 4 === 1 && "📱"}
                    {index % 4 === 2 && "🎧"}
                    {index % 4 === 3 && "⌚"}
                  </div>

                </div>

                <div className="product-info">

                  <p className="product-category">
                    ELECTRONICS
                  </p>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    ⭐ 4.8
                    <span>(128)</span>
                  </div>

                  <div className="product-bottom">

                    <div className="price">
                      ₹{product.price}
                    </div>

                  </div>

                  <button
                    className="add-cart"
                    onClick={() => addToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="no-products">
              <div>🔍</div>
              <h3>No products found</h3>
              <p>Try searching for something else.</p>
            </div>

          )}

        </div>

      </section>

      {/* PROMO */}
      <section className="promo">

        <div>
          <p>POWERED BY THE CLOUD</p>
          <h2>Great products. Great prices. One great experience.</h2>
        </div>

        <div className="azure-box">
          ☁️
          <span>Cloud Powered</span>
        </div>

      </section>

      {/* FOOTER */}
      <footer id="about">

        <div className="footer-logo">
          🛒 CloudCart
        </div>

        <p>
          Your modern cloud-powered shopping experience.
        </p>

        <div className="footer-links">
          <span>Home</span>
          <span>Products</span>
          <span>Categories</span>
          <span>Contact</span>
        </div>

        <div className="copyright">
          © 2026 CloudCart. Built with React, Flask & Azure.
        </div>

      </footer>

    </div>
  );
}

export default App;