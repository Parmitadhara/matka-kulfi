const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'matka_kulfi_secret_key_2026';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/matkakulfi';

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// MongoDB Connection & Auto-Seed Setup
// ----------------------------------------------------
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('🍃 Connected to MongoDB Successfully (Database: matkakulfi)');
    await seedInitialProducts();
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ----------------------------------------------------
// Schemas & Models
// ----------------------------------------------------
const addressSchema = new mongoose.Schema({
  tag: { type: String, default: 'Home' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  addressLine: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: [addressSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  badge: { type: String, default: 'Artisanal' },
  badgeColor: { type: String, default: 'bg-amber-600' },
  price: { type: Number, required: true },
  size: { type: String, default: '160ml Clay Pot' },
  rating: { type: String, default: '4.9' },
  reviews: { type: Number, default: 1200 },
  description: { type: String },
  image: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    id: Number,
    title: String,
    price: Number,
    qty: Number
  }],
  address: addressSchema,
  totalAmount: Number,
  paymentMethod: { type: String, default: 'Cash / UPI Scan at Arrival' },
  status: { type: String, default: 'Confirmed - Preparing Cold Dispatch (-18°C)' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

// ----------------------------------------------------
// Initial Database Seeder
// ----------------------------------------------------
async function seedInitialProducts() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return;

    const initialCatalog = [
      {
        id: 101,
        title: "Rainbow Sprinkle Waffle Cone Trio",
        category: "cones",
        badge: "Crispy Waffle",
        badgeColor: "bg-pink-600",
        price: 159,
        size: "3 Waffle Cones Pack",
        rating: "4.9",
        reviews: 2410,
        description: "Handcrafted waffle cones lined with Belgian chocolate, stacked with strawberry, mango & vanilla scoops topped with rainbow confetti.",
        image: "https://png.pngtree.com/png-clipart/20250506/original/pngtree-colorful-ice-cream-cones-with-sprinkles-and-fresh-fruits-png-image_20936445.png"
      },
      {
        id: 102,
        title: "Double-Dip Gourmet Fruit Popsicle Bar",
        category: "bars",
        badge: "Real Fruit Bar",
        badgeColor: "bg-rose-600",
        price: 129,
        size: "110ml Frozen Bar",
        rating: "4.8",
        reviews: 1980,
        description: "Layered mango and wildberry ice cream bar coated in snap-crisp white chocolate drizzle and toasted almond crunch.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCQfMnQh5DG2IZJuAOg0NEDHxOnc5ZbDNskToV-nC9Q&s=10"
      },
      {
        id: 103,
        title: "Gluten-Free Pure Velvet Artisan Tub",
        category: "glutenfree",
        badge: "100% Gluten-Free",
        badgeColor: "bg-emerald-700",
        price: 189,
        size: "180ml Biodegradable Pot",
        rating: "4.9",
        reviews: 1140,
        description: "Certified gluten-free creamy vanilla bean and rich hazelnut churn, crafted with organic milk and zero wheat starches.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2_mqpa3YHJnfhYunAy_j7tZrVDSlO982PoW3cxuhwg&s=10"
      },
      {
        id: 1,
        title: "Royal Shahi Kesar Pista Matka",
        category: "matka",
        badge: "Bestseller",
        badgeColor: "bg-amber-600",
        price: 149,
        size: "160ml Clay Pot",
        rating: "4.9",
        reviews: 3200,
        description: "Slow-reduced whole milk steeped with Kashmiri saffron strands, green cardamom, and generous flakes of roasted Iranian pistachios.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScnbUHdkLrQC_KMk8r6VPOshp16sNF1ykIka3JP-VWjg&s=10"
      },
      {
        id: 2,
        title: "Belgian Dark Truffle Churned Pot",
        category: "chocolate",
        badge: "Gourmet Churn",
        badgeColor: "bg-amber-900",
        price: 159,
        size: "175ml Handcrafted Tub",
        rating: "4.9",
        reviews: 2150,
        description: "Slow-churned 70% dark Belgian cocoa infused with rich malai cream and roasted almond nibs, cold-set in traditional earthen cups.",
        image: "https://carveyourcraving.com/wp-content/uploads/2021/06/chocolate-icecream-in-an-icecream-maker.jpg"
      },
      {
        id: 3,
        title: "Fudge Brownie Matka Scoop",
        category: "chocolate",
        badge: "Fudge Supreme",
        badgeColor: "bg-stone-800",
        price: 149,
        size: "160ml Clay Pot",
        rating: "4.8",
        reviews: 1840,
        description: "Dense roasted walnut brownie bites layered between chocolate rabdi cream, finished with thick warm cocoa ganache drizzle.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDn_yc6wTONsQxPaBJN1_85_bHX_I7PBcxhBpo5Uw7HA&s=10"
      },
      {
        id: 4,
        title: "Velvety Cocoa Swirl Cone",
        category: "chocolate",
        badge: "Trending",
        badgeColor: "bg-amber-800",
        price: 139,
        size: "150ml Scoop Pot",
        rating: "4.7",
        reviews: 970,
        description: "Hand-churned chocolate swirl ice cream combining intense cocoa ribbons and farm-fresh cream in an authentic clay cup.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1DVNjKfilgq7YsQqr3kn4HS0j7qvac6vYW2P5qFn0tQ&s=10"
      },
      {
        id: 5,
        title: "Authentic Chocolate Rabdi Matka",
        category: "chocolate",
        badge: "Signature",
        badgeColor: "bg-stone-700",
        price: 139,
        size: "160ml Clay Pot",
        rating: "4.8",
        reviews: 1420,
        description: "Harmonious union of traditional condensed buffalo rabdi infused with molten dark cacao and roasted cashews.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScnbUHdkLrQC_KMk8r6VPOshp16sNF1ykIka3JP-VWjg&s=10"
      }
    ];

    await Product.insertMany(initialCatalog);
    console.log('🍧 Catalog items seeded into MongoDB successfully.');
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}

// ----------------------------------------------------
// Authentication Middleware
// ----------------------------------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = decodedUser;
    next();
  });
};

