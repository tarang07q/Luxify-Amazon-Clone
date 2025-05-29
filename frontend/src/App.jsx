import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ui/ErrorBoundary';
import GlobalErrorDisplay from './components/ui/GlobalErrorDisplay';
import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import './utils/clearAuth'; // Import auth clearing utility

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NewLoginPage from './pages/NewLoginPage';
import NewRegisterPage from './pages/NewRegisterPage';
import NewAdminRegistrationPage from './pages/NewAdminRegistrationPage';
import ProfilePage from './pages/ProfilePage';
import EnhancedProfilePage from './pages/EnhancedProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

// Footer Pages - Get to Know Us
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import PressReleasesPage from './pages/PressReleasesPage';
import AmazerSciencePage from './pages/AmazerSciencePage';

// Footer Pages - Make Money with Us
import SellPage from './pages/SellPage';
import AssociatesPage from './pages/AssociatesPage';
import AdvertisePage from './pages/AdvertisePage';
import AffiliatePage from './pages/AffiliatePage';

// Footer Pages - Payment Products
import BusinessCardPage from './pages/BusinessCardPage';
import PointsPage from './pages/PointsPage';
import ReloadBalancePage from './pages/ReloadBalancePage';
import CurrencyConverterPage from './pages/CurrencyConverterPage';
import RewardsPage from './pages/RewardsPage';

// Footer Pages - Let Us Help You
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import ShippingRatesPage from './pages/ShippingRatesPage';
import ReturnsPage from './pages/ReturnsPage';
import HelpPage from './pages/HelpPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import EnhancedDashboardPage from './pages/admin/EnhancedDashboardPage';
import AdminProductListPage from './pages/admin/ProductListPage';
import AdminProductEditPage from './pages/admin/ProductEditPage';
import AdminProductCreatePage from './pages/admin/ProductCreatePage';
import FeaturedProductsPage from './pages/admin/FeaturedProductsPage';
import AdminOrderListPage from './pages/admin/OrderListPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminLayout from './components/admin/AdminLayout';

// Route Protection
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CurrencyProvider>
          <Router>
            <GlobalErrorDisplay />
            <ToastContainer position="top-right" autoClose={3000} />

            <Routes>
              {/* Landing Page - No Header/Footer */}
              <Route path="/" element={<LandingPage />} />

              {/* Auth Pages - No Header/Footer */}
              <Route path="/login" element={<NewLoginPage />} />
              <Route path="/register" element={<NewRegisterPage />} />
              <Route path="/admin-registration" element={<NewAdminRegistrationPage />} />

              {/* Main Application with Header/Footer */}
              <Route path="/*" element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow py-3">
                    <Routes>
                      <Route path="shop" element={<HomePage />} />
                      <Route path="search/:keyword" element={<HomePage />} />
                      <Route path="page/:pageNumber" element={<HomePage />} />
                      <Route path="search/:keyword/page/:pageNumber" element={<HomePage />} />
                      <Route path="product/:id" element={<ProductPage />} />
                      <Route path="cart" element={<CartPage />} />

                      {/* Footer Pages - Get to Know Us */}
                      <Route path="about" element={<AboutPage />} />
                      <Route path="business-card" element={<BusinessCardPage />} />
                      <Route path="careers" element={<CareersPage />} />
                      <Route path="press-releases" element={<PressReleasesPage />} />
                      <Route path="amazer-science" element={<AmazerSciencePage />} />

                      {/* Footer Pages - Make Money with Us */}
                      <Route path="sell" element={<SellPage />} />
                      <Route path="associates" element={<AssociatesPage />} />
                      <Route path="advertise" element={<AdvertisePage />} />
                      <Route path="affiliate" element={<AffiliatePage />} />

                      {/* Footer Pages - Payment Products */}
                      <Route path="points" element={<PointsPage />} />
                      <Route path="reload-balance" element={<ReloadBalancePage />} />
                      <Route path="currency-converter" element={<CurrencyConverterPage />} />
                      <Route path="rewards" element={<RewardsPage />} />

                      {/* Footer Pages - Let Us Help You */}
                      <Route path="account" element={<AccountPage />} />
                      <Route path="orders" element={<OrdersPage />} />
                      <Route path="shipping-rates" element={<ShippingRatesPage />} />
                      <Route path="returns" element={<ReturnsPage />} />
                      <Route path="help" element={<HelpPage />} />

                      {/* Protected Routes */}
                      <Route path="" element={<PrivateRoute />}>
                        <Route path="profile" element={<EnhancedProfilePage />} />
                        <Route path="shipping" element={<ShippingPage />} />
                        <Route path="payment" element={<PaymentPage />} />
                        <Route path="placeorder" element={<PlaceOrderPage />} />
                        <Route path="order/:id" element={<OrderPage />} />
                        <Route path="orderhistory" element={<OrderHistoryPage />} />
                        <Route path="wishlist" element={<WishlistPage />} />
                        <Route path="track/:orderId" element={<OrderTrackingPage />} />
                      </Route>
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />

              {/* Admin Dashboard with its own layout */}
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<EnhancedDashboardPage />} />
                      <Route path="dashboard" element={<EnhancedDashboardPage />} />
                      <Route path="products" element={<AdminProductListPage />} />
                      <Route path="products/new" element={<AdminProductCreatePage />} />
                      <Route path="products/featured" element={<FeaturedProductsPage />} />
                      <Route path="product/:id/edit" element={<AdminProductEditPage />} />
                      <Route path="orders" element={<AdminOrderListPage />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                  </AdminLayout>
                </AdminRoute>
              } />
            </Routes>
          </Router>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
