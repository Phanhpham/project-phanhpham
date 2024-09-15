"use client";
import { getCartPrdouctById } from "@/services/cart.service";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "@/interface/product"; // Import your product interface

export default function Header() {
  const { id } = useParams();
  const cartState = useSelector((state: any) => state.cartReducer.cart);
  const router = useRouter();
  const account = JSON.parse(localStorage.getItem("user") || "[]");
  const dispatch = useDispatch();

  const [showFavorites, setShowFavorites] = useState(false); // State to toggle favorites list
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]); // State to store favorite products

  // Hàm cập nhật danh sách yêu thích từ localStorage
  const updateFavoriteProducts = () => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoriteProducts(savedFavorites);
  };

  useEffect(() => {
    if (account.id) {
      dispatch(getCartPrdouctById(account.id));
    }
    updateFavoriteProducts();

    // Lắng nghe sự kiện thay đổi localStorage từ các tab khác hoặc thay đổi
    window.addEventListener("storage", updateFavoriteProducts);

    return () => {
      window.removeEventListener("storage", updateFavoriteProducts);
    };
  }, [dispatch, account.id]);

  const handleClick = (id: number) => {
    router.push(`/components/CartProduct/${id}`);
  };

  // Hàm xử lý hiển thị danh sách yêu thích
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); // Toggle visibility
  };

  // Hàm để đóng danh sách yêu thích
  const closeFavorites = () => {
    setShowFavorites(false);
  };

  return (
    <header className="header_section">
      <nav className="navbar navbar-expand-lg custom_nav-container ">
        <a className="navbar-brand" href="index.html">
          <span>Giftos</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="" />
        </button>
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="index.html">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="shop.html">
                Shop
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="why.html">
                Why Us
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="testimonial.html">
                Testimonial
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="contact.html">
                Contact Us
              </a>
            </li>
          </ul>
          <div className="flex gap-4 justify-around items-center relative">
            <div className="flex gap-2 items-center">
              <i className="fa fa-user" aria-hidden="true" />
              <Link href="/components/Login" className="text-black">
                {account.username}
              </Link>
            </div>
            <button onClick={() => handleClick(account.id)}>
              <i className="fa fa-shopping-bag" aria-hidden="true" />
              <span className="rounded w-3 h-3">{cartState.length}</span>
            </button>
            <form className="form-inline ">
              <button className="btn nav_search-btn" type="submit">
                <i className="fa fa-search" aria-hidden="true" />
              </button>
            </form>
            {/* Yêu thích */}
            <button onClick={toggleFavorites} className="relative">
              <i className="fa fa-regular fa-heart"></i>
            </button>

            {/* Danh sách yêu thích (chỉ hiển thị khi người dùng click) */}
            {showFavorites && (
              <div className="absolute top-12 right-0 w-64 bg-white shadow-lg rounded p-4 z-50">
                <div className="flex justify-between items-center">
                  <h4>Favorites</h4>
                  <button onClick={closeFavorites}>
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </div>
                {favoriteProducts.length > 0 ? (
                  <ul className="pl-0">
                    {favoriteProducts.map((product: Product) => (
                      <li
                        key={product.id}
                        className="flex justify-between items-center my-2"
                      >
                        <span>{product.productname}</span>
                        <img
                          src={product.img}
                          alt={product.productname}
                          className="w-10 h-10"
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No favorite products</p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
