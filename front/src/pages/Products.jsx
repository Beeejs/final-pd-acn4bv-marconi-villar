/* Components */
import ProductList from "../components/products/ProductList";
import ProductControl from "../components/products/ProductControl";

const Products = () => {

  return (
    <section className="flex flex-col justify-center items-center gap-12 h-full">
      <ProductControl/>
      <ProductList title={'Productos'}/>
    </section>
  );
};
export default Products;