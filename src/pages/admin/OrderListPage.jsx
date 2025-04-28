import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../slices/services/orderService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import CubeIcon from '../../components/3d/CubeIcon';
import { useTheme } from '../../context/ThemeContext';
import { FaEye, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const OrderListPage = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('');

  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Filter and sort orders
  const getFilteredOrders = () => {
    if (!orders) return [];

    let filteredOrders = [...orders];

    // Apply status filter
    if (filterStatus) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === filterStatus
      );
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order._id.toLowerCase().includes(search) ||
          (order.user && order.user.name && order.user.name.toLowerCase().includes(search)) ||
          (order.user && order.user.email && order.user.email.toLowerCase().includes(search))
      );
    }

    // Apply sorting
    filteredOrders.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'totalPrice':
          aValue = a.totalPrice;
          bValue = b.totalPrice;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'user.name':
          aValue = a.user && a.user.name ? a.user.name : '';
          bValue = b.user && b.user.name ? b.user.name : '';
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filteredOrders;
  };

  // Function to get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: theme.warning };
      case 'Packed':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: theme.info };
      case 'Shipped':
        return { bg: 'rgba(139, 92, 246, 0.1)', text: theme.accent };
      case 'Delivered':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: theme.success };
      case 'Cancelled':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: theme.error };
      default:
        return { bg: 'rgba(156, 163, 175, 0.1)', text: theme.textLight };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <div style={{ width: '50px', height: '50px', marginRight: '10px' }}>
          <CubeIcon iconType="order" size={50} autoRotate={true} color={theme.accent} />
        </div>
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by order ID, customer name, or email..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  backgroundColor: theme.inputBg, 
                  color: theme.text,
                  borderColor: theme.inputBorder,
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '0.375rem',
                  width: '100%'
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <select
              className="input-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ 
                backgroundColor: theme.inputBg, 
                color: theme.text,
                borderColor: theme.inputBorder,
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem'
              }}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.error || error.error || 'An error occurred'}
        </Message>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200" style={{ borderColor: theme.border }}>
              <thead style={{ backgroundColor: theme.cardHoverBg }}>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('_id')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon('_id')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('user.name')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Customer {getSortIcon('user.name')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Date {getSortIcon('createdAt')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('totalPrice')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Total {getSortIcon('totalPrice')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('isPaid')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Paid {getSortIcon('isPaid')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"  
                    style={{ color: theme.textLight }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200" style={{ borderColor: theme.border }}>
                {getFilteredOrders().map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50" style={{ ':hover': { backgroundColor: theme.cardHoverBg } }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium" style={{ color: theme.text }}>
                        {order.user && order.user.name ? order.user.name : 'Unknown User'}
                      </div>
                      <div className="text-sm" style={{ color: theme.textLight }}>
                        {order.user && order.user.email ? order.user.email : 'No email'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.textLight }}>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.isPaid ? (
                        <span 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: theme.success,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px'
                          }}
                        >
                          {new Date(order.paidAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            color: theme.error,
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px'
                          }}
                        >
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{
                          backgroundColor: getStatusBadgeColor(order.status).bg,
                          color: getStatusBadgeColor(order.status).text,
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px'
                        }}
                      >
                        {order.status || 'Processing'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/order/${order._id}`}
                        className="flex items-center justify-end"
                        style={{ color: theme.primary }}
                      >
                        <FaEye className="mr-1" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
