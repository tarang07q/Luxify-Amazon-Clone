import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FeaturedProductsManager from '../../components/admin/FeaturedProductsManager';
import { useTheme } from '../../context/ThemeContext';

const FeaturedProductsPage = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-white rounded-lg shadow-md p-6" style={{
      backgroundColor: theme.cardBg,
      color: theme.text,
      boxShadow: theme.shadow
    }}>
      <div className="flex items-center mb-6">
        <Link to="/admin/products" className="flex items-center text-primary hover:underline mr-4" style={{ color: theme.primary }}>
          <FaArrowLeft className="mr-1" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: theme.text }}>Featured Products</h1>
      </div>

      <FeaturedProductsManager />
    </div>
  );
};

export default FeaturedProductsPage;
