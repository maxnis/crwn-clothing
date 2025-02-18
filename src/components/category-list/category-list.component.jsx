import './category-list.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const CategoryList = ({ data }) => {
  return (
    <div className="categories-container">
      {data.map(category => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoryList;