"use client";

import API from "@/API";
import { IApiRespons, IProduct } from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState } from "react";
import ProductSearchItem from "./ProductSearchItem";
import { useSearchFocused } from "@/store/SearchFocused";
import { useCartsStore } from "@/store/CartStore";
import { useFavoriteStore } from "@/store/FavoriteStore";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: string;
}

export default function Header() {
  const ref = useRef<HTMLInputElement>(null);
  const { isFocused, toggleFocus } = useSearchFocused();
  const { carts } = useCartsStore();
  const { favorites } = useFavoriteStore();

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await API.get<IApiRespons<IProduct[]>>(
        `/products?limit=${6}&skip=${10}`
      );
      return res?.data;
    },
  });

  const {
    data: SearchProducts,
    isLoading: SearchProductLoading,
    error: SearchProductError,
  } = useQuery({
    queryKey: ["search products", searchValue],
    queryFn: async () => {
      const res = await API.get<IApiRespons<IProduct[]>>(
        `/products/search?q=${searchValue.trim().toLowerCase()}`
      );
      return res?.data;
    },
    enabled: searchValue.length ? true : false,
  });

  console.log(SearchProducts);

  const productSearch = SearchProducts?.products?.slice(0, 6);

  return (
    <header>
      <div className="container mx-auto">
        <div
          className={`grid grid-cols-[2fr_530px_1fr] gap-10 items-center justify-between py-4 mb-5`}
        >
          <Link href="/" className="text-[26px] font-bold text-[#7000FFFF]">
            Online Market
          </Link>

          <div className="relative flex items-center w-full h-12 border border-gray-300 rounded-lg">
            <input
              ref={ref}
              type="text"
              onFocus={() => toggleFocus()}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-none pl-6 outline-none w-full"
              placeholder="Search..."
            />
            <button className="h-12 text-white bg-[#7000FFFF] rounded-r-lg w-22">
              <i className="text-[20px] bi bi-search"></i>
            </button>

            {isFocused && (
              <div
                onClick={() => toggleFocus()}
                className="fixed bg-[#0008] top-17 flex justify-center items-start left-0 h-screen w-full z-100"
              >
                <div className="bg-white max-w-132.5 -translate-x-18 rounded-sm p-5">
                  <ul className="grid grid-cols-3 gap-3">
                    {productLoading &&
                      Array.from({ length: 6 }).map((_, index) => (
                        <li
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-sm duration-300 flex flex-col animate-pulse"
                        >
                          <div className="relative w-full h-70 overflow-hidden">
                            <div className="flex justify-center items-center h-full bg-gray-200"></div>
                            <span className="absolute bottom-2 left-4 h-4 w-16 bg-gray-300 rounded"></span>
                          </div>

                          <div className="flex flex-col p-4 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>

                            <div className="flex justify-between items-center mt-2">
                              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                            </div>
                            <div className="h-9 bg-gray-300 rounded-lg mt-3"></div>
                          </div>
                        </li>
                      ))}

                    {(() => {
                      const items = SearchProducts?.products?.length
                        ? productSearch
                        : products?.products?.length
                        ? products.products
                        : [];

                      return items?.map((product) => (
                        <ProductSearchItem
                          key={`${product.id}-${product.title}`}
                          product={product}
                        />
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <nav className="flex items-center gap-4">
            <Link
              href="/favorite"
              className={`flex relative items-center gap-3 hover:bg-gray-200 rounded-lg transition-all duration-300 p-[10px_50px_10px_30px] cursor-pointer`}
            >
              <i className={`bi bi-heart text-[20px]`}></i>
              <span className="text-[18px] font-medium">Favorites</span>
              {favorites.length ? (
                <div className="absolute right-2 p-[4px_8px] bg-[#7000ff] text-white">
                  {favorites.length}
                </div>
              ) : (
                ""
              )}
            </Link>
            <Link
              href="/basket"
              className={`flex relative items-center gap-3 hover:bg-gray-200 rounded-lg transition-all duration-300 p-[10px_50px_10px_30px] cursor-pointer`}
            >
              <i className={`bi bi-bag text-[20px]`}></i>
              <span className="text-[18px] font-medium">Basket</span>
              {carts.length ? (
                <div className="absolute right-2 p-[4px_8px] bg-[#7000ff] text-white">
                  {carts.length}
                </div>
              ) : (
                ""
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
