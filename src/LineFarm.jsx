import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// 修改圖片路徑配置
const IMAGE_CONFIG = {
    tags: {
        categories: {
            Bakery: 'Bakery',
            BBQ_Meat_Shop: 'BBQ_Meat_Shop',
            Beehive: 'Beehive',
            Blast_Furnace: 'Blast_Furnace',
            Burger_Shack: 'Burger_Shack',
            Cafe: 'Cafe',
            Chinese_Eatery: 'Chinese_Eatery',
            Crepe_Stand: 'Crepe_Stand',
            Dairy_Factory: 'Dairy_Factory',
            Donburi_Shop: 'Donburi_Shop',
            Fish: 'Fish',
            Flower_Shop: 'Flower_Shop',
            Food_Cart: 'Food_Cart',
            Grain: 'Grain',
            Ice_Cream_Parlor: 'Ice_Cream_Parlor',
            Japanese_Cafe: 'Japanese_Cafe',
            Jewelers: 'Jewelers',
            Juice_Stand: 'Juice_Stand',
            Korean_Restaurant: 'Korean_Restaurant',
            Loom: 'Loom',
            Patisserie: 'Patisserie',
            Pizzeria: 'Pizzeria',
            Ramen_House: 'Ramen_House',
            Salad_Shop: 'Salad_Shop',
            Sauce_Store: 'Sauce_Store',
            Stock: 'Stock',
            Sugar_Refiner: 'Sugar_Refiner',
            SuShi_Bar: 'SuShi_Bar',
            Tailor_Shop: 'Tailor_Shop',
            Thai_Restaurant: 'Thai_Restaurant',
            Thugz_Place: 'Thugz_Place',
            Wagashi_Store: 'Wagashi_Store'
        }
    },
    roles: {
        categories: {
            S: 'S',
            A: 'A',
            B: 'B',
            C: 'C',
        }
    }
};

// 修改圖片路徑處理函數
const getTagImagePath = (categoryPath, filename) => {
    return new URL(`./assets/tags/${categoryPath}/${filename}`, import.meta.url).href;
};

const getRoleImagePath = (category, filename) => {
    const categoryPath = IMAGE_CONFIG.roles.categories[category] || 'misc';
    return new URL(`./assets/roles/${categoryPath}/${filename}`, import.meta.url).href;
};

