import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useChat } from '../hooks/useChat';
import { uploadImageForENS } from '../utils/pinata';
import { ArrowLeft, Upload, User, Image } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
    const { address } = useAccount();
    const { registerUser, domain, registrationFee } = useChat();
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.image) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const uploadResult = await uploadImageForENS(formData.image, formData.name);
            
            if (!uploadResult.success) {
                throw new Error(uploadResult.error || 'Failed to upload image');
            }
            await registerUser(formData.name, uploadResult.ipfsHash);
            onNavigate('users');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md mx-auto">
                <button
                    onClick={() => onNavigate('landing')}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </button>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Register Your ENS Name
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your name (e.g., deny)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formData.name && domain && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Your ENS will be: <span className="font-medium">{formData.name}.{domain}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Image className="w-4 h-4 inline mr-2" />
                                Profile Image
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full mx-auto object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('imageInput').click()}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('imageInput').click()}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Upload Image
                                        </button>
                                    </div>
                                )}
                            </div>
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {registrationFee > 0 && (
                            <div className="bg-yellow-50 p-3 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    Registration Fee: {(Number(registrationFee) / 1e18).toFixed(4)} ETH (on Lisk)
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 p-3 rounded-lg">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || !formData.name || !formData.image}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isLoading ? 'Registering...' : 'Register ENS Name'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
