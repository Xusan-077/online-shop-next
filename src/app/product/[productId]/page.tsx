"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { IProduct } from "@/types/products";
import Rating from "@/components/Rating";
import { useEffect, useState } from "react";
import { useFavoriteStore } from "@/store/FavoriteStore";
import API from "@/API";
import { useCartsStore } from "@/store/CartStore";

export default function ProductDetail() {
  const params = useParams();
  const productId = params?.productId as string;

  const { favorites, toggleToFavorite } = useFavoriteStore();
  const { handleAddToCart, handleDeleteFromCart, carts } = useCartsStore();

  const router = useRouter();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      const res = await API.get<IProduct>(`/product/${productId}`);

      return res?.data;
    },
    queryKey: ["product", productId],
  });

  const [img, setImg] = useState<string>(
    product?.images[1] || product?.images[2] || ""
  );

  const inCart = carts.find((el) => el.id == product?.id);

  useEffect(() => {
    setImg(product?.images[1] || product?.images[2] || "");
  }, [product]);

  return (
    <section className="">
      <div className="container">
        {isLoading ? (
          <div className="container">
            <div className="mb-10">
              <div className="h-6 w-50 bg-gray-300 rounded animate-pulse mb-1.25"></div>
              <div className="h-5 w-25 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex gap-10">
                <div className="flex flex-col gap-2.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-21 rounded-lg bg-gray-300 animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="bg-gray-300 rounded-lg w-75 h-100 animate-pulse"></div>
                  <div className="bg-gray-300 rounded-lg w-75 h-100 animate-pulse"></div>
                </div>
              </div>

              <div className="w-[35%]">
                <div className="border border-gray-300 p-7.5 rounded-lg mb-4">
                  <div className="h-12.25 w-37.5 bg-gray-300 rounded animate-pulse mb-4"></div>
                  <div className="h-5 w-25 bg-gray-300 rounded animate-pulse mb-2.5"></div>
                  <div className="h-3.5 w-full bg-gray-300 rounded animate-pulse mb-5"></div>
                  <div className="h-5 w-25 bg-gray-300 rounded animate-pulse mb-10"></div>

                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-25 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-25 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-25 bg-gray-300 rounded animate-pulse"></div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full h-11.25 bg-gray-300 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                <div className="border border-gray-300 p-5 rounded-lg mb-3">
                  <div className="h-6.25 w-25 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="h-4.5 w-25 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg p-6.25 w-full animate-pulse"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="h-4 w-25 bg-gray-300 rounded"></div>
                    <div className="h-4 w-25 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-2.5 w-full bg-gray-300 rounded mb-2"></div>
                  <div className="h-2.5 w-25 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2.5 w-full bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-[30px] flex justify-center my-10">
            Product not found
          </p>
        ) : (
          <div className="">
            <div className="mb-10">
              <span className="text-[30px] mb-2 block font-semibold">
                {product?.title}
              </span>
              <Rating rating={product?.rating || 0} />
            </div>

            <div className="grid grid-cols-[1fr_385px] gap-10 mb-10 items-start">
              <div className="flex gap-5">
                <div className="">
                  {product?.images?.map((image) => (
                    <div
                      onClick={() => setImg(image)}
                      key={image}
                      className="bg-gray-200 rounded-lg mb-2"
                    >
                      <img src={image} alt="" className="w-20 h-20" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-200 rounded-lg">
                    <img
                      src={product?.thumbnail}
                      alt=""
                      className="w-105 h-100"
                    />
                  </div>
                  {img ? (
                    <div className="bg-gray-200 rounded-lg">
                      <img src={`${img}`} alt="" className="w-105 h-100" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="border border-[#979797] p-[24px_20px] rounded-lg">
                <h3 className="text-[32px] mb-5 text-[#7000FF] font-bold">
                  {product?.price}$
                </h3>

                <div className=" mb-5">
                  <span className="block text-[14px] mb-2">
                    {product?.stock} you can buy
                  </span>
                  <span className="block text-[14px] mb-2">
                    {product?.warrantyInformation} warranty Information
                  </span>
                </div>

                <div className="">
                  <span className="text-[18px] font-semibold mb-2 block">
                    dimensions
                  </span>
                  <div className="">
                    <div className="flex flex-col gap-2 mb-5">
                      <span className="">
                        depth: {product?.dimensions.depth} cm
                      </span>
                      <span className="">
                        height: {product?.dimensions.height} cm
                      </span>
                      <span className="">
                        width: {product?.dimensions.width} cm
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_70px] items-center gap-2">
                  {inCart ? (
                    <div className="grid grid-cols-[3fr_1fr] gap-2">
                      <div
                        onClick={(e): void => e.stopPropagation()}
                        className="justify-between p-1.25 cursor-pointer flex items-center bg-[#F0F2F5FF] w-full gap-1.25 rounded-lg"
                      >
                        <button
                          onClick={(): void => handleDeleteFromCart(product!)}
                          className="cursor-pointer text-[20px] text-black bg-white w-6.25 flex items-center justify-center"
                        >
                          -
                        </button>
                        <p className="text-[18px]">{inCart.count}</p>
                        <button
                          onClick={(): void => handleAddToCart(product!)}
                          className="cursor-pointer text-[20px] text-black bg-white w-6.25 rounded-lg flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div
                        onClick={() => router.push("/basket")}
                        className="bg-[#E5E5FFFF] cursor-pointer text-[#7000FF] rounded-lg flex items-center justify-center"
                      >
                        Visit
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("click");

                        handleAddToCart(product!);
                        console.log(carts);
                      }}
                      className="bg-[#7000FF] w-full p-2 rounded-lg text-white flex justify-center items-center gap-1 cursor-pointer"
                    >
                      Savatga
                    </button>
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();

                      toggleToFavorite(product!);
                    }}
                    className="bg-gray-200 h-full w-full cursor-pointer rounded-lg flex items-center justify-center"
                  >
                    {favorites.find((el) => el.id == product?.id) ? (
                      <i
                        className={`bi bi-heart-fill text-red-500 text-[22px]`}
                      ></i>
                    ) : (
                      <i className={`bi bi-heart text-[22px]`}></i>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ul className="grid grid-cols-3 gap-3">
              {product?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-500 rounded-lg p-6.25 w-full"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="">Alexander Jones</span>
                    <Rating rating={review.rating} bottom={true} nan small />
                  </div>
                  <h2 className="text-[14px] text-gray-500">
                    Would buy again!
                  </h2>
                  <span className="">2025/04/30</span>
                  <span className="block">alexander.jones@x.dummyjson.com</span>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