// 重構標籤數據結構為扁平化列表
const allTags = [
    {
        id: 'Vanilla_Ice_Cream',
        name: '香草冰淇淋',
        filename: 'Vanilla_Ice_Cream.jpg',
        categoryPath: 'Ice_Cream_Parlor'
    },
    {
        id: 'Grape_Sherbet',
        name: '葡萄冰沙',
        filename: 'Grape_Sherbet.jpg',
        categoryPath: 'Ice_Cream_Parlor'
    },
    {
        id: 'Yakisoba',
        name: '炒麵',
        filename: 'Yakisoba.jpg',
        categoryPath: 'BBQ_Meat_Shop'
    },
    {
        id: 'Lasagne',
        name: '千層麵',
        filename: 'Lasagne.jpg',
        categoryPath: 'Pizzeria'
    },
    {
        id: 'Spicy_Potato_Pizza',
        name: '辣醬洋芋披薩',
        filename: 'Spicy_Potato_Pizza.jpg',
        categoryPath: 'Pizzeria'
    },
    {
        id: 'Carbonara',
        name: '奶油培根義大利麵',
        filename: 'Carbonara.jpg',
        categoryPath: 'Pizzeria'
    },
    {
        id: 'Pumpkin_Soup',
        name: '南瓜濃湯',
        filename: 'Pumpkin_Soup.jpg',
        categoryPath: 'Pizzeria'
    },
    {
        id: 'Espresso',
        name: '濃縮咖啡',
        filename: 'Espresso.jpg',
        categoryPath: 'Cafe'
    },
    {
        id: 'Cafe_Latte',
        name: '拿鐵咖啡',
        filename: 'Cafe_Latte.jpg',
        categoryPath: 'Cafe'
    },
    {
        id: 'Vienna_Coffee',
        name: '維也納咖啡',
        filename: 'Vienna_Coffee.jpg',
        categoryPath: 'Cafe'
    },
    {
        id: 'Tan_Tan_Noodle',
        name: '擔擔麵',
        filename: 'Tan_Tan_Noodle.jpg',
        categoryPath: 'Chinese_Eatery'
    },
    {
        id: 'Chilled_Chinese_Noodle',
        name: '中華涼麵',
        filename: 'Chilled_Chinese_Noodle.jpg',
        categoryPath: 'Chinese_Eatery'
    },
    {
        id: 'Egg_On_Toast',
        name: '蛋吐司',
        filename: 'Egg_On_Toast.jpg',
        categoryPath: 'Food_Cart'
    },
    {
        id: 'Hot_Dog',
        name: '熱狗',
        filename: 'Hot_Dog.jpg',
        categoryPath: 'Food_Cart'
    },
    {
        id: 'Cheese',
        name: '起司',
        filename: 'Cheese.jpeg',
        categoryPath: 'Dairy_Factory'
    },
    {
        id: 'Grape_Juice',
        name: '葡萄汁',
        filename: 'Grape_Juice.jpg',
        categoryPath: 'Juice_Stand'
    },
    {
        id: 'Strawberry_Juice',
        name: '草莓汁',
        filename: 'Strawberry_Juice.jpg',
        categoryPath: 'Juice_Stand'
    },
    {
        id: 'Glod_Ingot',
        name: '金塊',
        filename: 'Glod_Ingot.jpeg',
        categoryPath: 'Blast_Furnace'
    },
    {
        id: 'Sapphire',
        name: '藍寶石',
        filename: 'Sapphire.jpeg',
        categoryPath: 'Blast_Furnace'
    },
    {
        id: 'Sapphire_Tiara',
        name: '藍寶石皇冠',
        filename: 'Sapphire_Tiara.jpeg',
        categoryPath: 'Jewelers'
    },
    {
        id: 'Earrings',
        name: '耳環',
        filename: 'Earrings.jpeg',
        categoryPath: 'Jewelers'
    },
    {
        id: 'Animitsu',
        name: '餡蜜',
        filename: 'Animitsu.jpeg',
        categoryPath: 'Japanese_Cafe'
    },
    {
        id: 'Macha_IceCream',
        name: '抹茶冰淇淋',
        filename: 'Macha_IceCream.jpeg',
        categoryPath: 'Japanese_Cafe'
    },
    {
        id: 'Prawn_Sushi',
        name: '蝦壽司',
        filename: 'Prawn_Sushi.jpeg',
        categoryPath: 'SuShi_Bar'
    },
    {
        id: 'Tuna',
        name: '鮪魚',
        filename: 'Tuna.jpeg',
        categoryPath: 'Fish'
    },
    {
        id: 'Salmon',
        name: '鮭魚',
        filename: 'Salmon.jpg',
        categoryPath: 'Fish'
    },
    {
        id: 'Egg',
        name: '蛋',
        filename: 'Egg.jpg',
        categoryPath: 'Stock'
    },
    {
        id: 'Chilli',
        name: '辣椒',
        filename: 'Chilli.jpg',
        categoryPath: 'Grain'
    },
    {
        id: 'Cocoa',
        name: '可可豆',
        filename: 'Cocoa.jpg',
        categoryPath: 'Grain'
    },
];

