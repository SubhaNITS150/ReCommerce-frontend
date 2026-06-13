import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Package, Clock, ShieldCheck, ArrowUpRight, HelpCircle, Leaf } from "lucide-react";
import { toast } from "sonner";

// Mock data reflecting standard orders vs highly sustainable items
const INITIAL_ORDERS = [
  {
    id: "ORD-2026-8812A",
    date: "June 02, 2026",
    totalPrice: 14995,
    status: "Delivered",
    isSustainable: false, // Standard new item retail buy box
    items: [
      {
        name: "Nike Men's Air Max 2024 Running Shoe",
        specs: "Size: UK 9 | Color: Black/Orange",
        price: 14995,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80",
        returnEligibleUntil: "July 02, 2026",
        canReturn: true,
        greenCreditsOnAction: 15
      }
    ]
  },
  {
    id: "ORD-2026-9041C",
    date: "May 29, 2026",
    totalPrice: 5499,
    status: "Order Confirmed",
    isSustainable: true, // Sustainable circular economy match!
    items: [
      {
        name: "Nike Air Max 97 Running Shoes",
        specs: "P2P Resale Match - Lightly Used | Size: UK 10",
        price: 5499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80",
        returnEligibleUntil: "June 29, 2026",
        canReturn: true,
        greenCreditsOnAction: 45 // Big reward for circular purchase
      }
    ]
  },
  {
    id: "ORD-2026-4410B",
    date: "May 18, 2026",
    totalPrice: 20498,
    status: "Delivered",
    isSustainable: true, // Refurbished item saves carbon
    items: [
      {
        name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
        specs: "Certified Refurbished | Condition: Excellent",
        price: 14999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80",
        returnEligibleUntil: "June 18, 2026",
        canReturn: true,
        greenCreditsOnAction: 35
      },
      {
        name: "Levi's 501 Original Fit Men's Jeans",
        specs: "Size: 32W x 32L | Color: Indigo",
        price: 5499,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&q=80",
        returnEligibleUntil: "Expired (Return window closed)",
        canReturn: false,
        greenCreditsOnAction: 0
      }
    ]
  }
];

export default function MyOrders() {
  const [, setLocation] = useLocation();
  const [orders] = useState(INITIAL_ORDERS);

  // Handles logic for adding Green Credits upon successful processing transactions
  const claimActionCredits = (credits: number, orderId: string) => {
    if (credits === 0) {
      toast.info("Standard item tracking data updated.");
      return;
    }

    // 1. Alert the user they unlocked green credits via their circular purchase loop
    toast.success(`Eco-Action Verified! +${credits} Green Credits added to your account for Order #${orderId}`);
    
    // 2. Fire a mock storage trigger event to signal your header components to dynamically update credit meters
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors mb-6 cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </button>

        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-gray-700" />
            Your Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track sustainable shipments, manage returns, and earn circular point tokens.
          </p>
        </div>

        {/* Orders Card Stack */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className={`border rounded-md shadow-sm overflow-hidden transition-all duration-200 ${
                order.isSustainable 
                  ? "bg-emerald-50/70 border-emerald-200 shadow-[0_2px_8px_rgba(16,185,129,0.08)]" 
                  : "bg-white border-gray-200"
              }`}
            >
              
              {/* Order Meta Header Block */}
              <div className={`px-4 py-3 border-b flex flex-wrap gap-x-8 gap-y-2 text-xs justify-between items-center ${
                order.isSustainable ? "bg-emerald-100/50 border-emerald-200 text-emerald-900" : "bg-gray-100 border-gray-200 text-gray-600"
              }`}>
                <div className="flex gap-x-8 gap-y-2">
                  <div>
                    <div className="uppercase font-medium text-gray-500 tracking-wider">Order Placed</div>
                    <div className="font-medium text-gray-800 mt-0.5">{order.date}</div>
                  </div>
                  <div>
                    <div className="uppercase font-medium text-gray-500 tracking-wider">Total Amount</div>
                    <div className="font-bold text-gray-800 mt-0.5">₹{order.totalPrice.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <div className="uppercase font-medium text-gray-500 tracking-wider">Ship To</div>
                    <div className="text-blue-600 hover:underline cursor-pointer mt-0.5">John Doe</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {order.isSustainable && (
                    <span className="flex items-center gap-1 bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">
                      <Leaf className="h-3 w-3 fill-white" /> Sustainable Choice
                    </span>
                  )}
                  <div className="text-right">
                    <div className="text-gray-500">Order ID # <span className="font-mono text-gray-800 font-bold">{order.id}</span></div>
                  </div>
                </div>
              </div>

              {/* Order Items Content Section */}
              <div className="divide-y divide-gray-100 p-4 sm:p-6 space-y-6 sm:space-y-0">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start pt-6 first:pt-0">
                    
                    {/* Item Thumbnail */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover border border-gray-200 rounded shrink-0 bg-gray-50"
                    />

                    {/* Middle Core Details Section */}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-sm text-gray-900 hover:text-blue-600 cursor-pointer transition-colors leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">{item.specs}</p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
                        <Clock className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Status: <strong>{order.status}</strong></span>
                      </div>
                      
                      <p className="text-[11px] text-gray-400 pt-1">
                        Return Window: <span className={item.canReturn ? "text-amber-700 font-medium" : "text-gray-400"}>{item.returnEligibleUntil}</span>
                      </p>
                    </div>

                    {/* Right Contextual Action Columns */}
                    <div className="w-full sm:w-auto flex flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                      <button 
                        type="button"
                        onClick={() => claimActionCredits(item.greenCreditsOnAction, order.id)}
                        className="w-full sm:w-48 bg-amber-500 hover:bg-amber-600 text-gray-950 font-medium py-1.5 px-3 rounded text-xs transition-colors border border-amber-600/20 shadow-sm cursor-pointer text-center"
                      >
                        Track Package
                      </button>
                      
                      {item.canReturn ? (
                        <button 
                          type="button"
                          onClick={() => setLocation("/initiate-return")}
                          className="w-full sm:w-48 bg-white hover:bg-gray-50 text-gray-800 font-medium py-1.5 px-3 border border-gray-300 rounded text-xs transition-colors shadow-sm cursor-pointer text-center"
                        >
                          Initiate Return
                        </button>
                      ) : (
                        <button 
                          type="button"
                          disabled
                          className="w-full sm:w-48 bg-gray-100 text-gray-400 font-normal py-1.5 px-3 border border-gray-200 rounded text-xs cursor-not-allowed text-center flex items-center justify-center gap-1"
                        >
                          Return Window Closed 
                          <span className="group relative cursor-help text-gray-400">
                            <HelpCircle className="h-3.5 w-3.5" />
                            <span className="absolute bottom-6 right-0 hidden group-hover:block bg-gray-900 text-white text-[10px] font-normal p-2 rounded shadow w-40 leading-normal normal-case z-10">
                              Exceeded 30-day standard merchant refund policy boundary conditions.
                            </span>
                          </span>
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}