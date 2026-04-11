export const mockProducts = [
  {
    id: 'urban-courier-jacket',
    name: 'Urban Courier Jacket',
    category: 'Outerwear',
    price: 129,
    originalPrice: 169,
    rating: 4.8,
    reviews: 218,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80',
    description:
      'Weather-shield shell jacket with hidden ventilation and magnetic chest pockets.',
    colors: ['Graphite', 'Sand', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: ['Waterproof 10K', 'Wind-resistant', 'Machine washable'],
    inStock: true,
  },
  {
    id: 'nova-knit-sneaker',
    name: 'Nova Knit Sneaker',
    category: 'Footwear',
    price: 89,
    originalPrice: 109,
    rating: 4.6,
    reviews: 403,
    badge: 'Free Shipping',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description:
      'Lightweight everyday sneaker with memory foam insole and breathable knit upper.',
    colors: ['Black', 'Cloud', 'Lime'],
    sizes: ['39', '40', '41', '42', '43'],
    specs: ['Memory foam insole', 'Knit upper', 'Slip-resistant sole'],
    inStock: true,
  },
  {
    id: 'drift-utility-backpack',
    name: 'Drift Utility Backpack',
    category: 'Accessories',
    price: 74,
    originalPrice: 99,
    rating: 4.7,
    reviews: 152,
    badge: 'Limited',
    image:
      'https://images.unsplash.com/photo-1509762774605-f07235a08f1f?auto=format&fit=crop&w=900&q=80',
    description:
      '28L modular backpack with padded laptop sleeve and quick-access side pocket.',
    colors: ['Olive', 'Slate'],
    sizes: ['28L'],
    specs: ['Water-repellent fabric', 'Laptop sleeve 16 inch', 'Weight 780g'],
    inStock: true,
  },
  {
    id: 'lumen-desk-lamp',
    name: 'Lumen Desk Lamp',
    category: 'Home',
    price: 58,
    originalPrice: 69,
    rating: 4.5,
    reviews: 96,
    badge: 'New Arrival',
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    description:
      'Minimal task lamp with three warmth settings and wireless charging base.',
    colors: ['Matte White', 'Charcoal'],
    sizes: ['One size'],
    specs: ['USB-C charging', 'Dimmable', 'Touch control'],
    inStock: true,
  },
  {
    id: 'aero-performance-tee',
    name: 'Aero Performance Tee',
    category: 'Apparel',
    price: 36,
    originalPrice: 49,
    rating: 4.4,
    reviews: 281,
    badge: '2-for-1',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    description:
      'Moisture-wicking training tee engineered for movement and all-day comfort.',
    colors: ['Stone', 'Sky', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: ['Quick dry', 'Four-way stretch', 'Anti-odor finish'],
    inStock: true,
  },
  {
    id: 'terra-ceramic-mug',
    name: 'Terra Ceramic Mug Set',
    category: 'Home',
    price: 42,
    originalPrice: 55,
    rating: 4.9,
    reviews: 67,
    badge: 'Handmade',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
    description:
      'Set of two matte ceramic mugs finished by hand in small-batch studio runs.',
    colors: ['Clay', 'Ink'],
    sizes: ['350ml'],
    specs: ['Dishwasher safe', 'Microwave safe', 'Set of 2'],
    inStock: true,
  },
]

export const featuredProductIds = [
  'urban-courier-jacket',
  'nova-knit-sneaker',
  'drift-utility-backpack',
  'lumen-desk-lamp',
]

export const cartSeed = [
  { productId: 'urban-courier-jacket', quantity: 1 },
  { productId: 'nova-knit-sneaker', quantity: 2 },
  { productId: 'terra-ceramic-mug', quantity: 1 },
]
