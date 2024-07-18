//costum Fetch
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
//import react
import { useState } from "react";

//Loader
export const loader = async ({ params }) => {
  const requset = await customFetch(`${params.id}`);
  const product = requset.data;

  return { product };
};

//global context
import { useGlobalContext } from "../hooks/useGlobalContext";

function SingleProduct() {
  const { addToCart } = useGlobalContext();
  const { product } = useLoaderData();
  // console.log(product)

  const [amount, setAmount] = useState(0);

  const handleAddToCart = () => {
    const newProduct = {
      ...product,
      amount,
    };
    addToCart(newProduct);
  };

  return (
    <div className="h-lvh p-12">
      <div className="card card-side bg-slate-100 shadow-xl">
        <figure className="bg-slate-200 ">
          <img
            className="md:max-w-[400px] lg:max-w-[500px]"
            src={product.thumbnail}
            alt="Movie"
          />
        </figure>
        <div className="flex flex-col justify-between py-10">
          <div className="px-10">
            <h2 className="md:text-xl lg:w-full font-serif font-bold text-4xl text-center mb-10">
              {product.title}
            </h2>
            <p className="text-center w-full mb-10 italic">
              {product.description}
            </p>

            <div className="bg-slate-200 p-5 rounded-[25px] mb-10">
              <p className="font-semibold font-serif ">Price:</p>
              <p className="font-medium flex gap-10">
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
                $
                <span className="opacity-50 line-through">
                  {product.price}$
                </span>
                <span className="bg-[#FF3090] text-white px-6 rounded-lg italic select-none">
                  Sale
                </span>
              </p>
            </div>
          </div>
          <div className="card-actions justify-center items-center bg-base-300 py-3">
            <button
              onClick={() => setAmount((prev) => (prev += 1))}
              className="btn w-10 bg-slate-300 text-xl font-serif font-semibold"
            >
              +
            </button>
            <p className="mx-5 font-serif fontsem select-none">{amount}</p>
            <button
              disabled={amount == 0 && true}
              onClick={() => setAmount((prev) => (prev -= 1))}
              className="btn w-10 bg-slate-300 text-xl  font-serif font-semibold"
            >
              -
            </button>
            <button onClick={handleAddToCart} className="btn w-40 btn-info">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
