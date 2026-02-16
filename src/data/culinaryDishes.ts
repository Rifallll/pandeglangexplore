export interface CulinaryDish {
    id: number;
    name: string;
    category: string;
    price: number;
    displayPrice: string;
    desc: string;
    location: string;
    image: string;
    tags: string[];
    history?: string;
    profile: {
        spicy: number;
        savory: number;
        sweet: number;
    };
    ingredients: string[];
}

export const CULINARY_DISHES_ID: CulinaryDish[] = [
    {
        id: 1,
        name: "Angeun Lada",
        category: "Makanan Berat",
        price: 35000,
        displayPrice: "35k",
        desc: "Sup tradisional berbahan dasar jeroan atau daging sapi yang dimasak dengan bumbu rempah 'Walang'. Memiliki aroma khas dan rasa gurih pedas yang menghangatkan.",
        location: "Kecamatan Pandeglang & Munjul",
        image: "/images/culinary_angeun_lada.png",
        tags: ["Pedas", "Rempah", "Ikonik"],
        history: "Sering disajikan dalam ritual adat dan hari besar keagamaan di Pandeglang.",
        profile: { spicy: 4, savory: 5, sweet: 1 },
        ingredients: ["Daging Sapi/Jeroan", "Daun Walang", "Cabai", "Kencur", "Bawang Merah"]
    },
    {
        id: 2,
        name: "Sate Bandeng",
        category: "Lauk Pauk",
        price: 45000,
        displayPrice: "45k",
        desc: "Ikan bandeng yang diolah khusus dengan membuang duri, mencampur dagingnya dengan bumbu santan/rempah, lalu dimasukkan kembali ke kulitnya dan dibakar.",
        location: "Seluruh Pandeglang (Oleh-oleh)",
        image: "/images/culinary_sate_bandeng.png",
        tags: ["Gurih", "Bakar", "Oleh-oleh"],
        history: "Awalnya diciptakan untuk memudahkan Sultan Banten menyantap ikan bandeng tanpa terganggu duri.",
        profile: { spicy: 2, savory: 5, sweet: 3 },
        ingredients: ["Ikan Bandeng", "Santan Kental", "Kelapa Sangrai", "Kunyit", "Jahe"]
    },
    {
        id: 3,
        name: "Rabeg",
        category: "Makanan Berat",
        price: 40000,
        displayPrice: "40k",
        desc: "Olahan daging kambing atau sapi yang dipadukan dengan bumbu rempah seperti jahe, lada, dan kayu manis. Rasanya mirip perpaduan semur dan gulai dengan aroma kuat.",
        location: "Pusat Kota Pandeglang",
        image: "/images/culinary_rabeg.png",
        tags: ["Kambing", "Kuah Kental", "Legendaris"],
        history: "Diadaptasi dari hidangan khas Timur Tengah yang dibawa oleh Syekh Maulana Hasanuddin.",
        profile: { spicy: 3, savory: 4, sweet: 4 },
        ingredients: ["Daging Kambing/Sapi", "Jahe", "Lada", "Kayu Manis", "Kecap Manis"]
    },
    {
        id: 4,
        name: "Otak-Otak Labuan",
        category: "Camilan",
        price: 5000,
        displayPrice: "5k / pcs",
        desc: "Daging ikan tenggiri segar yang dicampur santan dan tepung, dibungkus daun pisang, lalu dibakar di atas arang. Disajikan dengan sambal kacang pedas asam.",
        location: "Kecamatan Labuan (Pesisir)",
        image: "/images/culinary_otak_otak_labuan.png",
        tags: ["Ikan", "Sambal Kacang", "Pesisir"],
        profile: { spicy: 3, savory: 4, sweet: 2 },
        ingredients: ["Ikan Tenggiri", "Santan", "Tepung Tapioka", "Daun Pisang", "Kacang Tanah"]
    },
    {
        id: 5,
        name: "Jojorong",
        category: "Kue Tradisional",
        price: 15000,
        displayPrice: "15k / takir",
        desc: "Kue manis lapis atas putih (santan) dan bawah (tepung beras), dengan kejutan gula merah cair di dasar wadah daun pisang (takir).",
        location: "Pasar Tradisional / Menes",
        image: "/images/culinary_jojorong.png",
        tags: ["Manis", "Lumer", "Sarapan"],
        profile: { spicy: 0, savory: 3, sweet: 5 },
        ingredients: ["Tepung Beras", "Santan", "Gula Aren", "Daun Pisang"]
    },
    {
        id: 6,
        name: "Talas Beneng",
        category: "Oleh-oleh",
        price: 25000,
        displayPrice: "25k / pack",
        desc: "Talas raksasa asli Pandeglang yang berwarna kuning cerah. Kini diolah menjadi keripik, brownies, hingga pengganti tembakau herbal.",
        location: "Sentra UKM Pandeglang",
        image: "/images/culinary_talas_beneng.png",
        tags: ["Kuning", "Sehat", "Ekspor"],
        profile: { spicy: 1, savory: 3, sweet: 2 },
        ingredients: ["Talas Beneng Kuning", "Garam", "Minyak Nabati"]
    },
    {
        id: 7,
        name: "Apem Putih Cimanuk",
        category: "Kue Tradisional",
        price: 17000,
        displayPrice: "17k / box",
        desc: "Kue dari tepung beras yang difermentasi, bertekstur kenyal dan lembut. Dimakan dengan kinca (gula merah cair).",
        location: "Cimanuk, Pandeglang",
        image: "/images/culinary_apem_cimanuk.png",
        tags: ["Kenyal", "Ramadhan", "Legendaris"],
        profile: { spicy: 0, savory: 1, sweet: 5 },
        ingredients: ["Tepung Beras", "Tape Singkong", "Air", "Gula Aren"]
    },
    {
        id: 8,
        name: "Kue Pasung",
        category: "Kue Tradisional",
        price: 3000,
        displayPrice: "3k / pcs",
        desc: "Kue berbentuk kerucut yang dibungkus daun pisang. Terdiri dari adonan tepung beras dan gula merah yang legit.",
        location: "Pasar Menes",
        image: "/images/culinary_kue_pasung.png",
        tags: ["Manis", "Wangi", "Klasik"],
        profile: { spicy: 0, savory: 2, sweet: 5 },
        ingredients: ["Tepung Beras", "Gula Merah", "Santan", "Daun Pisang"]
    },
    {
        id: 9,
        name: "Leumeung (Lemang)",
        category: "Makanan Berat",
        price: 30000,
        displayPrice: "30k / bambu",
        desc: "Beras ketan yang dicampur santan, dimasukkan ke dalam bambu yang dilapisi daun pisang, lalu dibakar perlahan.",
        location: "Malingping & Labuan",
        image: "/images/culinary_leumeung.png",
        tags: ["Gurih", "Bakar", "Ketan"],
        profile: { spicy: 0, savory: 5, sweet: 2 },
        ingredients: ["Beras Ketan", "Santan", "Garam", "Bambu", "Daun Pisang"]
    },
    {
        id: 10,
        name: "Emping Melinjo Super",
        category: "Oleh-oleh",
        price: 45000,
        displayPrice: "45k / 500g",
        desc: "Kerupuk khas dari biji melinjo yang dipipihkan. Kualitas export dari Kecamatan Menes.",
        location: "Menes, Pandeglang",
        image: "/images/culinary_emping_menes.png",
        tags: ["Garing", "Bening", "Super"],
        profile: { spicy: 1, savory: 4, sweet: 1 },
        ingredients: ["Biji Melinjo Pilihan"]
    },
    {
        id: 11,
        name: "Bakso Ikan Labuan",
        category: "Makanan Berat",
        price: 20000,
        displayPrice: "20k / porsi",
        desc: "Bakso berbahan dasar ikan tenggiri segar dengan kuah kaldu ikan yang bening.",
        location: "Pesisir Labuan",
        image: "/images/culinary_bakso_ikan_labuan.png",
        tags: ["Segar", "Ikan", "Labuan"],
        profile: { spicy: 2, savory: 5, sweet: 1 },
        ingredients: ["Ikan Tenggiri", "Santan", "Tepung Tapioka", "Bawang Putih"]
    },
    {
        id: 12,
        name: "Gipang Mas",
        category: "Camilan",
        price: 15000,
        displayPrice: "15k / pack",
        desc: "Camilan manis dari beras ketan yang digoreng lalu disiram air gula aren.",
        location: "Kadubungbang, Cimanuk",
        image: "/images/culinary_gipang_mas.png",
        tags: ["Renyah", "Manis", "Oleh-oleh"],
        profile: { spicy: 0, savory: 1, sweet: 5 },
        ingredients: ["Beras Ketan", "Gula Aren", "Minyak Goreng"]
    }
];

