// Import all product images
import Essence_Mascara_Lash_Princess from "../assets/image/beauty/Essence Mascara Lash Princess.png";
import Eyeshadow_Palette_with_Mirror from "../assets/image/beauty/Eyeshadow Palette with Mirror.png";
import Powder_Canister from "../assets/image/beauty/Powder Canister.png";
import Red_Lipstick from "../assets/image/beauty/Red Lipstick.png";
import Red_Nail_Polish from "../assets/image/beauty/Red Nail Polish.png";

import Calvin_Klein_CK_One from "../assets/image/fragrances/Calvin Klein CK One.png";
import Chanel_Coco_Noir from "../assets/image/fragrances/Chanel Coco Noir Eau De.png";
import Dior_Jadore from "../assets/image/fragrances/Dior J'adore.png";
import Dolce_Shine from "../assets/image/fragrances/Dolce Shine Eau de.png";
import Gucci_Bloom from "../assets/image/fragrances/Gucci Bloom Eau de.png";

import Annibale_Bed from "../assets/image/furniture/Annibale Colombo Bed.png";
import Annibale_Sofa from "../assets/image/furniture/Annibale Colombo Sofa.png";
import Bedside_Table from "../assets/image/furniture/Bedside Table African Cherry.png";
import Knoll_Chair from "../assets/image/furniture/Knoll Saarinen Executive Conference Chair.png";
import Bathroom_Sink from "../assets/image/furniture/Wooden Bathroom Sink With Mirror.png";

// Groceries
import Apple from "../assets/image/groceries/Apple.png";
import Cat_Food from "../assets/image/groceries/Cat Food.png";
import Cooking_Oil from "../assets/image/groceries/Cooking Oil.png";
import Cucumber from "../assets/image/groceries/Cucumber.png";
import Dog_Food from "../assets/image/groceries/Dog Food.png";
import Eggs from "../assets/image/groceries/Eggs.png";

// Home Decoration
import Decoration_Swing from "../assets/image/home-decoration/Decoration Swing.png";
import Family_Tree_Frame from "../assets/image/home-decoration/Family Tree Photo Frame.png";
import House_Showpiece from "../assets/image/home-decoration/House Showpiece Plant.png";
import Plant_Pot from "../assets/image/home-decoration/Plant Pot.png";

// Kitchen Accessories
import Bamboo_Spatula from "../assets/image/kitchen-accessories/Bamboo Spatula.png";
import Black_Aluminium_Cup from "../assets/image/kitchen-accessories/Black Aluminium Cup.png";
import Black_Whisk from "../assets/image/kitchen-accessories/Black Whisk.png";
import Boxed_Blender from "../assets/image/kitchen-accessories/Boxed Blender.png";
import Carbon_Steel_Wok from "../assets/image/kitchen-accessories/Carbon Steel Wok.png";

// Laptops
import MacBook_Pro from "../assets/image/laptops/Apple MacBook Pro 14 Inch Space Grey.png";
import Asus_Zenbook from "../assets/image/laptops/Asus Zenbook Pro Dual Screen Laptop.png";
import Huawei_Matebook from "../assets/image/laptops/Huawei Matebook X Pro.png";
import Lenovo_Yoga from "../assets/image/laptops/Lenovo Yoga 920.png";
import Dell_XPS from "../assets/image/laptops/New DELL XPS 13 9300 Laptop.png";

// Other
import Blue_Check_Shirt from "../assets/image/mens-shirts/Blue & Black Check Shirt.png";
import Nike_Air_Jordan from "../assets/image/mens-shoes/Nike Air Jordan 1 Red And Black.png";
import Brown_Belt_Watch from "../assets/image/mens-watches/Brown Leather Belt Watch.png";
import Amazon_Echo from "../assets/image/mobile-accessories/Amazon Echo Plus.png";
import Generic_Motorcycle from "../assets/image/motorcycle/Generic Motorcycle.png";
import Hand_Soap from "../assets/image/skin-care/Attitude Super Leaves Hand Soap.png";

// Map images to product titles
export const productImages = {
  "Essence Mascara Lash Princess": Essence_Mascara_Lash_Princess,
  "Eyeshadow Palette with Mirror": Eyeshadow_Palette_with_Mirror,
  "Powder Canister": Powder_Canister,
  "Red Lipstick": Red_Lipstick,
  "Red Nail Polish": Red_Nail_Polish,
  "Calvin Klein CK One": Calvin_Klein_CK_One,
  "Chanel Coco Noir Eau De": Chanel_Coco_Noir,
  "Dior J'adore": Dior_Jadore,
  "Dolce Shine Eau de": Dolce_Shine,
  "Gucci Bloom Eau de": Gucci_Bloom,
  "Annibale Colombo Bed": Annibale_Bed,
  "Annibale Colombo Sofa": Annibale_Sofa,
  "Bedside Table African Cherry": Bedside_Table,
  "Knoll Saarinen Executive Conference Chair": Knoll_Chair,
  "Wooden Bathroom Sink With Mirror": Bathroom_Sink,
  Apple: Apple,
  "Cat Food": Cat_Food,
  "Cooking Oil": Cooking_Oil,
  Cucumber: Cucumber,
  "Dog Food": Dog_Food,
  Eggs: Eggs,
  "Decoration Swing": Decoration_Swing,
  "Family Tree Photo Frame": Family_Tree_Frame,
  "House Showpiece Plant": House_Showpiece,
  "Plant Pot": Plant_Pot,
  "Bamboo Spatula": Bamboo_Spatula,
  "Black Aluminium Cup": Black_Aluminium_Cup,
  "Black Whisk": Black_Whisk,
  "Boxed Blender": Boxed_Blender,
  "Carbon Steel Wok": Carbon_Steel_Wok,
  "Apple MacBook Pro 14 Inch Space Grey": MacBook_Pro,
  "Asus Zenbook Pro Dual Screen Laptop": Asus_Zenbook,
  "Huawei Matebook X Pro": Huawei_Matebook,
  "Lenovo Yoga 920": Lenovo_Yoga,
  "New DELL XPS 13 9300 Laptop": Dell_XPS,
  "Blue & Black Check Shirt": Blue_Check_Shirt,
  "Nike Air Jordan 1 Red And Black": Nike_Air_Jordan,
  "Brown Leather Belt Watch": Brown_Belt_Watch,
  "Amazon Echo Plus": Amazon_Echo,
  "Generic Motorcycle": Generic_Motorcycle,
  "Attitude Super Leaves Hand Soap": Hand_Soap,
};

