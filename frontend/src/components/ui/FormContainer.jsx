import { useTheme } from '../../context/ThemeContext';

const FormContainer = ({ children }) => {
  const { theme, currentTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div
          className="w-full md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-xl"
          style={{
            backgroundColor: currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
            border: `1px solid ${currentTheme === 'dark' ? 'rgba(0, 242, 255, 0.2)' : 'rgba(80, 70, 229, 0.2)'}`,
            boxShadow: currentTheme === 'dark' ? '0 0 20px rgba(0, 242, 255, 0.1)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            color: theme.text
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
