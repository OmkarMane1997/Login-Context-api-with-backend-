import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                Go Back
            </button>
        </div>
    );
};

export default NotAuthorized;
