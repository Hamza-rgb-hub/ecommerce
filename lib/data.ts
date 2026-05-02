export interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  description: string
  images: string[]
  colors: string[]
  sizes: string[]
  stock: number
  rating: number
  reviews: number
  isNew: boolean
  isFeatured?: boolean
  gender: "men" | "women" | "kids" | "unisex"
  status: "active" | "out_of_stock" | "draft"
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  customer: {
    name: string
    email: string
    phone: string
    avatar?: string
  }
  items: {
    id: number
    name: string
    brand: string
    price: number
    quantity: number
    size: string
    color: string
    image: string
  }[]
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
  paymentStatus: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  trackingNumber: string | null
  estimatedDelivery: string
  createdAt: string
  updatedAt: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Air Max Revolution",
    brand: "Nike",
    category: "Running",
    price: 129.99,
    originalPrice: 159.99,
    description:
      "Experience revolutionary comfort with the Air Max Revolution. Featuring advanced cushioning technology and breathable mesh upper for all-day comfort. The responsive Air Max unit provides exceptional impact absorption, while the flyknit construction ensures a snug, supportive fit.",
    images: ["/nike-air-max-sneaker-white-and-blue.jpg"],
    colors: ["white", "blue", "black"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 45,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isFeatured: true,
    gender: "men",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Ultra Boost 22",
    brand: "Adidas",
    category: "Running",
    price: 189.99,
    description:
      "The Ultra Boost 22 delivers incredible energy return with every step. Perfect for runners who demand the best performance. The BOOST midsole cushioning provides unmatched energy return, while the Primeknit upper adapts to your foot for a custom fit.",
    images: ["/adidas-ultra-boost-running-shoe-black.jpg"],
    colors: ["black", "white", "gray"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 23,
    rating: 4.9,
    reviews: 89,
    isNew: false,
    isFeatured: true,
    gender: "unisex",
    status: "active",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    category: "Lifestyle",
    price: 65.99,
    description:
      "The iconic Chuck Taylor All Star. A timeless classic that never goes out of style. The canvas upper and rubber sole provide durability and comfort for everyday wear.",
    images: ["/converse-chuck-taylor-high-top-red.jpg"],
    colors: ["red", "black", "white"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 0,
    rating: 4.6,
    reviews: 256,
    isNew: false,
    isFeatured: true,
    gender: "unisex",
    status: "out_of_stock",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    name: "Old Skool Classic",
    brand: "Vans",
    category: "Lifestyle",
    price: 79.99,
    description:
      "The Vans Old Skool Classic combines heritage style with modern comfort. Perfect for everyday wear. The signature side stripe and waffle outsole make this an instantly recognizable classic.",
    images: ["/vans-old-skool-skateboard-shoe-black-white.jpg"],
    colors: ["black", "navy", "burgundy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 67,
    rating: 4.7,
    reviews: 178,
    isNew: true,
    isFeatured: true,
    gender: "unisex",
    status: "active",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  {
    id: 5,
    name: "Gel-Kayano 30",
    brand: "Asics",
    category: "Running",
    price: 159.99,
    originalPrice: 179.99,
    description:
      "The GEL-KAYANO 30 running shoe celebrates 30 years of stability and comfort. Featuring FF BLAST PLUS cushioning and 4D Guidance System technology for a supportive ride.",
    images: ["/placeholder.svg"],
    colors: ["blue", "black", "silver"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 34,
    rating: 4.7,
    reviews: 95,
    isNew: true,
    isFeatured: false,
    gender: "men",
    status: "active",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: 6,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    category: "Basketball",
    price: 179.99,
    description:
      "The Air Jordan 1 Retro High OG is the shoe that started it all. Premium leather construction with the classic Wings logo and Nike Air technology for timeless style and comfort.",
    images: ["/placeholder.svg"],
    colors: ["red", "black", "white"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 12,
    rating: 4.9,
    reviews: 312,
    isNew: false,
    isFeatured: true,
    gender: "men",
    status: "active",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
  },
  {
    id: 7,
    name: "Free Metcon 5",
    brand: "Nike",
    category: "Training",
    price: 119.99,
    description:
      "The Nike Free Metcon 5 combines flexibility with stability for your toughest workouts. Flexible forefoot for cardio, stable heel for lifting. The ultimate training companion.",
    images: ["/placeholder.svg"],
    colors: ["black", "gray", "green"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 56,
    rating: 4.5,
    reviews: 67,
    isNew: false,
    isFeatured: false,
    gender: "unisex",
    status: "active",
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z",
  },
  {
    id: 8,
    name: "Suede Classic XXI",
    brand: "Puma",
    category: "Lifestyle",
    price: 74.99,
    originalPrice: 89.99,
    description:
      "The PUMA Suede Classic XXI pays homage to the original 1968 design with premium suede upper and clean lines. A streetwear icon that transcends generations.",
    images: ["/placeholder.svg"],
    colors: ["navy", "red", "black"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 89,
    rating: 4.4,
    reviews: 143,
    isNew: false,
    isFeatured: false,
    gender: "unisex",
    status: "active",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: 9,
    name: "Fresh Foam X 1080v13",
    brand: "New Balance",
    category: "Running",
    price: 154.99,
    description:
      "The Fresh Foam X 1080v13 provides plush comfort for every run. The Fresh Foam X midsole delivers an ultra-cushioned ride, while the Hypoknit upper ensures breathability and support.",
    images: ["/placeholder.svg"],
    colors: ["black", "white", "blue"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 41,
    rating: 4.8,
    reviews: 201,
    isNew: true,
    isFeatured: true,
    gender: "women",
    status: "active",
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: 10,
    name: "Stan Smith",
    brand: "Adidas",
    category: "Lifestyle",
    price: 89.99,
    description:
      "The Adidas Stan Smith has been a style icon for over 50 years. Clean, minimalist design with premium leather upper and cupsole construction for timeless appeal.",
    images: ["/placeholder.svg"],
    colors: ["white", "green", "navy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 78,
    rating: 4.6,
    reviews: 189,
    isNew: false,
    isFeatured: false,
    gender: "unisex",
    status: "active",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: 11,
    name: "Dynamo 2 GS",
    brand: "Nike",
    category: "Lifestyle",
    price: 49.99,
    description:
      "The Nike Dynamo 2 GS provides easy on and off for kids with a stretchy, lightweight design. Perfect for active kids on the go.",
    images: ["/placeholder.svg"],
    colors: ["blue", "pink", "black"],
    sizes: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6"],
    stock: 102,
    rating: 4.5,
    reviews: 56,
    isNew: true,
    isFeatured: false,
    gender: "kids",
    status: "active",
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: 12,
    name: "Ultraroam 2.0",
    brand: "Adidas",
    category: "Training",
    price: 109.99,
    originalPrice: 134.99,
    description:
      "The Adidas Ultraroam 2.0 is built for versatile training. Bounce cushioning provides comfort, while the Adiwear outsole delivers durability for any surface.",
    images: ["/placeholder.svg"],
    colors: ["black", "white", "red"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 28,
    rating: 4.3,
    reviews: 44,
    isNew: false,
    isFeatured: false,
    gender: "women",
    status: "active",
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
]

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    customer: { name: "John Doe", email: "john@example.com", phone: "+1234567890", avatar: "/placeholder.svg" },
    items: [
      { id: 1, name: "Air Max Revolution", brand: "Nike", price: 129.99, quantity: 1, size: "10", color: "White/Blue", image: "/nike-air-max-sneaker-white-and-blue.jpg" },
    ],
    shippingAddress: { firstName: "John", lastName: "Doe", address: "123 Main St", city: "New York", state: "NY", zipCode: "10001", country: "United States" },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 129.99,
    shipping: 0,
    tax: 10.4,
    total: 140.39,
    status: "completed",
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-20",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ORD-002",
    userId: "2",
    customer: { name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", avatar: "/placeholder.svg" },
    items: [
      { id: 2, name: "Ultra Boost 22", brand: "Adidas", price: 189.99, quantity: 1, size: "8.5", color: "Black", image: "/adidas-ultra-boost-running-shoe-black.jpg" },
    ],
    shippingAddress: { firstName: "Jane", lastName: "Smith", address: "456 Oak Ave", city: "Los Angeles", state: "CA", zipCode: "90210", country: "United States" },
    paymentMethod: "paypal",
    paymentStatus: "paid",
    subtotal: 189.99,
    shipping: 9.99,
    tax: 15.2,
    total: 215.18,
    status: "processing",
    trackingNumber: null,
    estimatedDelivery: "2024-01-22",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "ORD-003",
    userId: "3",
    customer: { name: "Mike Johnson", email: "mike@example.com", phone: "+1234567892", avatar: "/placeholder.svg" },
    items: [
      { id: 3, name: "Chuck Taylor All Star", brand: "Converse", price: 65.99, quantity: 2, size: "9", color: "Red", image: "/converse-chuck-taylor-high-top-red.jpg" },
    ],
    shippingAddress: { firstName: "Mike", lastName: "Johnson", address: "789 Pine Rd", city: "Chicago", state: "IL", zipCode: "60601", country: "United States" },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 131.98,
    shipping: 0,
    tax: 10.56,
    total: 142.54,
    status: "shipped",
    trackingNumber: "1Z999BB9876543210",
    estimatedDelivery: "2024-01-19",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "ORD-004",
    userId: "4",
    customer: { name: "Sarah Wilson", email: "sarah@example.com", phone: "+1234567893", avatar: "/placeholder.svg" },
    items: [
      { id: 1, name: "Air Max Revolution", brand: "Nike", price: 129.99, quantity: 1, size: "8", color: "White/Blue", image: "/nike-air-max-sneaker-white-and-blue.jpg" },
      { id: 3, name: "Chuck Taylor All Star", brand: "Converse", price: 65.99, quantity: 1, size: "8", color: "Black", image: "/converse-chuck-taylor-high-top-red.jpg" },
    ],
    shippingAddress: { firstName: "Sarah", lastName: "Wilson", address: "321 Elm Blvd", city: "Houston", state: "TX", zipCode: "77001", country: "United States" },
    paymentMethod: "card",
    paymentStatus: "pending",
    subtotal: 195.98,
    shipping: 0,
    tax: 15.68,
    total: 211.66,
    status: "pending",
    trackingNumber: null,
    estimatedDelivery: "2024-01-25",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "ORD-005",
    userId: "5",
    customer: { name: "Alex Brown", email: "alex@example.com", phone: "+1234567894", avatar: "/placeholder.svg" },
    items: [
      { id: 4, name: "Old Skool Classic", brand: "Vans", price: 79.99, quantity: 1, size: "10.5", color: "Black", image: "/vans-old-skool-skateboard-shoe-black-white.jpg" },
    ],
    shippingAddress: { firstName: "Alex", lastName: "Brown", address: "555 Cedar Ln", city: "Phoenix", state: "AZ", zipCode: "85001", country: "United States" },
    paymentMethod: "paypal",
    paymentStatus: "paid",
    subtotal: 79.99,
    shipping: 9.99,
    tax: 6.4,
    total: 96.38,
    status: "completed",
    trackingNumber: "1Z999CC5678901234",
    estimatedDelivery: "2024-01-18",
    createdAt: "2024-01-11T11:00:00Z",
    updatedAt: "2024-01-11T11:00:00Z",
  },
]

export const categories = [
  { name: "Running", slug: "running", image: "/running-shoes-on-track.jpg", description: "Performance running shoes", count: 4 },
  { name: "Basketball", slug: "basketball", image: "/basketball-sneakers-on-court.jpg", description: "High-top basketball shoes", count: 1 },
  { name: "Lifestyle", slug: "lifestyle", image: "/casual-lifestyle-sneakers.jpg", description: "Everyday casual wear", count: 4 },
  { name: "Training", slug: "training", image: "/cross-training-athletic-shoes.jpg", description: "Cross-training footwear", count: 2 },
]

export const brands = ["Nike", "Adidas", "Converse", "Vans", "Asics", "Puma", "New Balance"]

export function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    white: "bg-white border-gray-300",
    black: "bg-black",
    blue: "bg-blue-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    navy: "bg-blue-900",
    burgundy: "bg-red-800",
    green: "bg-green-500",
    silver: "bg-gray-300",
    pink: "bg-pink-400",
  }
  return colorMap[color] || "bg-gray-400"
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
