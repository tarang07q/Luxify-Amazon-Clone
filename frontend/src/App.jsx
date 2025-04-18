import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ui/ErrorBoundary';
import GlobalErrorDisplay from './components/ui/GlobalErrorDisplay';

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
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

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
import AdminProductListPage from './pages/admin/ProductListPage';
import AdminProductEditPage from './pages/admin/ProductEditPage';
import AdminProductCreatePage from './pages/admin/ProductCreatePage';
import AdminOrderListPage from './pages/admin/OrderListPage';
import AdminLayout from './components/admin/AdminLayout';

// Route Protection
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <GlobalErrorDisplay />
          <ToastContainer position="top-right" autoClose={3000} />
          <Header />
          <main className="flex-grow py-3">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<NewLoginPage />} />
            <Route path="/register" element={<NewRegisterPage />} />
            <Route path="/admin-registration" element={<NewAdminRegistrationPage />} />

            {/* Footer Pages - Get to Know Us */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/business-card" element={<BusinessCardPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press-releases" element={<PressReleasesPage />} />
            <Route path="/amazer-science" element={<AmazerSciencePage />} />

            {/* Footer Pages - Make Money with Us */}
            <Route path="/sell" element={<SellPage />} />
            <Route path="/associates" element={<AssociatesPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/affiliate" element={<AffiliatePage />} />

            {/* Footer Pages - Payment Products */}
            <Route path="/business-card" element={<BusinessCardPage />} />
            <Route path="/points" element={<PointsPage />} />
            <Route path="/reload-balance" element={<ReloadBalancePage />} />
            <Route path="/currency-converter" element={<CurrencyConverterPage />} />
            <Route path="/rewards" element={<RewardsPage />} />

            {/* Footer Pages - Let Us Help You */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/shipping" element={<ShippingRatesPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Protected Routes */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/orderhistory" element={<OrderHistoryPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="products" element={<AdminProductListPage />} />
                <Route path="products/new" element={<AdminProductCreatePage />} />
                <Route path="product/:id/edit" element={<AdminProductEditPage />} />
                <Route path="orders" element={<AdminOrderListPage />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
