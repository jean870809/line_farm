import { useState } from 'react';


import AnimitsuIcon from './assets/tags/Animitsu.jpeg';
import CheeseIcon from './assets/tags/Cheese.jpeg';
import EarringsIcon from './assets/tags/Earrings.jpeg';
import Glod_IngotIcon from './assets/tags/Glod_Ingot.jpeg';
import Macha_IceCreamIcon from './assets/tags/Macha_IceCream.jpeg';
import Prawn_SushiIcon from './assets/tags/Prawn_Sushi.jpeg';
import SapphireIcon from './assets/tags/Sapphire.jpeg';
import Sapphire_TiaraIcon from './assets/tags/Sapphire_Tiara.jpeg';
import TunaIcon from './assets/tags/Tuna.jpeg';


import Pirate_Brown from './assets/roles/Pirate_Brown.jpg';
import Honeybee_Sally from './assets/roles/Honeybee_Sally.jpg';
import W_Brown_2 from './assets/roles/W_Brown_2.jpg';
// 標籤數據
const tagData = {
    Animitsu: {
        id: 'Animitsu',
        name: '餡蜜',
        icon: AnimitsuIcon
    },
    Cheese: {
        id: 'Cheese',
        name: '起司',
        icon: CheeseIcon
    },
    Prawn_Sushi: {
        id: 'Prawn_Sushi',
        name: '蝦壽司',
        icon: Prawn_SushiIcon
    },
    Earrings: {
        id: 'Earrings',
        name: '耳環',
        icon: EarringsIcon
    },
    Glod_Ingot: {
        id: 'Glod_Ingot',
        name: '金塊',
        icon: Glod_IngotIcon
    },
    Macha_IceCream: {
        id: 'Macha_IceCream',
        name: '抹茶冰淇淋',
        icon: Macha_IceCreamIcon
    },
    Sapphire: {
        id: 'Sapphire',
        name: '藍寶石',
        icon: SapphireIcon
    },
    Sapphire_Tiara: {
        id: 'Sapphire_Tiara',
        name: '藍寶石皇冠',
        icon: Sapphire_TiaraIcon
    },
    Tuna: {
        id: 'Tuna',
        name: '鮪魚',
        icon: TunaIcon
    }
};

// 圖片數據
const imageData = [
    {
        id: 1,
        src: Pirate_Brown,
        title: "海盜熊大",
        tags: ['Earrings', 'Glod_Ingot', 'Sapphire']
    },
    {
        id: 2,
        src: Honeybee_Sally,
        title: "蜜蜂莎莉",
        tags: ['Animitsu', 'Cheese', 'Prawn_Sushi']
    },
    {
        id: 3,
        src: W_Brown_2,
        title: "西瓜熊大2號",
        tags: ['Macha_IceCream', 'Sapphire_Tiara', 'Tuna']
    },
];

export default function ImageGallery() {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tagId) => {
        setSelectedTags(prev =>
            prev.includes(tagId)
                ? prev.filter(t => t !== tagId)
                : [...prev, tagId]
        );
    };

    const filteredImages = imageData.filter(img =>
        selectedTags.length === 0 ||
        img.tags.some(tag => selectedTags.includes(tag))
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* 標籤篩選區 */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">選擇食材</h2>
                <div className="flex flex-wrap gap-4">
                    {Object.values(tagData).map(tag => (
                        <button
                            key={tag.id}
                            onClick={() => handleTagClick(tag.id)}
                            className={`flex flex-col items-center p-2 rounded-lg transition-all ${selectedTags.includes(tag.id)
                                ? 'bg-blue-100 ring-2 ring-blue-400'
                                : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <img
                                src={tag.icon}
                                alt={tag.name}
                                className="w-10 h-10 object-cover rounded-full mb-1"
                            />
                            <span className="text-sm font-medium">{tag.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 圖片展示區 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredImages.map(img => (
                    <div key={img.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={img.src}
                            alt={img.title}
                            className="w-full h-55 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-medium mb-2">{img.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {img.tags.map(tagId => (
                                    <div
                                        key={tagId}
                                        className="flex items-center bg-gray-50 rounded-full p-1 pr-3"
                                    >
                                        <img
                                            src={tagData[tagId].icon}
                                            alt={tagData[tagId].name}
                                            className="w-6 h-6 rounded-full mr-1"
                                        />
                                        <span className="text-sm">{tagData[tagId].name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}