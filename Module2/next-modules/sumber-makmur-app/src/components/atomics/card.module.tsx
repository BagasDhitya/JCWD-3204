export interface ICard {
    name: string;
    category: string;
    imageUrl: string;
    description: string;
    price: number;
}

export default function Card({ name, category, imageUrl, description, price }: ICard) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden w-80 h-full border border-gray-200">
            <img src={imageUrl === "https://www.sumbermakmur.com" ? imageUrl : 'https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg'} alt={name} width={320} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                <p className="text-sm text-gray-500">{category}</p>
                <p className="text-gray-700 mt-2 text-sm">{description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">Rp {price.toLocaleString()}</p>
            </div>
        </div>
    )
}