const originalData = [
  /* ================= BEAUTY ================= */
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    brand: "Essence",
    image: productImages["Essence Mascara Lash Princess"],
    category: "beauty",
    rating: 2.56,
    price: 8.94,
    originalPrice: 9.99,
    discountPercent: 10.48,
    stock: 99,
    description:
      "The Essence Mascara Lash Princess volumizes and lengthens lashes for a dramatic look. Long-lasting and cruelty-free.",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    brand: "Essence",
    image: productImages["Eyeshadow Palette with Mirror"],
    category: "beauty",
    rating: 2.86,
    price: 16.35,
    originalPrice: 19.99,
    discountPercent: 18.19,
    stock: 50,
    description:
      "A colorful eyeshadow palette with mirror for multiple makeup looks. Smooth and blendable shades.",
  },
  {
    id: 3,
    title: "Powder Canister",
    brand: "Essence",
    image: productImages["Powder Canister"],
    category: "beauty",
    rating: 4.64,
    price: 13.51,
    originalPrice: 14.99,
    discountPercent: 9.84,
    stock: 120,
    description:
      "Loose powder in a canister to set makeup, reduce shine, and give a flawless finish.",
  },
  {
    id: 4,
    title: "Red Lipstick",
    brand: "Essence",
    image: productImages["Red Lipstick"],
    category: "beauty",
    rating: 4.36,
    price: 11.41,
    originalPrice: 12.99,
    discountPercent: 12.16,
    stock: 80,
    description:
      "Bold red lipstick with long-lasting wear and intense color payoff. Perfect for day or night.",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    brand: "Essence",
    image: productImages["Red Nail Polish"],
    category: "beauty",
    rating: 4.32,
    price: 7.96,
    originalPrice: 8.99,
    discountPercent: 11.44,
    stock: 60,
    description:
      "High-shine red nail polish for a flawless manicure. Dries quickly and lasts long.",
  },

  /* ================= FRAGRANCES ================= */
  {
    id: 6,
    title: "Calvin Klein CK One",
    brand: "Calvin Klein",
    image: productImages["Calvin Klein CK One"],
    category: "fragrances",
    rating: 4.37,
    price: 49.05,
    originalPrice: 49.99,
    discountPercent: 1.89,
    stock: 35,
    description:
      "A fresh and clean unisex fragrance with citrusy top notes, perfect for everyday wear.",
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    brand: "Chanel",
    image: productImages["Chanel Coco Noir Eau De"],
    category: "fragrances",
    rating: 4.26,
    price: 108.53,
    originalPrice: 129.99,
    discountPercent: 16.51,
    stock: 20,
    description:
      "Luxurious and elegant fragrance with a sophisticated blend of oriental notes.",
  },
  {
    id: 8,
    title: "Dior J'adore",
    brand: "Dior",
    image: productImages["Dior J'adore"],
    category: "fragrances",
    rating: 3.8,
    price: 76.74,
    originalPrice: 89.99,
    discountPercent: 14.72,
    stock: 25,
    description:
      "Feminine and floral perfume with notes of jasmine and rose. Timeless and iconic.",
  },
  {
    id: 9,
    title: "Dolce Shine Eau de",
    brand: "Dolce & Gabbana",
    image: productImages["Dolce Shine Eau de"],
    category: "fragrances",
    rating: 3.96,
    price: 69.99,
    originalPrice: 79.99,
    discountPercent: 5.11,
    stock: 30,
    description:
      "Refreshing and light fragrance with citrus and floral notes, perfect for daytime wear.",
  },
  {
    id: 10,
    title: "Gucci Bloom Eau de",
    brand: "Gucci",
    image: productImages["Gucci Bloom Eau de"],
    category: "fragrances",
    rating: 2.74,
    price: 68.48,
    originalPrice: 79.99,
    discountPercent: 14.39,
    stock: 18,
    description:
      "A vibrant floral fragrance that celebrates authenticity and femininity.",
  },

  /* ================= FURNITURE ================= */
  {
    id: 11,
    title: "Annibale Colombo Bed",
    brand: "Annibale Colombo",
    image: productImages["Annibale Colombo Bed"],
    category: "furniture",
    rating: 4.77,
    price: 1737.16,
    originalPrice: 1899.99,
    discountPercent: 8.57,
    stock: 12,
    description:
      "Luxurious wooden bed with exquisite craftsmanship and modern design.",
  },
  {
    id: 12,
    title: "Annibale Colombo Sofa",
    brand: "Annibale Colombo",
    image: productImages["Annibale Colombo Sofa"],
    category: "furniture",
    rating: 3.92,
    price: 2139.99,
    originalPrice: 2499.99,
    discountPercent: 14.4,
    stock: 8,
    description:
      "Elegant sofa with premium upholstery, perfect for living room comfort.",
  },
  {
    id: 13,
    title: "Bedside Table African Cherry",
    brand: "Annibale Colombo",
    image: productImages["Bedside Table African Cherry"],
    category: "furniture",
    rating: 2.87,
    price: 242.72,
    originalPrice: 299.99,
    discountPercent: 19.09,
    stock: 15,
    description:
      "Stylish bedside table crafted from African Cherry wood, ideal for bedrooms.",
  },
  {
    id: 14,
    title: "Knoll Saarinen Executive Conference Chair",
    brand: "Knoll",
    image: productImages["Knoll Saarinen Executive Conference Chair"],
    category: "furniture",
    rating: 4.88,
    price: 489.94,
    originalPrice: 499.99,
    discountPercent: 2.01,
    stock: 10,
    description:
      "Ergonomic executive chair with sleek design and comfort for long meetings.",
  },
  {
    id: 15,
    title: "Wooden Bathroom Sink With Mirror",
    brand: "Annibale Colombo",
    image: productImages["Wooden Bathroom Sink With Mirror"],
    category: "furniture",
    rating: 3.59,
    price: 729.59,
    originalPrice: 799.99,
    discountPercent: 8.8,
    stock: 7,
    description:
      "Modern wooden bathroom sink with integrated mirror. Durable and stylish.",
  },

  /* ================= GROCERIES ================= */
  {
    id: 16,
    title: "Apple",
    brand: "Fresh Farm",
    image: productImages["Apple"],
    category: "groceries",
    rating: 4.19,
    price: 1.74,
    originalPrice: 1.99,
    discountPercent: 12.62,
    stock: 200,
    description: "Fresh red apples, perfect for snacking or baking.",
  },
  {
    id: 17,
    title: "Cat Food",
    brand: "Whiskas",
    image: productImages["Cat Food"],
    category: "groceries",
    rating: 3.13,
    price: 8.13,
    originalPrice: 8.99,
    discountPercent: 9.58,
    stock: 150,
    description:
      "Nutritious cat food with all essential vitamins for a healthy pet.",
  },
  {
    id: 18,
    title: "Cooking Oil",
    brand: "Olive Gold",
    image: productImages["Cooking Oil"],
    category: "groceries",
    rating: 4.8,
    price: 4.52,
    originalPrice: 4.99,
    discountPercent: 9.33,
    stock: 100,
    description: "Premium cooking oil suitable for all types of cooking.",
  },
  {
    id: 19,
    title: "Cucumber",
    brand: "Fresh Farm",
    image: productImages["Cucumber"],
    category: "groceries",
    rating: 4.07,
    price: 1.49,
    originalPrice: null,
    discountPercent: null,
    stock: 180,
    description: "Fresh cucumbers, crisp and healthy.",
  },
  {
    id: 20,
    title: "Dog Food",
    brand: "Pedigree",
    image: productImages["Dog Food"],
    category: "groceries",
    rating: 4.55,
    price: 9.86,
    originalPrice: 10.99,
    discountPercent: 10.27,
    stock: 120,
    description: "High-quality dog food for strong and healthy pets.",
  },
  {
    id: 21,
    title: "Eggs",
    brand: "Farm Fresh",
    image: productImages["Eggs"],
    category: "groceries",
    rating: 2.53,
    price: 2.66,
    originalPrice: 2.99,
    discountPercent: 11.05,
    stock: 250,
    description: "Organic eggs, rich in protein and essential nutrients.",
  },

  /* ================= HOME DECORATION ================= */
  {
    id: 22,
    title: "Decoration Swing",
    brand: "Home Deco",
    image: productImages["Decoration Swing"],
    category: "home-decoration",
    rating: 3.16,
    price: 53.75,
    originalPrice: 59.99,
    discountPercent: 10.41,
    stock: 30,
    description: "Elegant decorative swing to enhance home interiors.",
  },
  {
    id: 23,
    title: "Family Tree Photo Frame",
    brand: "Home Deco",
    image: productImages["Family Tree Photo Frame"],
    category: "home-decoration",
    rating: 4.53,
    price: 25.53,
    originalPrice: 29.99,
    discountPercent: 14.87,
    stock: 40,
    description: "Beautiful family tree frame to display cherished memories.",
  },
  {
    id: 24,
    title: "House Showpiece Plant",
    brand: "Home Deco",
    image: productImages["House Showpiece Plant"],
    category: "home-decoration",
    rating: 4.67,
    price: 37.01,
    originalPrice: 39.99,
    discountPercent: 7.46,
    stock: 25,
    description: "Decorative plant showpiece for living room and office.",
  },
  {
    id: 25,
    title: "Plant Pot",
    brand: "Home Deco",
    image: productImages["Plant Pot"],
    category: "home-decoration",
    rating: 3.01,
    price: 13.96,
    originalPrice: 14.99,
    discountPercent: 6.84,
    stock: 50,
    description: "Stylish plant pot to grow indoor plants easily.",
  },

  /* ================= KITCHEN ACCESSORIES ================= */
  {
    id: 26,
    title: "Bamboo Spatula",
    brand: "Kitchen Pro",
    image: productImages["Bamboo Spatula"],
    category: "kitchen-accessories",
    rating: 3.27,
    price: 7.76,
    originalPrice: 7.99,
    discountPercent: 2.84,
    stock: 70,
    description: "Durable bamboo spatula suitable for cooking and baking.",
  },
  {
    id: 27,
    title: "Black Aluminium Cup",
    brand: "Kitchen Pro",
    image: productImages["Black Aluminium Cup"],
    category: "kitchen-accessories",
    rating: 4.46,
    price: 5.05,
    originalPrice: 5.99,
    discountPercent: 15.65,
    stock: 100,
    description: "Lightweight and durable black aluminium cup for daily use.",
  },
  {
    id: 28,
    title: "Black Whisk",
    brand: "Kitchen Pro",
    image: productImages["Black Whisk"],
    category: "kitchen-accessories",
    rating: 3.9,
    price: 8.97,
    originalPrice: 9.99,
    discountPercent: 10.24,
    stock: 60,
    description: "Ergonomic whisk for efficient mixing and whipping.",
  },
  {
    id: 29,
    title: "Boxed Blender",
    brand: "Kitchen Pro",
    image: productImages["Boxed Blender"],
    category: "kitchen-accessories",
    rating: 4.56,
    price: 37.09,
    originalPrice: 39.99,
    discountPercent: 7.26,
    stock: 25,
    description:
      "Compact blender with multiple speed settings for smoothies and shakes.",
  },
  {
    id: 30,
    title: "Carbon Steel Wok",
    brand: "Kitchen Pro",
    image: productImages["Carbon Steel Wok"],
    category: "kitchen-accessories",
    rating: 4.05,
    price: 28.03,
    originalPrice: 29.99,
    discountPercent: 6.53,
    stock: 30,
    description: "Heavy-duty carbon steel wok for stir-frying and deep-frying.",
  },

  /* ================= LAPTOPS ================= */
  {
    id: 31,
    title: "Apple MacBook Pro 14 Inch Space Grey",
    brand: "Apple",
    image: productImages["Apple MacBook Pro 14 Inch Space Grey"],
    category: "laptops",
    rating: 3.65,
    price: 1906.19,
    originalPrice: 1999.99,
    discountPercent: 4.69,
    stock: 10,
    description:
      "High-performance MacBook Pro with M1 chip, perfect for professionals.",
  },
  {
    id: 32,
    title: "Asus Zenbook Pro Dual Screen Laptop",
    brand: "Asus",
    image: productImages["Asus Zenbook Pro Dual Screen Laptop"],
    category: "laptops",
    rating: 3.95,
    price: 1599.47,
    originalPrice: 1799.99,
    discountPercent: 11.14,
    stock: 12,
    description:
      "Innovative dual-screen laptop for creative professionals and multitasking.",
  },
  {
    id: 33,
    title: "Huawei Matebook X Pro",
    brand: "Huawei",
    image: productImages["Huawei Matebook X Pro"],
    category: "laptops",
    rating: 4.98,
    price: 1268.67,
    originalPrice: 1399.99,
    discountPercent: 9.38,
    stock: 8,
    description:
      "Slim and powerful laptop with high-resolution touchscreen display.",
  },
  {
    id: 34,
    title: "Lenovo Yoga 920",
    brand: "Lenovo",
    image: productImages["Lenovo Yoga 920"],
    category: "laptops",
    rating: 2.86,
    price: 1027.94,
    originalPrice: 1099.99,
    discountPercent: 6.55,
    stock: 6,
    description:
      "2-in-1 convertible laptop with touchscreen and flexible hinge design.",
  },
  {
    id: 35,
    title: "New DELL XPS 13 9300 Laptop",
    brand: "Dell",
    image: productImages["New DELL XPS 13 9300 Laptop"],
    category: "laptops",
    rating: 2.67,
    price: 1321.64,
    originalPrice: 1499.99,
    discountPercent: 11.89,
    stock: 9,
    description:
      "Compact and lightweight laptop with high performance for daily use.",
  },

  /* ================= OTHER ================= */
  {
    id: 36,
    title: "Blue & Black Check Shirt",
    brand: "Nike",
    image: productImages["Blue & Black Check Shirt"],
    category: "mens-shirts",
    rating: 3.64,
    price: 25.39,
    originalPrice: 29.99,
    discountPercent: 15.35,
    stock: 50,
    description:
      "Stylish cotton check shirt for men. Comfortable and perfect for casual wear.",
  },
  {
    id: 37,
    title: "Nike Air Jordan 1 Red And Black",
    brand: "Nike",
    image: productImages["Nike Air Jordan 1 Red And Black"],
    category: "mens-shoes",
    rating: 4.77,
    price: 143.81,
    originalPrice: 149.99,
    discountPercent: 4.12,
    stock: 20,
    description:
      "Iconic Air Jordan sneakers in red and black. Durable and stylish.",
  },
  {
    id: 38,
    title: "Brown Leather Belt Watch",
    brand: "Fossil",
    image: productImages["Brown Leather Belt Watch"],
    category: "mens-watches",
    rating: 4.19,
    price: 84.6,
    originalPrice: 89.99,
    discountPercent: 5.99,
    stock: 35,
    description:
      "Elegant brown leather strap watch with precise quartz movement.",
  },
  {
    id: 39,
    title: "Amazon Echo Plus",
    brand: "Amazon",
    image: productImages["Amazon Echo Plus"],
    category: "mobile-accessories",
    rating: 4.99,
    price: 87.92,
    originalPrice: 99.99,
    discountPercent: 12.07,
    stock: 40,
    description:
      "Smart speaker with Alexa for home automation and music streaming.",
  },
  {
    id: 40,
    title: "Generic Motorcycle",
    brand: "Generic",
    image: productImages["Generic Motorcycle"],
    category: "motorcycle",
    rating: 4.91,
    price: 3515.99,
    originalPrice: 3999.99,
    discountPercent: 12.1,
    stock: 5,
    description:
      "High-performance motorcycle suitable for city and highway riding.",
  },
  {
    id: 41,
    title: "Attitude Super Leaves Hand Soap",
    brand: "Attitude",
    image: productImages["Attitude Super Leaves Hand Soap"],
    category: "skin-care",
    rating: 3.19,
    price: 7.33,
    originalPrice: 8.99,
    discountPercent: 18.49,
    stock: 75,
    description:
      "Gentle hand soap enriched with plant-based ingredients for soft and clean hands.",
  },
];
const getLiveDashboardData = () => {
  const saved = localStorage.getItem("seller_inventory");
  if (saved) {
    const parsedData = JSON.parse(saved);
    // Re-attach imports to the main data list
    return parsedData.map((product) => ({
      ...product,
      image: productImages[product.title] || product.image,
    }));
  }
  return originalData;
};
const ProductData = getLiveDashboardData();
export default ProductData;
