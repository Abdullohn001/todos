//components
import ProductsList from "../components/ProductsList";

//costun Fetch
import { customFetch } from "../utils";
//import react
import { useState } from "react";

//Loader
export const loader = async () => {
  const requset = await customFetch();
  const products = requset.data;

  return { products };
};

function Home() {
  const [withibleProduct, setWithibleProduct] = useState(8);
  return (
    <div className="w-full">
      <ProductsList withibleProduct={withibleProduct} />
      <div className="flex justify-center my-10">
        {" "}
        <button
          className="btn btn-info px-10 tracking-[2px]"
          onClick={withibleProduct == 32?() => setWithibleProduct(8): () => setWithibleProduct((prev) => prev + 8)}
        >
          {withibleProduct == 32 ? "See Less " : "See More"}
        </button>
      </div>
    </div>
  );
}

export default Home;
