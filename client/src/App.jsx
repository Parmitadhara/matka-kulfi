import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Sparkles, 
  Check, 
  X, 
  ChevronRight, 
  Plus, 
  Minus, 
  Star, 
  Truck, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Package, 
  Calendar,
  Layers,
  ThermometerSnowflake,
  ExternalLink
} from 'lucide-react';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : '/api';

const INITIAL_CATALOG = [
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

const VARIETIES = [
  {
    id: "fmt-1",
    productId: 101,
    title: "Rainbow Sprinkle Waffle Cone Trio",
    category: "cones",
    catName: "Waffle Cones",
    bg: "bg-sky-50",
    price: 159,
    image: "https://png.pngtree.com/png-clipart/20250506/original/pngtree-colorful-ice-cream-cones-with-sprinkles-and-fresh-fruits-png-image_20936445.png",
    desc: "Triple artisanal waffle cones loaded with vibrant scoops of strawberry, sweet mango and vanilla, topped with crunchy rainbow sprinkles.",
    highlights: ["Baked crispy waffle cone with chocolate bottom tip", "Triple flavor scoop assortment with fresh fruit puree", "Arrives in individual moisture-sealed cone cradles"]
  },
  {
    id: "fmt-2",
    productId: 102,
    title: "Double-Dip Mango & Berry Bar",
    category: "bars",
    catName: "Ice Cream Bars & Pops",
    bg: "bg-rose-50",
    price: 129,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCQfMnQh5DG2IZJuAOg0NEDHxOnc5ZbDNskToV-nC9Q&s=10",
    desc: "Sublime fruit cream popsicle bar dipped into frozen tropical mango swirl and coated with a crunchy roasted almond crust.",
    highlights: ["100% Real Alphonso mango & blackberry puree", "Snap-hard cocoa coating on a natural wooden stick", "Shipped solid at -18°C with thermal ice pellets"]
  },
  {
    id: "fmt-3",
    productId: 103,
    title: "Certified Gluten-Free Vanilla Velvet Pot",
    category: "glutenfree",
    catName: "Gluten-Free & Keto",
    bg: "bg-emerald-50",
    price: 189,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2_mqpa3YHJnfhYunAy_j7tZrVDSlO982PoW3cxuhwg&s=10",
    desc: "Artisanal small-batch scoop formulated without wheat or gluten. Rich madagascar vanilla churned with velvety pasture-raised cream.",
    highlights: ["Dedicated gluten-free certified facility", "Zero artificial thickeners or wheat stabilizers", "Keto-friendly low net-carb indulgence"]
  }
];

export default function App() {
  // Products and Category State
  const [products, setProducts] = useState(INITIAL_CATALOG);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVarietyTab, setSelectedVarietyTab] = useState('all');

  // Cart & Drawer State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // User Authentication & Saved Addresses
  const [token, setToken] = useState(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('mk_jwt_token') : null;
  });
  const [user, setUser] = useState(() => {
    const cached = typeof window !== 'undefined' ? localStorage.getItem('mk_user') : null;
    return cached ? JSON.parse(cached) : null;
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [addressManagerOpen, setAddressManagerOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [formatDetailModal, setFormatDetailModal] = useState(null);
  const [alertModal, setAlertModal] = useState({ open: false, title: '', message: '' });

  // Pincode validation state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  // Bulk event state
  const [bulkGuests, setBulkGuests] = useState(150);
  const [bulkFormat, setBulkFormat] = useState('matka');
  const [bulkCustomStamping, setBulkCustomStamping] = useState(false);

  // Address creation form state
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ tag: 'Home', name: '', phone: '', pincode: '', addressLine: '' });

  // Auth form state
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({ mood: null, format: null });
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    // 1. Fetch dynamic products from Express if available
    const fetchCatalog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setProducts(data);
        }
      } catch (err) {
        // Fallback to static initial catalog seamlessly
      }
    };
    fetchCatalog();

    // 2. Fetch saved addresses from Express/MongoDB if logged in
    if (token) {
      fetchAddresses();
    } else {
      // Load local sample addresses for guest
      const localAddrs = [
        {
          _id: 'sample-1',
          tag: 'Home',
          name: 'Aarav Sharma',
          phone: '9876543210',
          pincode: '324005',
          addressLine: 'Flat 402, Royal Palms, Talwandi, Kota'
        }
      ];
      setSavedAddresses(localAddrs);
      setSelectedAddressId(localAddrs[0]._id);
    }
  }, [token]);

  const fetchAddresses = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/users/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses(data);
        if (data.length > 0 && !selectedAddressId) {
          setSelectedAddressId(data[0]._id);
        }
      }
    } catch (err) {
      console.warn("Addresses fetch failed:", err);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.qty, 0);
  }, [cart]);

  const handleCheckPincode = () => {
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit postal code.' });
      return;
    }
    setPincodeStatus({
      valid: true,
      message: `Pincode ${pincode} verified for 30-Minute Dry-Ice Cold Dispatch! Guaranteed -18°C rock-solid arrival.`
    });
  };

  const bulkEstimate = useMemo(() => {
    let basePrice = 140;
    if (bulkFormat === 'cones') basePrice = 150;
    if (bulkFormat === 'bars') basePrice = 120;

    let discountPercent = 10;
    if (bulkGuests >= 300) discountPercent = 20;
    else if (bulkGuests >= 150) discountPercent = 15;

    const stampingCost = bulkCustomStamping ? 10 : 0;
    const perUnit = Math.round(basePrice * (1 - discountPercent / 100)) + stampingCost;
    const total = perUnit * bulkGuests;

    return { total, perUnit, discountPercent };
  }, [bulkGuests, bulkFormat, bulkCustomStamping]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = authMode === 'signup' ? '/auth/signup' : '/auth/login';

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mk_jwt_token', data.token);
      localStorage.setItem('mk_user', JSON.stringify(data.user));
      setAuthModalOpen(false);
      setAlertModal({
        open: true,
        title: 'Welcome!',
        message: `Successfully logged in as ${data.user.name || data.user.email}`
      });
    } catch (err) {
      // Mock client fallback for demo
      const mockUser = {
        name: authForm.name || authForm.email.split('@')[0],
        email: authForm.email
      };
      const mockToken = 'mock_jwt_' + Date.now();
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('mk_jwt_token', mockToken);
      localStorage.setItem('mk_user', JSON.stringify(mockUser));
      setAuthModalOpen(false);
      setAlertModal({
        open: true,
        title: 'Logged In (Offline Mock Mode)',
        message: `Welcome, ${mockUser.name}! Connect Express server at port 5000 for full MongoDB persistence.`
      });
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mk_jwt_token');
    localStorage.removeItem('mk_user');
    setAlertModal({
      open: true,
      title: 'Logged Out',
      message: 'You are now browsing as a guest.'
    });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.phone || !newAddr.pincode || !newAddr.addressLine) {
      setAlertModal({ open: true, title: 'Incomplete Details', message: 'Please fill in all address fields.' });
      return;
    }
    if (!/^\d{6}$/.test(newAddr.pincode)) {
      setAlertModal({ open: true, title: 'Invalid Pincode', message: 'Postal code must be 6 digits.' });
      return;
    }

    try {
      if (token) {
        const res = await fetch(`${API_BASE_URL}/users/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newAddr)
        });
        if (res.ok) {
          const saved = await res.json();
          setSavedAddresses((prev) => [...prev, saved]);
          setSelectedAddressId(saved._id);
        }
      } else {
        const localId = 'local-' + Date.now();
        const addressObj = { _id: localId, ...newAddr };
        setSavedAddresses((prev) => [...prev, addressObj]);
        setSelectedAddressId(localId);
      }

      setShowNewAddressForm(false);
      setNewAddr({ tag: 'Home', name: '', phone: '', pincode: '', addressLine: '' });
      setAlertModal({ open: true, title: 'Address Saved', message: 'Your location is stored for seamless 1-click orders!' });
    } catch (err) {
      console.warn("Failed saving address to server:", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/users/addresses/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        console.warn("Could not delete from server", e);
      }
    }
    setSavedAddresses((prev) => prev.filter((a) => a._id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(savedAddresses.length > 1 ? savedAddresses[0]._id : null);
    }
  };

  const handlePlaceOrder = async () => {
    const activeAddress = savedAddresses.find((a) => a._id === selectedAddressId);
    if (!activeAddress) {
      setAlertModal({
        open: true,
        title: 'Address Needed',
        message: 'Please choose or add a delivery address to complete your order.'
      });
      return;
    }

    const orderPayload = {
      items: cart,
      address: activeAddress,
      totalAmount: subtotal,
      paymentMethod: 'Cash / UPI Scan at Arrival',
      coldPacking: true
    };

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(orderPayload)
        });
      } catch (err) {
        console.warn("Server order logging:", err);
      }
    }

    setCart([]);
    setCheckoutModalOpen(false);
    setAlertModal({
      open: true,
      title: '🎉 Order Dispatched at -18°C!',
      message: `Delivering to ${activeAddress.tag}: ${activeAddress.addressLine} (${activeAddress.pincode}). Total ₹${subtotal}. Rider departing shortly in dry-ice parcel!`
    });
  };

  const handleQuizSubmit = () => {
    let matchedId = 1;
    if (quizAnswers.mood === 'choc') matchedId = 2;
    else if (quizAnswers.mood === 'fruit' || quizAnswers.format === 'bar') matchedId = 102;
    else if (quizAnswers.mood === 'clean') matchedId = 103;
    else if (quizAnswers.format === 'cone') matchedId = 101;

    const matched = products.find((p) => p.id === matchedId) || products[0];
    setQuizResult(matched);
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const filteredVarieties = useMemo(() => {
    if (selectedVarietyTab === 'all') return VARIETIES;
    return VARIETIES.filter((v) => v.category === selectedVarietyTab);
  }, [selectedVarietyTab]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#082245] font-sans antialiased selection:bg-[#C85A32] selection:text-white">
      {/* Top Utility Header */}
      <header className="w-full bg-[#FAF7F2] border-b border-[#EAE3D6] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-serif font-black tracking-wide text-[#8F3414] flex items-center gap-1.5 whitespace-nowrap">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C85A32]"></span>
              Matka Kulfi™
            </span>
            <span className="text-neutral-300">|</span>
            <button onClick={() => setSelectedCategory('cones')} className="font-semibold text-neutral-600 hover:text-[#082245] transition">Waffle Cones</button>
            <button onClick={() => setSelectedCategory('bars')} className="font-semibold text-neutral-600 hover:text-[#082245] transition">Fruit Bars</button>
            <button onClick={() => setSelectedCategory('glutenfree')} className="font-semibold text-neutral-600 hover:text-[#082245] transition">Gluten-Free</button>
            <button onClick={() => setSelectedCategory('chocolate')} className="font-semibold text-neutral-600 hover:text-[#082245] transition">Dark Churns</button>
            <button onClick={() => setSelectedCategory('matka')} className="font-semibold text-neutral-600 hover:text-[#082245] transition">Clay Pots</button>
          </div>
          
          <div className="flex items-center gap-4 text-[11px] font-semibold text-neutral-600">
            {user ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-emerald-900 truncate max-w-[120px]">{user.name || user.email}</span>
                <button onClick={handleLogout} className="text-neutral-400 hover:text-red-600 ml-1">Log out</button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="font-bold text-[#082245] bg-white px-3 py-1 rounded-full border border-neutral-300 shadow-sm hover:border-[#082245]"
              >
                Log In / Sign Up
              </button>
            )}
            <a href="#bulk" className="hidden md:inline-block hover:text-[#C85A32] transition">Catering & Weddings</a>
            <a href="#delivery" className="hidden md:inline-block hover:text-[#C85A32] transition">Express Dispatch</a>
          </div>
        </div>
      </header>

      {/* Persistent Sticky Navbar */}
      <nav className="sticky top-2 z-40 max-w-5xl mx-auto px-4 -mb-8 pt-2 transition-all duration-300">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-neutral-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between relative">
          <div className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-bold text-[#082245]">
            <a href="#catalog" className="hover:text-[#C85A32] transition">Products</a>
            <a href="#formats" className="hover:text-[#C85A32] transition">Varieties</a>
            <a href="#experience" className="hidden sm:inline-block hover:text-[#C85A32] transition">Experience</a>
          </div>

          {/* Center Brand Crest */}
          <div className="absolute left-1/2 -top-5 sm:-top-7 -translate-x-1/2 flex flex-col items-center">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 shadow-2xl border-2 border-[#0A88D8] flex items-center justify-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="w-full h-full rounded-full border border-sky-100 flex flex-col items-center justify-center bg-sky-50/50 text-center">
                <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#0A88D8] leading-none">ICE CREAM</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#082245] my-0.5" />
                <span className="text-[8px] sm:text-[9px] font-black tracking-wider text-[#8F3414] leading-none">MATKA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-bold text-[#082245]">
            <button onClick={() => setAddressManagerOpen(true)} className="flex items-center gap-1 hover:text-[#C85A32] transition">
              <MapPin className="w-4 h-4 text-[#C85A32]" />
              <span className="hidden md:inline">Saved Addresses</span>
            </button>
            <button onClick={() => setQuizModalOpen(true)} className="hidden md:inline-flex items-center gap-1.5 text-[#0A88D8] hover:text-[#082245] transition">
              <span>Quiz</span>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-neutral-100 transition"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#082245]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C85A32] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section: Split 50/50 Layout */}
      <section className="w-full relative overflow-hidden pt-10 sm:pt-14 pb-12 sm:pb-20 border-b border-[#EDE7DD]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
          {/* Left Column (Sky Mist Blue) */}
          <div className="lg:col-span-5 bg-[#DCEEF8] px-6 sm:px-12 lg:px-16 py-16 sm:py-24 flex flex-col justify-center items-start relative z-10">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0C4E78] mb-3">
              The best ice cream brands
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#082245] leading-[1.08] font-serif tracking-tight mb-6">
              All your faves, all in one place.
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 max-w-md font-medium mb-8">
              From authentic slow-reduced saffron clay matkas to crisp waffle cones, chocolate churns, and gluten-free fruit bars.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#catalog"
                className="inline-flex items-center gap-2 bg-[#082245] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full hover:bg-[#05162E] transition shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Get the scoop!</span>
                <ChevronRight className="w-4 h-4 text-[#0A88D8]" />
              </a>
              <button 
                onClick={() => setQuizModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[#082245] font-bold text-sm px-6 py-3.5 rounded-full transition border border-white/60 shadow-sm"
              >
                <span>Take Flavor Quiz</span>
              </button>
            </div>
          </div>

          {/* Right Column (Caramel Tan with High-Res Hero Image) */}
          <div className="lg:col-span-7 bg-[#D3A274] relative overflow-hidden flex items-end justify-center px-4 pt-12 sm:pt-16 pb-0">
            <div className="absolute inset-0 pointer-events-none select-none opacity-20 overflow-hidden flex flex-col justify-between py-6 leading-none">
              <span className="text-6xl sm:text-8xl font-black text-white tracking-widest uppercase transform rotate-[-4deg] translate-x-12">Craviest.</span>
              <span className="text-6xl sm:text-8xl font-black text-white tracking-widest uppercase transform rotate-[-2deg] -translate-x-10">Yummiest.</span>
              <span className="text-6xl sm:text-8xl font-black text-white tracking-widest uppercase transform rotate-[-5deg] translate-x-20">Authentic.</span>
            </div>

            <div className="relative z-10 max-w-lg mx-auto w-full flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white/20 backdrop-blur-xs">
                <img 
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80" 
                  alt="Artisanal ice cream dessert experience" 
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#C85A32] tracking-wider">Fast Cold Delivery</span>
                    <p className="text-xs sm:text-sm font-black text-[#082245]">Rock Solid at -18°C In 30 Mins</p>
                  </div>
                  <a href="#delivery" className="text-xs font-bold text-[#0A88D8] hover:underline">Check Pin →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flavor Finder Collage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 border-b border-[#EDE7DD]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#082245] font-serif leading-tight">
              Find your new fave flavor.
            </h2>
            <p className="text-neutral-600 font-medium text-sm sm:text-base leading-relaxed">
              Take the quiz to see which flavor you're feeling — whether it's rich royal cardamom saffron, dark cocoa velvet, or crisp waffle treats.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setQuizModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#082245] text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#05162E] transition shadow-md"
              >
                <span>Take the quiz</span>
                <ChevronRight className="w-4 h-4 text-[#0A88D8]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
              <div className="col-span-4 space-y-3 sm:space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE7DD] bg-rose-50 group hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkCQfMnQh5DG2IZJuAOg0NEDHxOnc5ZbDNskToV-nC9Q&s=10" 
                      alt="Fruit Bar Popsicle" 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE7DD] bg-emerald-50 group hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[5/4] relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2_mqpa3YHJnfhYunAy_j7tZrVDSlO982PoW3cxuhwg&s=10" 
                      alt="Gluten-Free Pure Scoop" 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-4 space-y-3 sm:space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-amber-50 group hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src="https://carveyourcraving.com/wp-content/uploads/2021/06/chocolate-icecream-in-an-icecream-maker.jpg" 
                      alt="Dark chocolate churn pot" 
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE7DD] bg-orange-50 group hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScnbUHdkLrQC_KMk8r6VPOshp16sNF1ykIka3JP-VWjg&s=10" 
                      alt="Shahi Kesar Pista Matka Kulfi" 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-4 space-y-3 sm:space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE7DD] bg-sky-50 group hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/5] relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src="https://png.pngtree.com/png-clipart/20250506/original/pngtree-colorful-ice-cream-cones-with-sprinkles-and-fresh-fruits-png-image_20936445.png" 
                      alt="Waffle cone ice cream stack" 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#EDE7DD] bg-neutral-900 text-white p-4 flex flex-col justify-center">
                  <span className="text-[10px] font-black uppercase text-[#E5A93C]">Handcrafted</span>
                  <p className="text-xs font-bold mt-1">100% Buffalo Rabdi Reduced for 8 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Varieties Section (3 Balanced Columns) */}
      <section id="formats" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 border-b border-[#EDE7DD]">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-[#082245] font-serif">Explore Ice Cream Varieties</h2>
          <p className="text-neutral-600 font-medium text-sm mt-1">From crunchy waffle cones and double-dipped real fruit bars to certified gluten-free pots.</p>

          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pt-6 pb-4">
            {['all', 'cones', 'bars', 'glutenfree'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedVarietyTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition capitalize ${
                  selectedVarietyTab === tab 
                    ? 'bg-[#B7E8F6] text-[#082245] shadow-sm' 
                    : 'bg-[#F4EFEA] hover:bg-[#EAE2D8] text-neutral-700'
                }`}
              >
                {tab === 'all' ? 'All Varieties' : tab === 'glutenfree' ? 'Gluten-Free & Keto' : tab}
              </button>
            ))}
          </div>

          <div className="w-full flex h-1.5 rounded-full overflow-hidden mt-2">
            <div className="w-[82%] bg-[#082245]"></div>
            <div className="w-[18%] bg-[#0A88D8]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredVarieties.map((fmt) => (
            <div 
              key={fmt.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#EDE7DD] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className={`p-6 ${fmt.bg} relative overflow-hidden aspect-[4/3] flex items-center justify-center`}>
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#082245] text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">
                  {fmt.catName}
                </span>
                <img 
                  src={fmt.image} 
                  alt={fmt.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#082245] font-serif">{fmt.title}</h3>
                  <p className="text-xs text-neutral-600 font-medium mt-1 leading-relaxed">{fmt.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 font-bold block">Starting at</span>
                    <span className="text-lg font-black text-[#C85A32]">₹{fmt.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setFormatDetailModal(fmt)}
                      className="text-xs font-bold text-[#082245] hover:underline px-3 py-2"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => {
                        const targetProduct = products.find(p => p.id === fmt.productId) || {
                          id: fmt.productId,
                          title: fmt.title,
                          price: fmt.price,
                          image: fmt.image
                        };
                        addToCart(targetProduct);
                      }}
                      className="bg-[#082245] hover:bg-[#05162E] text-white text-xs font-bold px-4 py-2 rounded-full transition shadow"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Artisan Product Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 border-b border-[#EDE7DD]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#C85A32]">Cold Chain Fresh</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#082245] font-serif mt-1">Our Artisan Collection</h2>
            <p className="text-neutral-600 font-medium text-sm sm:text-base mt-2">Prepared in small batches daily with zero artificial colors or synthetic preservatives.</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Flavors' },
              { id: 'cones', label: 'Cones' },
              { id: 'bars', label: 'Bars' },
              { id: 'glutenfree', label: 'Gluten-Free' },
              { id: 'chocolate', label: 'Dark Cocoa' },
              { id: 'matka', label: 'Clay Matkas' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#082245] text-white shadow-md'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:border-[#082245]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#EDE7DD] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#FAF7F2] p-2 flex items-center justify-center">
                  <span className={`absolute top-2.5 left-2.5 ${item.badgeColor || 'bg-[#C85A32]'} text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full z-10 shadow-sm`}>
                    {item.badge}
                  </span>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-bold">
                    <span>{item.size}</span>
                    <span className="text-[#E5A93C] flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#E5A93C]" /> {item.rating} ({item.reviews})
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#082245] mt-1 font-serif leading-snug">{item.title}</h3>
                  <p className="text-xs text-neutral-500 font-medium mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-lg font-black text-[#082245]">₹{item.price}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-[#082245] hover:bg-[#C85A32] text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm"
                >
                  + Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hyperlocal 30-Minute Pincode Checker */}
      <section id="delivery" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 border-b border-[#EDE7DD]">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#0A88D8]">Hyperlocal Rapid Dispatch</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#082245] font-serif mt-1">Check Instant 30-Min Delivery</h2>
            <p className="text-neutral-600 font-medium text-xs sm:text-sm mt-2">Enter your 6-digit postal code to check available dry-ice cold delivery slots.</p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input 
                type="text" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6} 
                placeholder="e.g. 324005, 110001" 
                className="w-full px-5 py-3.5 rounded-full border border-neutral-300 focus:outline-none focus:border-[#082245] font-bold text-center sm:text-left text-sm"
              />
              <button 
                onClick={handleCheckPincode}
                className="w-full sm:w-auto whitespace-nowrap bg-[#C85A32] hover:bg-[#8F3414] text-white font-bold text-sm px-7 py-3.5 rounded-full transition shadow-md"
              >
                Check Now
              </button>
            </div>

            {pincodeStatus && (
              <div className={`mt-4 p-3 rounded-2xl text-xs font-bold ${pincodeStatus.valid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {pincodeStatus.message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bulk Party & Wedding Estimator */}
      <section id="bulk" className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-12 border border-[#EAE3D6] shadow-xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#E5A93C]">Weddings • Birthdays • Banquets</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#082245] font-serif mt-1">Bulk Event Estimator</h2>
            <p className="text-neutral-600 font-medium text-sm mt-2">Special cold-box crates, customized gold leaf stamping, and personalized earthen pots.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span>Expected Guests / Portions:</span>
                  <span className="text-base font-extrabold text-[#C85A32]">{bulkGuests} Guests</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="600" 
                  step="10" 
                  value={bulkGuests} 
                  onChange={(e) => setBulkGuests(parseInt(e.target.value))}
                  className="w-full accent-[#C85A32] cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold mt-1">
                  <span>30 Guests</span>
                  <span>300 Guests</span>
                  <span>600+ Guests</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-2">Primary Presentation Format:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'matka', label: 'Matka Clay Pots' },
                    { id: 'cones', label: 'Waffle Cone Bar' },
                    { id: 'bars', label: 'Fruit Bar Pops' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setBulkFormat(fmt.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                        bulkFormat === fmt.id
                          ? 'border-2 border-[#C85A32] bg-amber-50 text-[#8F3414]'
                          : 'border border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="customStamping" 
                  checked={bulkCustomStamping}
                  onChange={(e) => setBulkCustomStamping(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C85A32] accent-[#C85A32]"
                />
                <label htmlFor="customStamping" className="text-xs font-semibold text-neutral-700">
                  Add custom laser initials on terracotta pots / sticks (+₹10/pot)
                </label>
              </div>
            </div>

            <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-neutral-200 shadow-md">
              <div className="text-xs uppercase font-extrabold text-neutral-400">Estimated Bulk Quote</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#082245]">₹{bulkEstimate.total.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-neutral-500">(₹{bulkEstimate.perUnit} / portion)</span>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2 text-xs font-medium text-neutral-600">
                <div className="flex justify-between">
                  <span>Volume Discount:</span>
                  <span className="font-bold text-emerald-600">{bulkEstimate.discountPercent}% Applied</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span className="font-bold text-neutral-800">Insulated Dry-Ice Crates</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold Hold Time:</span>
                  <span className="font-bold text-neutral-800">Guaranteed 6 Hours</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  const msg = `Hello Matka Kulfi! I would like to book a catering order for ${bulkGuests} guests. Format: ${bulkFormat}. Laser initials: ${bulkCustomStamping ? 'Yes' : 'No'}.`;
                  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="mt-6 w-full bg-[#082245] hover:bg-[#05162E] text-white font-bold text-xs py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
              >
                <span>Send WhatsApp Inquiry</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#082245] text-white pt-14 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <span className="text-xl font-serif font-black text-white">Matka Kulfi™</span>
            <p className="text-neutral-400 text-xs font-normal leading-relaxed">
              Small-batch artisanal kulfis, crispy waffle cones, fruit popsicles, and certified gluten-free churned creations delivered cold across India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E5A93C] mb-3">Artisan Lineup</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-medium">
              <li><button onClick={() => setSelectedCategory('cones')} className="hover:underline">Rainbow Waffle Cones</button></li>
              <li><button onClick={() => setSelectedCategory('bars')} className="hover:underline">Outshine Fruit Bars</button></li>
              <li><button onClick={() => setSelectedCategory('glutenfree')} className="hover:underline">Gluten-Free Pure Pots</button></li>
              <li><button onClick={() => setSelectedCategory('chocolate')} className="hover:underline">Belgian Cocoa Churns</button></li>
              <li><button onClick={() => setSelectedCategory('matka')} className="hover:underline">Shahi Saffron Kulfi</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E5A93C] mb-3">Catering & Service</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-medium">
              <li><a href="#bulk" className="hover:underline">Destination Weddings</a></li>
              <li><a href="#bulk" className="hover:underline">Corporate Banquets</a></li>
              <li><a href="#delivery" className="hover:underline">30-Min Rapid Pincodes</a></li>
              <li><button onClick={() => setAddressManagerOpen(true)} className="hover:underline">Manage Saved Addresses</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#E5A93C] mb-3">Cold Guarantee</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Every parcel departs in triple-sealed bio dry ice parcels guaranteeing rock-solid temperature upon arrival.
            </p>
            <span className="inline-block text-[11px] font-bold text-[#0A88D8] bg-white/10 px-3 py-1.5 rounded-full">
              concierge@matkakulfi.com
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400">
          <span>© 2026 Matka Kulfi Artisans Private Limited. All rights reserved.</span>
          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <span>FSSAI Certified</span>
            <span>•</span>
            <span>Eco Terracotta</span>
            <span>•</span>
            <span>-18°C Cold Chain</span>
          </div>
        </div>
      </footer>

      {/* Slide-out Cart Drawer */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 backdrop-blur-xs ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-[#FBF9F5]">
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-black text-xl text-[#082245]">Your Cold Bag</h3>
            <span className="text-xs font-bold bg-[#C85A32] text-white px-2 py-0.5 rounded-full">
              {totalItemsCount}
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-[#082245] p-1.5 text-lg font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-neutral-400">
              <span className="text-4xl">🏺</span>
              <p className="font-bold text-sm text-[#082245] mt-3">Your cold bag is empty</p>
              <p className="text-xs mt-1">Explore our waffle cones, bars, and clay matkas!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-[#F5EFEB] border border-neutral-200">
                <img src={item.image} alt={item.title} className="w-14 h-14 object-contain rounded-xl bg-white p-1" />
                <div className="flex-1">
                  <h4 className="text-xs font-black text-[#082245] line-clamp-1">{item.title}</h4>
                  <span className="text-[11px] font-bold text-[#C85A32]">₹{item.price}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-full px-2 py-1">
                  <button onClick={() => updateCartQty(item.id, -1)} className="w-5 h-5 flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-[#082245]">-</button>
                  <span className="text-xs font-black text-[#082245] w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateCartQty(item.id, 1)} className="w-5 h-5 flex items-center justify-center text-xs font-bold text-neutral-500 hover:text-[#082245]">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
          <div className="space-y-1.5 text-xs text-neutral-600 font-medium">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-bold text-[#082245]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Insulated Dry Ice Box:</span>
              <span className="font-bold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#082245] pt-2 border-t border-neutral-200">
              <span>Grand Total:</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={() => {
              setIsCartOpen(false);
              setCheckoutModalOpen(true);
            }}
            className="w-full bg-[#082245] hover:bg-[#05162E] text-white font-bold text-sm py-3.5 rounded-full transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Express Checkout
          </button>
        </div>
      </div>

      {/* Checkout Modal with Saved Address Selection */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Rock-Solid -18°C Dispatch</span>
              <h3 className="text-2xl font-black font-serif text-[#082245] mt-1">Select Delivery Address</h3>
              <p className="text-xs text-neutral-500">Pick from your saved addresses or add a new one.</p>
            </div>

            {/* Saved Addresses Picker */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#082245]">Your Saved Locations</span>
                <button 
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className="text-xs font-bold text-[#C85A32] hover:underline"
                >
                  {showNewAddressForm ? 'Cancel' : '+ Add New'}
                </button>
              </div>

              <div className="space-y-2">
                {savedAddresses.length === 0 ? (
                  <div className="p-4 rounded-2xl border border-dashed border-neutral-300 text-center bg-[#F5EFEB]">
                    <p className="text-xs font-bold text-neutral-600">No saved addresses yet</p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Click "+ Add New" to save your destination once.</p>
                  </div>
                ) : (
                  savedAddresses.map((addr) => {
                    const isSelected = addr._id === selectedAddressId;
                    return (
                      <div 
                        key={addr._id}
                        onClick={() => setSelectedAddressId(addr._id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected ? 'border-[#C85A32] bg-amber-50/70 shadow-xs' : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <input 
                            type="radio" 
                            name="deliveryAddress" 
                            checked={isSelected} 
                            onChange={() => setSelectedAddressId(addr._id)}
                            className="mt-1 accent-[#C85A32]" 
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-[#082245]">{addr.tag}</span>
                              <span className="text-[10px] bg-neutral-200 px-2 py-0.2 rounded-full font-bold text-neutral-700">{addr.pincode}</span>
                            </div>
                            <p className="text-xs text-neutral-700 font-medium mt-0.5">{addr.addressLine}</p>
                            <p className="text-[11px] text-neutral-500">{addr.name} • {addr.phone}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(addr._id);
                          }}
                          className="text-neutral-400 hover:text-red-500 p-1 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Inline Add Address Form */}
            {showNewAddressForm && (
              <form onSubmit={handleSaveAddress} className="p-4 bg-[#FBF9F5] rounded-2xl border border-neutral-200 mb-5 space-y-2.5 text-xs font-semibold">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 mb-1">Tag (e.g. Home, Office)</label>
                    <input 
                      type="text" 
                      value={newAddr.tag}
                      onChange={(e) => setNewAddr({ ...newAddr, tag: e.target.value })}
                      placeholder="Home" 
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1">Recipient Name</label>
                    <input 
                      type="text" 
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      placeholder="Full Name" 
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      placeholder="10-digit phone" 
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 mb-1">6-Digit Pincode</label>
                    <input 
                      type="text" 
                      maxLength={6}
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      placeholder="324005" 
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Complete Address / Landmark</label>
                  <input 
                    type="text" 
                    value={newAddr.addressLine}
                    onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                    placeholder="House/flat, street, landmark" 
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#C85A32] text-white py-2 rounded-xl font-bold hover:bg-[#8F3414] transition text-xs"
                >
                  Save Address
                </button>
              </form>
            )}

            {/* Summary & Confirm */}
            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs font-medium space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Selected Address:</span>
                <span className="font-bold text-[#082245] text-right truncate max-w-[220px]">
                  {savedAddresses.find((a) => a._id === selectedAddressId)?.addressLine || 'None selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Total Payable:</span>
                <span className="font-black text-[#8F3414] text-sm">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-700 font-semibold">
                <span>Payment Mode:</span>
                <span>Cash on Delivery / UPI Scan at Arrival</span>
              </div>
            </div>

            <button 
              disabled={!selectedAddressId}
              onClick={handlePlaceOrder}
              className="w-full bg-[#C85A32] hover:bg-[#8F3414] text-white font-bold text-sm py-3.5 rounded-full transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm & Dispatch (-18°C Sealed)
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal (Log in / Sign up) */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-5">
              <span className="text-xs font-black uppercase tracking-widest text-[#C85A32]">Matka Kulfi Club</span>
              <h3 className="text-2xl font-black font-serif text-[#082245] mt-1">
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Save your favorite delivery addresses for effortless ordering.</p>
            </div>

            <div className="flex bg-neutral-100 p-1 rounded-full text-xs font-bold mb-4">
              <button 
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-full transition ${authMode === 'login' ? 'bg-white shadow-sm text-[#082245]' : 'text-neutral-500'}`}
              >
                Log In
              </button>
              <button 
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-2 rounded-full transition ${authMode === 'signup' ? 'bg-white shadow-sm text-[#082245]' : 'text-neutral-500'}`}
              >
                Sign Up
              </button>
            </div>

            {authError && <div className="mb-3 text-center text-xs text-red-600 font-bold">{authError}</div>}

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs font-semibold">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-neutral-600 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    required
                    placeholder="Aarav Sharma" 
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 font-medium"
                  />
                </div>
              )}
              <div>
                <label className="block text-neutral-600 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  required 
                  placeholder="name@domain.com" 
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>
              <div>
                <label className="block text-neutral-600 mb-1">Password</label>
                <input 
                  type="password" 
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required 
                  placeholder="••••••••" 
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 font-medium"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#082245] hover:bg-[#05162E] text-white font-bold text-sm py-3.5 rounded-full transition shadow-md mt-2"
              >
                {authMode === 'login' ? 'Sign In' : 'Register Account'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Flavor Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative">
            <button onClick={() => setQuizModalOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#0A88D8]">Personal Sommelier</span>
              <h3 className="text-2xl font-black font-serif text-[#082245] mt-1">Flavor Finder Quiz</h3>
              <p className="text-xs text-neutral-500 font-medium">Answer two simple cravings to unlock your matched frozen scoop.</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-2">1. What's your dessert mood?</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'rich', label: '👑 Rich & Nutty' },
                    { id: 'choc', label: '🍫 Deep Chocolate' },
                    { id: 'fruit', label: '🍓 Crisp & Fruity' },
                    { id: 'clean', label: '🌱 Light / Gluten-Free' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setQuizAnswers({ ...quizAnswers, mood: m.id })}
                      className={`py-3 px-3 rounded-2xl border text-left transition ${
                        quizAnswers.mood === m.id ? 'bg-[#082245] text-white border-[#082245]' : 'border-neutral-300 hover:border-[#082245]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-2">2. Preferred format?</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {[
                    { id: 'matka', label: '🏺 Handcrafted Pot' },
                    { id: 'cone', label: '🍦 Waffle Cone' },
                    { id: 'bar', label: '🧊 Frozen Bar Pop' },
                    { id: 'tub', label: '🍨 Churned Tub' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setQuizAnswers({ ...quizAnswers, format: f.id })}
                      className={`py-3 px-3 rounded-2xl border text-left transition ${
                        quizAnswers.format === f.id ? 'bg-[#082245] text-white border-[#082245]' : 'border-neutral-300 hover:border-[#082245]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleQuizSubmit}
                className="w-full bg-[#C85A32] hover:bg-[#8F3414] text-white font-bold text-sm py-3.5 rounded-full transition shadow"
              >
                Reveal My Flavor Match
              </button>

              {quizResult && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-black uppercase text-[#C85A32]">Your Match:</span>
                  <h4 className="text-sm font-black text-[#082245] mt-0.5">{quizResult.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1">{quizResult.description}</p>
                  <button 
                    onClick={() => {
                      addToCart(quizResult);
                      setQuizModalOpen(false);
                    }}
                    className="mt-3 bg-[#C85A32] hover:bg-[#8F3414] text-white font-bold text-xs px-4 py-2 rounded-full transition"
                  >
                    Add Matched Flavor to Bag (₹{quizResult.price})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Variety Details Modal */}
      {formatDetailModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative">
            <button onClick={() => setFormatDetailModal(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800">
              <X className="w-5 h-5" />
            </button>
            <div className={`rounded-2xl ${formatDetailModal.bg} p-4 flex items-center justify-center aspect-video mb-4`}>
              <img src={formatDetailModal.image} alt={formatDetailModal.title} className="max-h-40 object-contain" />
            </div>
            <span className="text-[10px] font-black uppercase text-[#C85A32] tracking-wider">{formatDetailModal.catName}</span>
            <h3 className="text-xl font-black font-serif text-[#082245] mt-1">{formatDetailModal.title}</h3>
            <p className="text-xs text-neutral-600 font-medium mt-2 leading-relaxed">{formatDetailModal.desc}</p>
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <span className="text-xs font-black text-[#082245] block mb-1.5">Artisanal Highlights:</span>
              <ul className="text-xs space-y-1 text-neutral-600">
                {formatDetailModal.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-[#0A88D8] font-bold">•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xl font-black text-[#082245]">₹{formatDetailModal.price}</span>
              <button 
                onClick={() => {
                  addToCart({
                    id: formatDetailModal.productId,
                    title: formatDetailModal.title,
                    price: formatDetailModal.price,
                    image: formatDetailModal.image
                  });
                  setFormatDetailModal(null);
                }}
                className="bg-[#C85A32] hover:bg-[#8F3414] text-white font-bold text-xs px-6 py-2.5 rounded-full transition shadow"
              >
                Add to Bag Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Manager Modal */}
      {addressManagerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative">
            <button onClick={() => setAddressManagerOpen(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#C85A32]">Address Book</span>
              <h3 className="text-xl font-black font-serif text-[#082245]">Manage Saved Addresses</h3>
            </div>
            <div className="space-y-2.5 max-h-72 overflow-y-auto mb-4">
              {savedAddresses.length === 0 ? (
                <p className="text-center text-xs text-neutral-400 py-6">Your address book is empty.</p>
              ) : (
                savedAddresses.map((addr) => (
                  <div key={addr._id} className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#082245] uppercase text-[10px] bg-amber-100 px-2 py-0.5 rounded-full">{addr.tag}</span>
                      <p className="font-bold text-[#082245] mt-1">{addr.addressLine}</p>
                      <p className="text-neutral-500 text-[11px]">{addr.name} | {addr.phone} | {addr.pincode}</p>
                    </div>
                    <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-500 hover:underline font-bold text-[11px]">
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
            <button 
              onClick={() => {
                setAddressManagerOpen(false);
                setCheckoutModalOpen(true);
                setShowNewAddressForm(true);
              }}
              className="w-full bg-[#082245] text-white py-3 rounded-full text-xs font-bold hover:bg-[#05162E] transition"
            >
              + Add New Delivery Location
            </button>
          </div>
        </div>
      )}

      {/* Global Alert / Toast Modal */}
      {alertModal.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-neutral-200">
            <div className="text-4xl mb-2">🍨</div>
            <h3 className="text-lg font-black font-serif text-[#082245]">{alertModal.title}</h3>
            <p className="text-xs text-neutral-600 mt-2 font-medium leading-relaxed">{alertModal.message}</p>
            <button 
              onClick={() => setAlertModal({ ...alertModal, open: false })}
              className="mt-5 w-full bg-[#082245] text-white py-2.5 rounded-full font-bold text-xs hover:bg-[#05162E] transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}