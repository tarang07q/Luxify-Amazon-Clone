const Loader = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-primary border-b-primary border-r-transparent border-l-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
