import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-1">
        {[...Array(pages).keys()].map((x) => (
          <li key={x + 1}>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/products/${x + 1}`
              }
              className={`px-3 py-2 rounded ${
                x + 1 === page
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
