import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AmazonHeader } from "@/components/AmazonHeader";
import { ToastScheduler } from "@/components/ToastScheduler";
import SellerDashboard from "@/pages/SellerDashboard";
import LogisticsTriage from "@/pages/LogisticsTriage";
import Marketplace from "@/pages/Marketplace";
import BuyNew from "@/pages/BuyNew";
import P2PResale from "@/pages/P2PResale";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={SellerDashboard} />
      <Route path="/logistics" component={LogisticsTriage} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/buy-new" component={BuyNew} />
      <Route path="/p2p" component={P2PResale} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="min-h-[100dvh] flex flex-col font-sans bg-background text-foreground">
            <AmazonHeader />
            <main className="flex-1">
              <Router />
            </main>
          </div>
        </WouterRouter>
        <SonnerToaster position="bottom-right" />
        <ToastScheduler />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
