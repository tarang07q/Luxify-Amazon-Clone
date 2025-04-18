const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-8 rounded-lg shadow-xl border border-gray-200" style={{ color: '#1e293b' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
