import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';

const CategoryList = ({ data }) => {
  return (
    <DirectoryContainer>
      {data.map(category => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
}

export default CategoryList;