import { ShoppingCart } from "lucide-react";
import { colors2 } from "../../shared/utils/colors";
import Layout from "../layout/Layout";

//TODO: aici trebuie lucrat
const EffectsStore = () => {
  return (
    <Layout relative={false}>
      <div className=" px-32">
        <div className="text-white text-4xl  ">Effects store</div>
        <div className="grid grid-cols-3 p-4">
          {StoreCard({
            title: "Tiny walkers",
            price: "$10",
            imagePath: "/new/COOL-STREAM.png",
          })}
          {StoreCard({
            title: "Starting soon boats",
            price: "$5",
            imagePath: "/boat.jpg",
          })}
        </div>
      </div>
    </Layout>
  );

  function StoreCard({
    title,
    price,
    imagePath,
  }: {
    title: string;
    price: string;
    imagePath: string;
  }) {
    return (
      <div className="w-[400px] h-[200px] ">
        <div className=" flex justify-center bg-red-300 rounded-2xl">
          <img
            className="h-[200px] hover:scale-110 transition-transform duration-300 ease-in-out"
            src={imagePath}
          />
        </div>
        <div className="flex justify-between py-2">
          <h1 className="text-start text-xl ">{title}</h1>
          <div className="flex space-x-4">
            <h1 className="text-start text-xl  ">{price}</h1>
            {/* cart button icon */}
            <div
              className=""
              style={{ color: colors2.text }}
              onClick={() => {
                console.log("cart");
              }}
            >
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EffectsStore;
