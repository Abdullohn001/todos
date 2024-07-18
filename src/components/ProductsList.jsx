//rrd import
import { useLoaderData } from "react-router-dom";
//components
import Product from "./Product";

function ProductsList({ withibleProduct }) {
  const {
    products: { products },
  } = useLoaderData();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.slice(0, withibleProduct).map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
