import { useCartsStore } from "@/store/CartStore";
import { IProduct } from "@/types/products";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  product: IProduct;
}

export default function ProductCartItem({ product }: IProps) {
  const router = useRouter();

  const { handleAddToCart, handleDeleteFromCart, carts, handleDeleteProduct } =
    useCartsStore();

  return (
    <li className="w-full p-[10px_20px_0_20px] bg-white">
      <div className=" mb-8">
        <span className="text-[12px] text-[#7e818c]">
          Uzum Market yetkazib berishi
        </span>
        <h3 className="text-[18px] font-semibold text-[#1f2026]">
          Ertaga yetkazib beramiz
        </h3>
      </div>
      <div className="flex items-start gap-4">
        <Image
          onClick={() => router.push(`/product/${product.id}`)}
          width={150}
          height={100}
          src={product?.thumbnail}
          alt={product.title}
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between">
            <p className="text-sm mb-5 max-w-[80%] text-gray-500">
              {product?.description}
            </p>
            <button
              onClick={() => handleDeleteProduct(product)}
              className="flex items-center cursor-pointer gap-1.25 text-[18px] text-[gray]"
            >
              <i className="bi bi-trash3-fill"></i>
              <span>delete</span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              <span className="text-[12px] text-gray-500">saller :</span>
              <span className="text-[14px] ml-2.5">
                {product?.shippingInformation}
              </span>
            </h3>
            <div className="flex items-center w-62.5 justify-between">
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteFromCart(product)}
                    className="bg-white border px-2 rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span className="">{product.count}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className=" bg-white border px-2 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className=" text-[24px] text-[#7000FFFF] font-bold">
                {product.price}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-center border border-gray-200 h-px"></div>
    </li>
  );
}
