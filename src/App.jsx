import { useEffect, useState } from 'react'
import './App.css'
import { data,categories } from './Data' 
import ProductCard from './components/ProductCard';
function App() {
  const [products, setProducts] = useState(null);
  const [selectedCategories,setSelectedCategories]=useState([]);
  const [selectedRating,setSelectedRating]=useState(0);
  const [sortOrder,setSortOrder]=useState(0); 
  const [maxPrice,setMaxPrice]=useState(1000);
  const handleChange=(e)=>{
    const {value,checked}=e.target;
    if(checked){
      setSelectedCategories([...selectedCategories,value]);
    }
    else{
      setSelectedCategories(selectedCategories.filter((option)=>option!==value));
    }
  }
  const handleRatingChange=(e)=>{
    const {value,checked}=e.target;
    if(checked){
      setSelectedRating(value);
    }
    else{
      setSelectedRating(0);
    }
  }
  const handlePriceChange=(e)=>{
    setMaxPrice(e.target.value);
  }
  const handleSortOrderChange=(e)=>{
    setSortOrder(e.target.value);
  }
  useEffect(()=>{
    let newData=[...data];    
    if(selectedCategories.length>0){
      newData=newData.filter((option)=>selectedCategories.includes(option.category))
    }
    if(selectedRating!=0){
      newData=newData.filter((option)=>option.rating.rate>selectedRating)
    }
    if(maxPrice<999){
      newData=newData.filter((option)=>option.price<=maxPrice);
    }
    if(sortOrder==0){
      setProducts(newData);
    }
    else{
      if(sortOrder=='2'){
        newData.sort((a,b)=>a.price-b.price);
      }
      else
        newData.sort((a,b)=>b.price-a.price);
    }
    setProducts(newData);
  },[selectedCategories,selectedRating,sortOrder,maxPrice])
  
  return (
    <div className='flex flex-wrap mt-10 w-full'>
      <div className='h-lvh w-[200px] basis-1/4 text-left px-4'>
        <div>
          <select className='px-3 py-2' onChange={handleSortOrderChange}>
            <option value={0}>Relevance</option>
            <option value={1}>Price (High to Low)</option>
            <option value={2}>Price (Low to High)</option>
          </select>
        </div>
        <h1 className='text-xl font-bold mt-4'>Categories</h1>
        <div className='flex flex-col items-start '>
        {
          categories.map((val,key)=>{
            return <label key={key}>
                  <input onChange={handleChange} type='checkbox'  value={val}/> {val}
                </label>
          })
        }
        </div>
        <h1 className='text-xl font-bold mt-4'>Ratings</h1>
        <div className='flex flex-col items-start '>
          <label>
            <input onChange={handleRatingChange} checked={selectedRating==4} type='checkbox' value={4}/> 4 and above 
          </label>
          <label>
            <input onChange={handleRatingChange} checked={selectedRating==3} type='checkbox' value={3}/> 3 and above 
          </label>
          <label>
            <input onChange={handleRatingChange} checked={selectedRating==2} type='checkbox' value={2}/> 2 and above 
          </label>
          <label>
            <input onChange={handleRatingChange} checked={selectedRating==1} type='checkbox' value={1}/> 1 and above 
          </label>
        </div>
        <div className='mt-4'>
          <p>Max Price</p>
          <input type='range' value={maxPrice} min={20} max={1000} onChange={handlePriceChange}/>
          <p>${maxPrice}</p>
        </div>
      </div>
      <div className='flex basis-3/4 w-full justify-around flex-wrap '>
        { products && 
          products.map((value)=>{
            return <ProductCard info={value} key={value.id}/>
          })
        }
      </div>
    </div>
  )
}

export default App
