import React from 'react'
import './productCategory.scss'
import { useNavigate } from 'react-router-dom';

const categories = [
    {
      id: 1,
      title: "Gadgets",
      image: "https://i.ibb.co/5GVkd3m/c1.jpg",
    },
    {
      id: 2,
      title: "Womens Fashion",
      image: "https://i.ibb.co/nQKLjrW/c2.jpg",
    },
    {
      id: 3,
      title: "Sport Sneakers",
      image: "https://i.ibb.co/fNkBYgr/c3.jpg",
    },
];

const CategoryCard = ({title,image}) => {
    const navigate = useNavigate();
    return(
        <div className="category">
            <h3>{title}</h3>
            <img src={image} alt='category'></img>
            <button className='--btn' onClick={() => {
                navigate("/shop")
            }}>Shop Now</button>
        </div>
    )
}

const ProductsCategory = () => {
  return (
    <div className="categories">
        {categories.map((cat) => {
            return(
                <div key={cat.id} className='--flex-center'>
                    <CategoryCard title={cat.title} image={cat.image}></CategoryCard>
                </div>
            )
        })}
    </div>
  )
}

export default ProductsCategory