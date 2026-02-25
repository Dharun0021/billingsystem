export interface Category {
  id: string
  name: string
  itemCount: number
}

export interface FoodItem {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  description: string
  image: string
}

export interface Order {
  id: string
  items: { name: string; quantity: number; price: number }[]
  paymentMethod: string
  total: number
  date: string
  status: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Billing"
  status: "Active" | "Inactive"
}

export interface CartItem extends FoodItem {
  quantity: number
}

export const categories: Category[] = [
  { id: "1", name: "Starters", itemCount: 5 },
  { id: "2", name: "Main Course", itemCount: 8 },
  { id: "3", name: "Desserts", itemCount: 4 },
  { id: "4", name: "Beverages", itemCount: 6 },
  { id: "5", name: "Soups", itemCount: 3 },
  { id: "6", name: "Salads", itemCount: 4 },
]

export const foodItems: FoodItem[] = [
  { id: "1",  name: "Paneer Tikka",     price: 220, category: "Starters",    available: true,  description: "Grilled cottage cheese with spices",      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80" },
  { id: "2",  name: "Veg Spring Roll",  price: 180, category: "Starters",    available: true,  description: "Crispy rolls with vegetable filling",     image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80" },
  { id: "3",  name: "Chicken Wings",    price: 280, category: "Starters",    available: true,  description: "Spicy buffalo chicken wings",             image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80" },
  { id: "4",  name: "Mushroom Soup",    price: 150, category: "Soups",       available: true,  description: "Creamy mushroom soup",                   image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
  { id: "5",  name: "Tomato Soup",      price: 120, category: "Soups",       available: true,  description: "Classic tomato basil soup",              image: "https://images.unsplash.com/photo-1648819736752-69b0ef8dee78?w=400&q=80" },
  { id: "6",  name: "Butter Chicken",   price: 350, category: "Main Course", available: true,  description: "Rich and creamy butter chicken",         image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
  { id: "7",  name: "Dal Makhani",      price: 250, category: "Main Course", available: true,  description: "Slow-cooked black lentils",              image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
  { id: "8",  name: "Biryani",          price: 320, category: "Main Course", available: true,  description: "Fragrant rice with spices",              image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
  { id: "9",  name: "Pasta Alfredo",    price: 280, category: "Main Course", available: false, description: "Creamy white sauce pasta",               image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" },
  { id: "10", name: "Grilled Salmon",   price: 520, category: "Main Course", available: true,  description: "Fresh Atlantic salmon grilled",          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80" },
  { id: "11", name: "Caesar Salad",     price: 200, category: "Salads",      available: true,  description: "Classic Caesar with croutons",           image: "https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=400&q=80" },
  { id: "12", name: "Greek Salad",      price: 190, category: "Salads",      available: true,  description: "Fresh Mediterranean salad",              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { id: "13", name: "Gulab Jamun",      price: 120, category: "Desserts",    available: true,  description: "Sweet milk dumplings",                   image: "https://images.unsplash.com/photo-1666636509932-10e1f9ab8f4c?w=400&q=80" },
  { id: "14", name: "Brownie Sundae",   price: 180, category: "Desserts",    available: true,  description: "Warm brownie with ice cream",            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
  { id: "15", name: "Tiramisu",         price: 220, category: "Desserts",    available: false, description: "Italian coffee dessert",                 image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
  { id: "16", name: "Fresh Lime Soda",  price: 80,  category: "Beverages",   available: true,  description: "Refreshing lime soda",                   image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80" },
  { id: "17", name: "Mango Lassi",      price: 120, category: "Beverages",   available: true,  description: "Creamy mango yogurt drink",              image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80" },
  { id: "18", name: "Cold Coffee",      price: 150, category: "Beverages",   available: true,  description: "Iced blended coffee",                    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
  { id: "19", name: "Masala Chai",      price: 60,  category: "Beverages",   available: true,  description: "Traditional spiced tea",                 image: "https://images.unsplash.com/photo-1571934811356-5cc061b6d326?w=400&q=80" },
  { id: "20", name: "Mojito",           price: 160, category: "Beverages",   available: true,  description: "Mint and lime cooler",                   image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80" },
]


export const orders: Order[] = [
  { id: "ORD-001", items: [{ name: "Butter Chicken", quantity: 2, price: 350 }, { name: "Biryani", quantity: 1, price: 320 }], paymentMethod: "Cash", total: 1020, date: "2026-02-25", status: "Completed" },
  { id: "ORD-002", items: [{ name: "Paneer Tikka", quantity: 1, price: 220 }, { name: "Dal Makhani", quantity: 1, price: 250 }, { name: "Mango Lassi", quantity: 2, price: 120 }], paymentMethod: "UPI", total: 710, date: "2026-02-25", status: "Completed" },
  { id: "ORD-003", items: [{ name: "Grilled Salmon", quantity: 1, price: 520 }, { name: "Caesar Salad", quantity: 1, price: 200 }], paymentMethod: "Card", total: 720, date: "2026-02-25", status: "Completed" },
  { id: "ORD-004", items: [{ name: "Biryani", quantity: 3, price: 320 }, { name: "Cold Coffee", quantity: 3, price: 150 }], paymentMethod: "UPI", total: 1410, date: "2026-02-25", status: "Completed" },
  { id: "ORD-005", items: [{ name: "Veg Spring Roll", quantity: 2, price: 180 }, { name: "Mushroom Soup", quantity: 2, price: 150 }], paymentMethod: "Cash", total: 660, date: "2026-02-24", status: "Completed" },
  { id: "ORD-006", items: [{ name: "Brownie Sundae", quantity: 2, price: 180 }, { name: "Masala Chai", quantity: 2, price: 60 }], paymentMethod: "Cash", total: 480, date: "2026-02-24", status: "Completed" },
  { id: "ORD-007", items: [{ name: "Pasta Alfredo", quantity: 1, price: 280 }, { name: "Fresh Lime Soda", quantity: 1, price: 80 }], paymentMethod: "Card", total: 360, date: "2026-02-24", status: "Completed" },
  { id: "ORD-008", items: [{ name: "Chicken Wings", quantity: 2, price: 280 }, { name: "Mojito", quantity: 2, price: 160 }], paymentMethod: "UPI", total: 880, date: "2026-02-23", status: "Completed" },
  { id: "ORD-009", items: [{ name: "Gulab Jamun", quantity: 4, price: 120 }, { name: "Tomato Soup", quantity: 2, price: 120 }], paymentMethod: "Cash", total: 720, date: "2026-02-23", status: "Completed" },
  { id: "ORD-010", items: [{ name: "Butter Chicken", quantity: 1, price: 350 }, { name: "Biryani", quantity: 2, price: 320 }, { name: "Mango Lassi", quantity: 3, price: 120 }], paymentMethod: "Card", total: 1350, date: "2026-02-22", status: "Completed" },
]

export const users: User[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@restaurant.com", role: "Admin", status: "Active" },
  { id: "2", name: "Priya Sharma", email: "priya@restaurant.com", role: "Billing", status: "Active" },
  { id: "3", name: "Amit Singh", email: "amit@restaurant.com", role: "Billing", status: "Active" },
  { id: "4", name: "Sneha Patel", email: "sneha@restaurant.com", role: "Admin", status: "Inactive" },
]

export const salesOverview = [
  { name: "Butter Chicken", category: "Main Course", quantitySold: 45, revenue: 15750 },
  { name: "Biryani", category: "Main Course", quantitySold: 38, revenue: 12160 },
  { name: "Paneer Tikka", category: "Starters", quantitySold: 32, revenue: 7040 },
  { name: "Mango Lassi", category: "Beverages", quantitySold: 28, revenue: 3360 },
  { name: "Dal Makhani", category: "Main Course", quantitySold: 25, revenue: 6250 },
  { name: "Grilled Salmon", category: "Main Course", quantitySold: 18, revenue: 9360 },
  { name: "Cold Coffee", category: "Beverages", quantitySold: 22, revenue: 3300 },
  { name: "Brownie Sundae", category: "Desserts", quantitySold: 20, revenue: 3600 },
]
