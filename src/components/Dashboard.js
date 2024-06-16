import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ChartSection from "./ChartSection";
import Header from "./Header";
import MarketSummary from "./MarketSummary";
import MarketsOverview from "./MarketsOverview";
import SectorPerformance from "./SectorPerformance";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return currentUser ? (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header userName={currentUser.email} logout={logout} />
        <main className="content-wrapper">
          <div className="summary-and-performance">
            <MarketSummary
              headline="Market is showing positive signs"
              sentiment="bullish"
            />
            <SectorPerformance />
          </div>
          <div className="other-components">
            <MarketsOverview />
            <ChartSection />
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;