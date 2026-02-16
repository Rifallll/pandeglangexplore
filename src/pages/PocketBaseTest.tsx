import { useDestinations } from '@/hooks/useDestinations';
import { getImageUrl } from '@/services/pocketbase';

const PocketBaseTest = () => {
    const { destinations, loading, error } = useDestinations();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A065] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading destinations from PocketBase...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Error: {error}</p>
                    <p className="text-gray-600 mt-2">Make sure PocketBase is running on http://localhost:8090</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">
                    PocketBase Test - Destinations
                </h1>

                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Connection Status</h2>
                    <div className="space-y-2">
                        <p className="text-green-600 font-semibold">✅ Connected to PocketBase</p>
                        <p className="text-gray-600">Total destinations: {destinations.length}</p>
                        <p className="text-gray-600">API URL: http://127.0.0.1:8090</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {dest.image && (
                                <img
                                    src={getImageUrl(dest, dest.image)}
                                    alt={dest.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            {!dest.image && (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-400">No image</p>
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="inline-block px-3 py-1 bg-[#C5A065] text-white text-xs font-bold rounded-full">
                                        {dest.category}
                                    </span>
                                    {dest.rating && (
                                        <span className="text-yellow-500 font-semibold">
                                            ⭐ {dest.rating}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-2">{dest.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{dest.description}</p>

                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-500">
                                        📍 {dest.location}
                                    </p>
                                    {dest.price && (
                                        <p className="text-gray-500">
                                            💰 {dest.price}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400">
                                        ID: {dest.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {destinations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No destinations found in PocketBase</p>
                        <p className="text-gray-500 mt-2">Add some destinations in the PocketBase admin panel</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PocketBaseTest;