export const CULINARY_DISHES_EN: CulinaryDish[] = [
    {
        id: 1,
        name: "Angeun Lada",
        category: "Heavy Meals",
        price: 35000,
        displayPrice: "35k",
        desc: "Traditional soup made from offal or beef cooked with 'Walang' spices. Has a distinct aroma and warming spicy savory flavor.",
        location: "Pandeglang District & Munjul",
        image: "/images/culinary_angeun_lada.png",
        tags: ["Spicy", "Spice", "Iconic"],
        history: "Often served in traditional rituals and major religious holidays in Pandeglang.",
        profile: { spicy: 4, savory: 5, sweet: 1 },
        ingredients: ["Beef/Offal", "Walang Leaves", "Chili", "Kencur", "Shallots"]
    },
    {
        id: 2,
        name: "Milkfish Satay",
        category: "Side Dishes",
        price: 45000,
        displayPrice: "45k",
        desc: "Milkfish specially processed by removing bones, mixing meat with coconut milk/spices, then putting it back into the skin and grilling.",
        location: "Throughout Pandeglang (Souvenirs)",
        image: "/images/culinary_sate_bandeng.png",
        tags: ["Savory", "Grilled", "Souvenirs"],
        history: "Originally created to make it easier for the Sultan of Banten to eat milkfish without being bothered by bones.",
        profile: { spicy: 2, savory: 5, sweet: 3 },
        ingredients: ["Milkfish", "Thick Coconut Milk", "Roasted Coconut", "Turmeric", "Ginger"]
    },
    {
        id: 3,
        name: "Rabeg",
        category: "Heavy Meals",
        price: 40000,
        displayPrice: "40k",
        desc: "Mutton or beef dish combined with spices like ginger, pepper, and cinnamon. Tastes like a combination of stew and curry with a strong aroma.",
        location: "Pandeglang City Center",
        image: "/images/culinary_rabeg.png",
        tags: ["Goat", "Thick Broth", "Legendary"],
        history: "Adapted from a typical Middle Eastern dish brought by Sheikh Maulana Hasanuddin.",
        profile: { spicy: 3, savory: 4, sweet: 4 },
        ingredients: ["Goat/Beef Meat", "Ginger", "Pepper", "Cinnamon", "Sweet Soy Sauce"]
    },
    {
        id: 4,
        name: "Labuan Fish Cakes",
        category: "Snacks",
        price: 5000,
        displayPrice: "5k / pcs",
        desc: "Fresh mackerel meat mixed with coconut milk and flour, wrapped in banana leaves, then grilled over charcoal. Served with spicy sour peanut sauce.",
        location: "Labuan District (Coastal)",
        image: "/images/culinary_otak_otak_labuan.png",
        tags: ["Fish", "Peanut Sauce", "Coastal"],
        profile: { spicy: 3, savory: 4, sweet: 2 },
        ingredients: ["Mackerel Fish", "Coconut Milk", "Tapioca Flour", "Banana Leaves", "Peanuts"]
    },
    {
        id: 5,
        name: "Jojorong",
        category: "Traditional Cake",
        price: 15000,
        displayPrice: "15k / takir",
        desc: "Sweet cake with a white top layer (coconut milk) and bottom (rice flour), with a liquid brown sugar surprise at the bottom of the banana leaf container.",
        location: "Traditional Market / Menes",
        image: "/images/culinary_jojorong.png",
        tags: ["Sweet", "Melting", "Breakfast"],
        profile: { spicy: 0, savory: 3, sweet: 5 },
        ingredients: ["Rice Flour", "Coconut Milk", "Palm Sugar", "Banana Leaves"]
    },
    {
        id: 6,
        name: "Beneng Taro",
        category: "Souvenirs",
        price: 25000,
        displayPrice: "25k / pack",
        desc: "Giant taro native to Pandeglang with a bright yellow color. Now processed into chips, brownies, even herbal tobacco substitutes.",
        location: "Pandeglang SME Center",
        image: "/images/culinary_talas_beneng.png",
        tags: ["Yellow", "Healthy", "Export"],
        profile: { spicy: 1, savory: 3, sweet: 2 },
        ingredients: ["Yellow Beneng Taro", "Salt", "Vegetable Oil"]
    },
    {
        id: 7,
        name: "Cimanuk White Apem",
        category: "Traditional Cake",
        price: 17000,
        displayPrice: "17k / box",
        desc: "Fermented rice flour cake with a chewy and soft texture. Eaten with kinca (liquid brown sugar).",
        location: "Cimanuk, Pandeglang",
        image: "/images/culinary_apem_cimanuk.png",
        tags: ["Chewy", "Ramadan", "Legendary"],
        profile: { spicy: 0, savory: 1, sweet: 5 },
        ingredients: ["Rice Flour", "Cassava Tape", "Water", "Palm Sugar"]
    },
    {
        id: 8,
        name: "Pasung Cake",
        category: "Traditional Cake",
        price: 3000,
        displayPrice: "3k / pcs",
        desc: "Cone-shaped cake wrapped in banana leaves. Consists of rice flour dough and legitimate brown sugar.",
        location: "Menes Market",
        image: "/images/culinary_kue_pasung.png",
        tags: ["Sweet", "Fragrant", "Classic"],
        profile: { spicy: 0, savory: 2, sweet: 5 },
        ingredients: ["Rice Flour", "Brown Sugar", "Coconut Milk", "Banana Leaves"]
    },
    {
        id: 9,
        name: "Leumeung (Lemang)",
        category: "Heavy Meals",
        price: 30000,
        displayPrice: "30k / bamboo",
        desc: "Sticky rice mixed with coconut milk, put into bamboo lined with banana leaves, then slowly grilled.",
        location: "Malingping & Labuan",
        image: "/images/culinary_leumeung.png",
        tags: ["Savory", "Grilled", "Sticky Rice"],
        profile: { spicy: 0, savory: 5, sweet: 2 },
        ingredients: ["Sticky Rice", "Coconut Milk", "Salt", "Bamboo", "Banana Leaves"]
    },
    {
        id: 10,
        name: "Super Melinjo Crackers",
        category: "Souvenirs",
        price: 45000,
        displayPrice: "45k / 500g",
        desc: "Typical crackers from flattened melinjo seeds. Export quality from Menes District.",
        location: "Menes, Pandeglang",
        image: "/images/culinary_emping_menes.png",
        tags: ["Crispy", "Clear", "Super"],
        profile: { spicy: 1, savory: 4, sweet: 1 },
        ingredients: ["Selected Melinjo Seeds"]
    },
    {
        id: 11,
        name: "Labuan Fish Meatball",
        category: "Heavy Meals",
        price: 20000,
        displayPrice: "20k / portion",
        desc: "Meatballs made from fresh mackerel fish with clear fish broth.",
        location: "Labuan Coastal",
        image: "/images/culinary_bakso_ikan_labuan.png",
        tags: ["Fresh", "Fish", "Labuan"],
        profile: { spicy: 2, savory: 5, sweet: 1 },
        ingredients: ["Mackerel Fish", "Coconut Milk", "Tapioca Flour", "Garlic"]
    },
    {
        id: 12,
        name: "Gold Gipang",
        category: "Snacks",
        price: 15000,
        displayPrice: "15k / pack",
        desc: "Sweet snack from fried sticky rice then drizzled with palm sugar water.",
        location: "Kadubungbang, Cimanuk",
        image: "/images/culinary_gipang_mas.png",
        tags: ["Crunchy", "Sweet", "Souvenirs"],
        profile: { spicy: 0, savory: 1, sweet: 5 },
        ingredients: ["Sticky Rice", "Palm Sugar", "Cooking Oil"]
    }
];