// ----------------------------------------------------
// Auth Routes
// ----------------------------------------------------

// POST /api/auth/signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      addresses: []
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup', error: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

// ----------------------------------------------------
// Saved Address Routes
// ----------------------------------------------------

// GET /api/users/addresses - Retrieve saved addresses for logged-in user
app.get('/api/users/addresses', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.addresses || []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch addresses', error: err.message });
  }
});

// POST /api/users/addresses - Save a new address
app.post('/api/users/addresses', authenticateToken, async (req, res) => {
  try {
    const { tag, name, phone, pincode, addressLine } = req.body;
    if (!name || !phone || !pincode || !addressLine) {
      return res.status(400).json({ message: 'All address fields are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAddress = { tag: tag || 'Home', name, phone, pincode, addressLine };
    user.addresses.push(newAddress);
    await user.save();

    const createdAddress = user.addresses[user.addresses.length - 1];
    res.status(201).json(createdAddress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save address', error: err.message });
  }
});

// DELETE /api/users/addresses/:addressId - Delete an address
app.delete('/api/users/addresses/:addressId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addressId);
    await user.save();
    res.json({ message: 'Address removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete address', error: err.message });
  }
});

// ----------------------------------------------------
// Catalog & Order Routes
// ----------------------------------------------------

// GET /api/products - Get all ice cream products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch catalog', error: err.message });
  }
});

// POST /api/orders - Place a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, address, totalAmount, paymentMethod } = req.body;
    const authHeader = req.headers['authorization'];
    let userId = null;

    if (authHeader) {
      try {
        const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        userId = decoded.id;
      } catch (e) {
        // Allow guest checkouts if token verification fails
      }
    }

    const newOrder = await Order.create({
      userId,
      items,
      address,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash / UPI Scan at Arrival',
      status: 'Confirmed - Preparing Cold Dispatch (-18°C)'
    });

    res.status(201).json({ 
      message: 'Order received and dispatched to cold chain packaging', 
      orderId: newOrder._id 
    });
  } catch (err) {
    res.status(500).json({ message: 'Order placement failed', error: err.message });
  }
});

// Root Health Check Route
app.get('/api', (req, res) => {
  res.json({ status: 'active', message: 'Matka Kulfi Express API Server running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Matka Kulfi Express API Server running on http://localhost:${PORT}`);
});