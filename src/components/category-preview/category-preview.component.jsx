import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, CategoryPreviewTitle, Preview } from './category-preview.styles';


const CategoryPreview = ({ title, products}) => {
  return (
    <CategoryPreviewContainer>
        <CategoryPreviewTitle>
            <Link to={title} className='title'>{title.toUpperCase()}</Link>
        </CategoryPreviewTitle>
        <Preview>
            {products.filter((_, idx) => idx < 4).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;
