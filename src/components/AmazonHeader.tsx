import { Link, useLocation } from "wouter";
import { Zap, Search, ShoppingCart, Menu, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";
import { greenCreditsData } from "@/data/mockData";

export function AmazonHeader() {
  const [location] = useLocation();

  return (
    <header className="bg-secondary text-secondary-foreground">
      {/* Top row */}
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-1 shrink-0 hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer" data-testid="link-logo">
          <Zap className="h-6 w-6 text-primary fill-primary" />
          <span className="text-xl font-bold tracking-tight">ReCommerce</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-4xl mx-4 hidden md:flex">
          <div className="flex w-full bg-white rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary">
            <select className="bg-muted text-muted-foreground border-r border-border px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-200">
              <option>All</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
            <Input
              type="text"
              placeholder="Search ReCommerce"
              className="flex-1 border-0 focus-visible:ring-0 rounded-none text-black px-3 h-auto"
              data-testid="input-search"
            />
            <button className="bg-primary hover:bg-accent px-4 py-2 transition-colors flex items-center justify-center cursor-pointer" data-testid="button-search">
              <Search className="h-5 w-5 text-secondary" />
            </button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Green Credits badge */}
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer group"
            data-testid="link-green-credits"
          >
            <div className="relative">
              <Leaf className="h-6 w-6 text-green-400 group-hover:text-green-300 fill-green-400 group-hover:fill-green-300 transition-colors" />
            </div>
            <div className="text-xs leading-tight">
              <div className="text-green-400 font-bold">{greenCreditsData.totalCredits} GC</div>
              <div className="text-gray-300 text-[10px]">Green Credits</div>
            </div>
          </Link>

          <div className="hidden sm:block hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer text-sm" data-testid="link-account">
            <div className="text-xs text-gray-300">Hello, Seller</div>
            <div className="font-bold leading-tight">Account & Lists</div>
          </div>
          <div className="hidden sm:block hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer text-sm" data-testid="link-returns">
            <div className="text-xs text-gray-300">Returns</div>
            <div className="font-bold leading-tight">& Orders</div>
          </div>
          <div className="flex items-end hover:outline hover:outline-1 hover:outline-white p-2 rounded-sm cursor-pointer" data-testid="link-cart">
            <div className="relative">
              <span className="absolute -top-2 -right-1 text-primary font-bold text-sm bg-secondary px-1 rounded-full">0</span>
              <ShoppingCart className="h-8 w-8" />
            </div>
            <span className="font-bold text-sm hidden sm:block ml-1">Cart</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav Row */}
      <div className="bg-[#232f3e] text-white px-4 py-1 flex items-center gap-4 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
        <button className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm font-bold shrink-0 cursor-pointer" data-testid="button-all-menu">
          <Menu className="h-5 w-5" />
          All
        </button>

        <Link
          href="/"
          className={`hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer ${location === '/' ? 'border-b-2 border-primary font-bold' : ''}`}
          data-testid="nav-sell-return"
        >
          Sell / Return
        </Link>
        <Link
          href="/logistics"
          className={`hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer ${location === '/logistics' ? 'border-b-2 border-primary font-bold' : ''}`}
          data-testid="nav-logistics"
        >
          Logistics
        </Link>
        <Link
          href="/marketplace"
          className={`hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer ${location === '/marketplace' ? 'border-b-2 border-primary font-bold' : ''}`}
          data-testid="nav-marketplace"
        >
          Marketplace
        </Link>
        <Link
          href="/buy-new"
          className={`hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer ${location === '/buy-new' ? 'border-b-2 border-primary font-bold' : ''}`}
          data-testid="nav-buy-new"
        >
          Buy New
        </Link>
        <Link
          href="/p2p"
          className={`hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer ${location === '/p2p' ? 'border-b-2 border-primary font-bold' : ''}`}
          data-testid="nav-p2p"
        >
          P2P Resale
        </Link>
      </div>
    </header>
  );
}
