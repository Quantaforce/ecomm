const ProductCard = ({info}) => {
  return (
    <div className="max-w-56 mr-4 basis-1/4 mb-4 bg-white text-black px-4 py-3 rounded-lg border">
      <div className="h-[200px] flex justify-center">
        <img src={info.image} className="h-full"/>    
      </div>
      <div className="mt-5">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap text-l">{info.title}</p>
        <div className="text-left mt-2">
          <p className="overflow-hidden text-xs text-gray-400">Rating {info.rating.rate} ({info.rating.count})</p>
          <p className="overflow-hidden text-sm font-bold">${info.price}</p>
        </div>
        <div className="flex justify-between mt-2">
          <button className="bg-yellow-500 px-2 py-2 rounded-lg text-white">Wishlist</button>
          <button className="bg-blue-400 px-2 py-2 rounded-lg text-white">Buy now</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
