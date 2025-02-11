import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumbArray }) => {
  // ✅ Prevent rendering if breadcrumbArray is missing or empty
  if (!breadcrumbArray || breadcrumbArray.length === 0) return null;
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbArray.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item?.url ? (
              <Link
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to={item.url}
              >
                {item.name}
              </Link>
            ) : (
              item?.name
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
