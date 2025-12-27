"use client";

import { useQuery } from "@tanstack/react-query";
import { IApiRespons, IProduct } from "@/types/products";
import ProductItem from "@/components/ProductItem";
import { useState } from "react";
import API from "@/API";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const {
    data: products,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["products", page, itemsPerPage],
    queryFn: async () => {
      const res = await API.get<IApiRespons<IProduct[]>>(
        `/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
      );
      return res?.data;
    },
  });

  const totalPages = products ? Math.ceil(products.total / itemsPerPage) : 1;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <section>
      <div className="container">
        <h2 className="flex items-center cursor-pointer my-10">
          <span className="text-[28px] font-bold">Products</span>
          <i className="text-[20px] ml-3 bi bi-caret-right-fill"></i>
        </h2>

        {productError ? (
          <p className="text-red-500 text-[30px] flex justify-center my-10">
            Products not found
          </p>
        ) : (
          <>
            <ul className="grid grid-cols-4 gap-10">
              {productLoading
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
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
                  ))
                : products?.products?.map((product) => (
                    <ProductItem
                      key={`${product.id}-${product.title}`}
                      product={product}
                    />
                  ))}
            </ul>
            <div className="flex items-center justify-center gap-5 mt-6">
              <div className="mt-6">
                <select
                  name="itemsPerPage"
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setPage((p) => p);
                  }}
                  className="px-3 py-1 border rounded-lg border-[#979797]"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="flex items-center justify-center gap-5 mt-6">
                <button
                  disabled={!hasPrev}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 border rounded-lg border-[#979797]  disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  disabled={!hasNext}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 border rounded-lg border-[#979797] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
