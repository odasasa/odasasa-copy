import { Img, Typography } from "@/components";
import { Product } from "@/types";

interface ProductCardProps {
    product:Product
    handleAddToCart:any
}

export default function ProductCard({product, handleAddToCart}:ProductCardProps) {


    return <div  className="w-full flex flex-col gap-2 aspect-w-2 aspect-h-1 shadow-2xl border bg-white px-3 py-2" >
        <div className="w-full flex mb-1 h-full">
            <div className="w-1/2 flex justify-center items-center h-full">

                <Img src={`/vendors/vendor/${product.img}`} alt={`${product.img?.split('.')[0]} Image`} />
            </div>
            <div className="w-1/2 flex flex-col px-2 gap-2">
                <Typography variant="h2" className="text-product-gold font-bold text-2xl">{product.title}</Typography>
                <span className="text-black font-bold">Ksh. {product.price}</span>
                <hr className="w-full  border border-t-2" />
                <Typography variant ='p' className="text-gray-600 font-light">{product.unit}</Typography>
                <Typography variant ='p' className="text-gray-600 font-light">{product.description}</Typography>
            </div>
        </div>
        <div className="w-full ">
            <button className="mx-auto w-full px-8 py-3 bg-product-blue
   text-white hover:opacity-75 transition duration-75"
                onClick={() => handleAddToCart(product)}>Add To Cart</button>
        </div>
    </div>
}