const imageData = [
    {
        id: 1,
        category: 'S',
        filename: 'S_Pirate_Brown.jpg',
        title: "海盜熊大",
        tags: ['Glod_Ingot', 'Sapphire', 'Earrings']
    },
    {
        id: 2,
        category: 'S',
        filename: 'S_Honeybee_Sally.jpg',
        title: "蜜蜂莎莉",
        tags: ['Cheese', 'Prawn_Sushi', 'Animitsu']
    },
    {
        id: 3,
        category: 'S',
        filename: 'S_W_Brown_2.jpg',
        title: "西瓜熊大2號",
        tags: ['Tuna', 'Sapphire_Tiara', 'Macha_IceCream']
    },
    {
        id: 4,
        category: 'A',
        filename: 'A_Astronaut_Brown.jpg',
        title: "太空人熊大",
        tags: ['Cocoa', 'Grape_Juice', 'Carbonara']
    },
    {
        id: 5,
        category: 'A',
        filename: 'A_Beach_King_Brown.jpg',
        title: "沙灘小霸王熊大",
        tags: ['Strawberry_Juice', 'Vanilla_Ice_Cream', 'Grape_Sherbet']
    },
    {
        id: 6,
        category: 'A',
        filename: 'A_Calico_Cat_Brown.jpg',
        title: "三色貓熊大",
        tags: ['Egg_On_Toast', 'Salmon', 'Yakisoba']
    },
    {
        id: 7,
        category: 'A',
        filename: 'A_Clucky_Brown.jpg',
        title: "小雞熊大",
        tags: ['Egg', 'Pumpkin_Soup', 'Chilled_Chinese_Noodle']
    },
    {
        id: 8,
        category: 'A',
        filename: 'A_Coffee_Cup_Brown.jpg',
        title: "咖啡杯熊大",
        tags: ['Espresso', 'Cafe_Latte', 'Vienna_Coffee']
    },
    {
        id: 9,
        category: 'A',
        filename: 'A_Devil_Brown.jpg',
        title: "惡魔熊大",
        tags: ['Chilli', 'Tan_Tan_Noodle', 'Spicy_Potato_Pizza']
    },
    {
        id: 10,
        category: 'A',
        filename: 'A_Duster_Brown.jpg',
        title: "除塵熊大",
        tags: ['Hot_Dog', 'Strawberry_Juice', 'Lasagne']
    }
];

const LineFarm = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTags = useMemo(() => {
        if (!searchQuery) return allTags;
        return allTags.filter(tag =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

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
        // 移除 max-w-7xl 限制，改用 w-full
        <div className="p-6 w-full">
            <div className="mb-6 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="搜尋標籤..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {selectedTags.length > 0 && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600 flex flex-wrap gap-2">
                            <span className="font-medium">已選擇:</span>
                            {selectedTags.map(tagId => {
                                const tag = allTags.find(t => t.id === tagId);
                                if (!tag) return null;

                                return (
                                    <span
                                        key={tagId}
                                        className="inline-flex items-center bg-white rounded-full px-3 py-1 text-sm shadow-sm"
                                    >
                                        {tag.name}
                                        <button
                                            onClick={() => handleTagClick(tagId)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {filteredTags.map(tag => (
                        <button
                            key={tag.id}
                            onClick={() => handleTagClick(tag.id)}
                            className={`flex items-center p-2 rounded-lg transition-all ${selectedTags.includes(tag.id)
                                ? 'bg-blue-100 ring-2 ring-blue-400'
                                : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                    src={getTagImagePath(tag.categoryPath, tag.filename)}
                                    alt={tag.name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <span className="ml-2 text-sm truncate">{tag.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 調整網格配置以更好地利用空間 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                {filteredImages.map(img => (
                    <div key={img.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="aspect-[1/1] overflow-hidden">
                            <img
                                src={getRoleImagePath(img.category, img.filename)}
                                alt={img.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-2">{img.title}</h3>
                            <div className="flex flex-wrap gap-1">
                                {img.tags.map(tagId => {
                                    const tag = allTags.find(t => t.id === tagId);
                                    if (!tag) return null;

                                    return (
                                        <div
                                            key={tagId}
                                            className="inline-flex items-center bg-gray-50 rounded-full px-2 py-1"
                                        >
                                            <div className="w-4 h-4 rounded-full overflow-hidden">
                                                <img
                                                    src={getTagImagePath(tag.categoryPath, tag.filename)}
                                                    alt={tag.name}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <span className="text-xs ml-1 truncate max-w-[100px]">
                                                {tag.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredImages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    找不到符合所選標籤的圖片
                </div>
            )}
        </div>
    );
};

export default LineFarm;