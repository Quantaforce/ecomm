import { useEffect, useState } from 'react'
import './App.css'
import { data,categories } from './Data' 
import ProductCard from './components/ProductCard';
function App() {
  const [products, setProducts] = useState(null);
  const [selectedCategories,setSelectedCategories]=useState([]);
  const [selectedRating,setSelectedRating]=useState(0);
  
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
  console.log('ratings',selectedRating)
  useEffect(()=>{
    let newData=data;    
    if(selectedCategories.length>0){
      newData=newData.filter((option)=>selectedCategories.includes(option.category))
    }
    if(selectedRating!=0){
      newData=newData.filter((option)=>option.rating.rate>selectedRating)
    }
    setProducts(newData);
  },[selectedCategories,selectedRating])
  
  return (
    <div className='flex flex-wrap mt-10 w-full'>
      <div className='h-lvh w-[200px] basis-1/4 text-left px-4'>
        <h1 className='text-xl font-bold'>Categories</h1>
        <div className='flex flex-col items-start '>
        {
          categories.map((val,key)=>{
            return <label>
                  <input onChange={handleChange} type='checkbox' key={key} value={val}/> {val}
                </label>
          })
        }
        </div>
        <h1 className='text-xl font-bold mt-2'>Ratings</h1>
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
      </div>
      <div className='flex basis-3/4 w-full justify-around flex-wrap '>
        { products && 
          products.map((value,key)=>{
            return <ProductCard info={value} key={key}/>
          })
        }
      </div>
    </div>
  )
}

export default App
