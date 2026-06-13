import { useLocation, Link } from "wouter";
import { useState, useEffect } from "react";
import { Leaf, ShoppingCart, Sparkles, Award, ArrowRight, ShieldCheck, Heart, Percent } from "lucide-react";
import { marketplaceProducts, personalizedRecommendations } from "@/data/mockData";
import { toast } from "sonner";

export default function UserHome() {
  const [, setLocation] = useLocation();
  const [cartCount, setCartCount] = useState(0);

  // Sync cart count instantly from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const existingCart = JSON.parse(localStorage.getItem("recommerce_cart") || "[]");
      setCartCount(existingCart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0));
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleQuickAdd = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const existingCart = JSON.parse(localStorage.getItem("recommerce_cart") || "[]");
      const newCartItem = {
        id: `home-${product.id}-${Date.now()}`,
        title: product.name,
        condition: product.condition || "Verified Eco Option",
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80",
        co2Saved: "8.4 kg",
        greenCreditsEarned: Math.round(product.price * 0.005),
        quantity: 1
      };
      localStorage.setItem("recommerce_cart", JSON.stringify([...existingCart, newCartItem]));
      window.dispatchEvent(new Event("storage"));
      toast.success(`Added ${product.name.substring(0, 20)}... to Cart!`);
    } catch (err) {
      toast.error("Failed to add item to cart.");
    }
  };

  // Filter products for the explicit Sustainable Showcase section
  const sustainableHighlights = marketplaceProducts.filter(p => p.score >= 8.5 || p.condition === "Like New");

  return (
    <div className="bg-[#eaeded] min-h-screen pb-16 text-gray-900 font-sans">
      
      {/* 1. HERO BANNER DECK */}
      <div className="relative w-full overflow-hidden max-w-[1500px] mx-auto h-[220px] sm:h-[320px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#eaeded] via-transparent to-black/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1400&q=80" 
          alt="Eco Background Banner" 
          className="w-full h-full object-cover select-none"
        />
        <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 max-w-xl space-y-2 md:space-y-4">
          <span className="bg-emerald-600 text-white font-bold text-[10px] md:text-xs uppercase tracking-wider px-2.5 py-1 rounded">
            ReCommerce Circular Marketplace Active
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow">
            Shop Smart. Save Carbon. <br />Earn Green Credits.
          </h1>
          <p className="text-xs sm:text-sm text-gray-100 max-w-md hidden sm:block drop-shadow-sm">
            Discover verified open-box, certified refurbished, and peer-to-peer listings inspected entirely by automated AI diagnostic scores.
          </p>
        </div>
      </div>

      {/* 2. CORE AMAZON-STYLE METRIC GRID CARDS */}
      <div className="max-w-[1500px] mx-auto px-4 -mt-16 sm:-mt-24 md:-mt-36 relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Quick Nav Profile Summary */}
        <div className="bg-white p-5 rounded-sm shadow border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg md:text-xl text-gray-900">Welcome, Explorer</h3>
            <p className="text-xs text-gray-500 mt-1">Your active sustainable carbon profile dashboard</p>
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded p-3 flex items-center gap-2.5">
              <Leaf className="h-6 w-6 text-emerald-600 fill-emerald-600 shrink-0" />
              <div>
                <div className="text-sm font-bold text-emerald-900">340 Green Credits</div>
                <div className="text-[10px] text-emerald-700">Eco Champion Tier Level</div>
              </div>
            </div>
          </div>
          <Link href="/green-credits" className="text-xs text-blue-600 hover:underline mt-4 inline-flex items-center gap-0.5 font-medium cursor-pointer">
            View your points statement <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Card 2: Quick Links Directory */}
        <div className="bg-white p-5 rounded-sm shadow border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg md:text-xl text-gray-900">Track & Returns</h3>
            <p className="text-xs text-gray-500 mt-1">Manage current logistics pipelines</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link href="/my-orders" className="bg-gray-50 hover:bg-gray-100 p-2 text-center rounded border border-gray-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-gray-800">Your Orders</div>
              </Link>
              <Link href="/my-returns" className="bg-gray-50 hover:bg-gray-100 p-2 text-center rounded border border-gray-200 cursor-pointer transition-colors">
                <div className="text-xs font-bold text-amber-700">My Returns</div>
              </Link>
            </div>
          </div>
          <Link href="/my-orders" className="text-xs text-blue-600 hover:underline mt-4 inline-flex items-center gap-0.5 font-medium cursor-pointer">
            Check shipping statuses <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Card 3: Shopping Cart Quick Peek */}
        <div className="bg-white p-5 rounded-sm shadow border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg md:text-xl text-gray-900">Your Eco-Cart</h3>
            <p className="text-xs text-gray-500 mt-1">Items waiting for green routing consolidation</p>
            <div className="mt-4 flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-bold text-amber-900">{cartCount} Items Pending</span>
              </div>
            </div>
          </div>
          <Link href="/cart" className="text-xs text-blue-600 hover:underline mt-4 inline-flex items-center gap-0.5 font-medium cursor-pointer">
            Proceed to Checkout <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Card 4: Promotional Spot */}
        <div className="bg-white p-5 rounded-sm shadow border border-gray-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg md:text-xl text-gray-900">P2P Resale Hub</h3>
            <p className="text-xs text-gray-500 mt-1">Buy directly from alternative user circular returns</p>
            <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded text-center text-xs text-blue-800">
              ⚡ Verified direct matching routes bypass transit hub overhead emissions!
            </div>
          </div>
          <Link href="/p2p" className="text-xs text-blue-600 hover:underline mt-4 inline-flex items-center gap-0.5 font-medium cursor-pointer">
            Explore peer-to-peer deals <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

      </div>

      {/* 3. AI RECOMMENDED HORIZONTAL CONTAINER STRIP */}
      <div className="max-w-[1500px] mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-[#131921] to-[#232f3e] text-white p-5 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-amber-400 fill-amber-400" />
            <h2 className="text-lg font-bold tracking-tight">AI Personalized Recommendations For You</h2>
            <span className="bg-green-600 text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
              Profile Matched
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {personalizedRecommendations.map((rec) => {
              const disc = Math.round(((rec.originalPrice - rec.price) / rec.originalPrice) * 100);
              return (
                <div 
                  key={rec.id} 
                  className="bg-white text-gray-900 shrink-0 w-48 rounded-md p-3 hover:ring-2 hover:ring-amber-500 transition-all group relative flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-gray-100 rounded flex items-center justify-center relative mb-2">
                      <span className="text-[10px] bg-gray-900 text-white font-bold px-1.5 py-0.5 rounded absolute top-1.5 right-1.5">
                        AI: {rec.score}/10
                      </span>
                      <ShoppingCart className="h-6 w-6 text-gray-300" />
                    </div>
                    <h4 className="text-xs font-semibold line-clamp-2 text-gray-800 mb-1 leading-snug">{rec.name}</h4>
                    <p className="text-[10px] text-blue-600 font-medium mb-2">{rec.reason}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-900">Core: ₹{rec.price.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                      <Percent className="h-3 w-3" /> Save {disc}%
                    </div>
                    <button 
                      onClick={(e) => handleQuickAdd(rec, e)}
                      className="w-full bg-amber-400 hover:bg-amber-500 text-gray-950 text-xs font-medium py-1 mt-3 rounded-full border border-amber-500/20 shadow-sm cursor-pointer transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. EXPLICIT SUSTAINABLE PRODUCT SHOWCASE SECTION */}
      <div className="max-w-[1500px] mx-auto px-4 mt-6">
        <div className="bg-white border border-gray-200 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-full text-white">
                <Leaf className="h-4 w-4 fill-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-gray-900">Sustainable Products Showcase</h2>
                <p className="text-xs text-gray-500">Highest diagnostic safety rankings saving real metric tons of operational manufacturing footprint</p>
              </div>
            </div>
            <Link href="/marketplace" className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
              Browse All Eco Deals
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sustainableHighlights.slice(0, 4).map((product) => {
              const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              return (
                <div 
                  key={product.id}
                  onClick={() => setLocation("/marketplace")}
                  className="border border-gray-100 bg-gray-50/50 hover:bg-white rounded p-3 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-square bg-white rounded flex items-center justify-center relative border border-gray-100 mb-3 overflow-hidden">
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5 shadow-sm">
                          <ShieldCheck className="h-3 w-3" /> {product.condition}
                        </span>
                      </div>
                      <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-bl absolute top-0 right-0 z-10 shadow-sm">
                        Score: {product.score}/10
                      </span>
                      <Leaf className="h-10 w-10 text-emerald-100 opacity-60 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-2 border-t border-gray-100/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 mt-0.5">Save {disc}% instantly</div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-1.5 mt-3 rounded-md transition-colors shadow-sm cursor-pointer"
                    >
                      Add to Eco-Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}