"use client";
import { Cart, Product } from "@/interface/product";
import {
  addToCart,
  getCartPrdouctById,
  updateCart,
} from "@/services/cart.service";
import { getAllProduct } from "@/services/product.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export default function Page() {
  const account = JSON.parse(localStorage.getItem("user") || "[]");
  const cartState = useSelector((state: any) => state.cartReducer.cart);
  const route = useRouter();

  // Lưu trữ danh sách yêu thích trong state
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );

  const handleDetail1 = (id: number) => {
    route.push(`/components/Detail/${id}`);
  };

  const productState = useSelector(
    (state: any) => state.productReducer.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());

    // Load danh sách sản phẩm yêu thích từ localStorage
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoriteProducts(savedFavorites);
  }, [dispatch]);

  useEffect(() => {
    if (account.id) {
      dispatch(getCartPrdouctById);
    }
  }, [dispatch, account.id]);

  const handleAdd = async (product: Product) => {
    const existProduct = cartState.find(
      (cart: Cart) => cart.product.id === product.id
    );
    if (existProduct) {
      const updateProduct = {
        ...existProduct,
        product: {
          ...existProduct.product,
          stock: existProduct.product.stock + 1,
        },
      };
      await dispatch(updateCart(updateProduct));
    } else {
      const newCart = {
        idUser: account.id,
        product: {
          productname: product.productname,
          img: product.img,
          price: product.price,
          stock: 1,
          id: product.id,
        },
      };
      await dispatch(addToCart(newCart));
    }
  };

  // Hàm xử lý yêu thích
  const isItemInArray = (arr: Product[], item: Product): boolean =>
    arr.some((product) => product.id === item.id);

  const toggleFavorite = (product: Product) => {
    let updatedFavorites: Product[];

    if (isItemInArray(favoriteProducts, product)) {
      // Remove product from array
      updatedFavorites = favoriteProducts.filter(
        (fav) => fav.id !== product.id
      );
    } else {
      // Add product to array
      updatedFavorites = [...favoriteProducts, product];
    }

    setFavoriteProducts(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id: number) =>
    isItemInArray(favoriteProducts, { id } as Product);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const categories: Set<string> = new Set(
    productState.map((product: Product) => product.category)
  );

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="shop_section layout_padding">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Latest Products</h2>
        </div>

        {/* Categories Section */}
        <div className="mb-4">
          <ul className="flex gap-4 overflow-x-auto whitespace-nowrap">
            {/* All category */}
            <li
              onClick={() => handleCategorySelect("All")}
              className={`cursor-pointer py-2 px-4 rounded-md ${
                selectedCategory === "All"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              All
            </li>
            {Array.from(categories).map((category: string) => (
              <li
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`cursor-pointer py-2 px-4 rounded-md ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product List */}
        <div className="row">
          {productState
            .filter((product: Product) =>
              selectedCategory === "All"
                ? true
                : product.category === selectedCategory
            )
            .map((product: Product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="box relative bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="h-80">
                    <img
                      onClick={() => handleDetail1(product.id)}
                      src={product.img}
                      alt="photo"
                      className="w-full auto object-cover object-center cursor-pointer mt-5"
                    />
                  </div>
                  <div className="p-2">
                    <h6 className="text-lg font-semibold">
                      {product.productname}
                    </h6>
                    <h6 className="text-sm text-gray-600 flex justify-end items-center gap-2">
                      Price
                      <span className="font-bold text-red-500">
                        {formatPrice(product.price)}
                      </span>
                    </h6>
                  </div>
                  <div className="new p-4">
                    <button className="bg-red-400 text-white py-2 px-4 rounded">
                      New
                    </button>
                  </div>
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => toggleFavorite(product)}
                  >
                    {isFavorite(product.id) ? (
                      <HeartFilled style={{ fontSize: "25px", color: "red" }} /> // Icon khi đã yêu thích
                    ) : (
                      <HeartOutlined
                        style={{ fontSize: "25px", color: "red" }}
                      /> // Icon khi chưa yêu thích
                    )}
                  </div>
                  <button
                    className="bg-red-300 text-white w-full py-2 rounded"
                    onClick={() => handleAdd(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="btn-box mt-4">
          <a href="" className="text-blue-500 underline">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
