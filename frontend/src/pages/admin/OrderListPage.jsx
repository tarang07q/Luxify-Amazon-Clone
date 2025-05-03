import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetAllOrdersQuery } from '../../slices/services/orderService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import { useTheme } from '../../context/ThemeContext';
import { FaEye, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const OrderListPage = () => {
  const { theme, currentTheme } = useTheme();
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

    let filteredOrders = [...orders.data];

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
          order.user.name.toLowerCase().includes(search) ||
          order.user.email.toLowerCase().includes(search)
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
          aValue = a.user.name;
          bValue = b.user.name;
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
        return 'bg-yellow-100 text-yellow-800';
      case 'Packed':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {/* Search and Filter */}
      <div className="rounded-lg shadow-md p-4 mb-6" style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        boxShadow: theme.shadow
      }}>
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
                  borderColor: theme.inputBorder,
                  color: theme.text
                }}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch style={{ color: theme.textLight }} />
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
                borderColor: theme.inputBorder,
                color: theme.text
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
        <div className="rounded-lg shadow-md overflow-hidden" style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
          boxShadow: theme.shadow
        }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: theme.border }}>
              <thead style={{ backgroundColor: currentTheme === 'dark' ? theme.background : theme.cardBg }}>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('_id')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      ID {getSortIcon('_id')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('user.name')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Customer {getSortIcon('user.name')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Date {getSortIcon('createdAt')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('totalPrice')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Total {getSortIcon('totalPrice')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('isPaid')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Paid {getSortIcon('isPaid')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                    style={{ color: theme.textLight }}
                  >
                    <div className="flex items-center">
                      Status {getSortIcon('status')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                    style={{ color: theme.textLight }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}>
                {getFilteredOrders().map((order) => (
                  <tr key={order._id} className="hover:bg-opacity-50" style={{
                    borderColor: theme.border,
                    ':hover': { backgroundColor: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }
                  }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.text }}>
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium" style={{ color: theme.text }}>
                        {order.user.name}
                      </div>
                      <div className="text-sm" style={{ color: theme.textLight }}>{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.text }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.primary }}>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.isPaid ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{
                          backgroundColor: currentTheme === 'dark' ? 'rgba(1, 255, 195, 0.2)' : 'rgba(16, 185, 129, 0.1)',
                          color: theme.success
                        }}>
                          {new Date(order.paidAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" style={{
                          backgroundColor: currentTheme === 'dark' ? 'rgba(255, 61, 113, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                          color: theme.error
                        }}>
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        style={{
                          backgroundColor: currentTheme === 'dark'
                            ? order.status === 'Delivered'
                              ? 'rgba(1, 255, 195, 0.2)'
                              : order.status === 'Shipped'
                                ? 'rgba(0, 149, 255, 0.2)'
                                : order.status === 'Packed'
                                  ? 'rgba(139, 92, 246, 0.2)'
                                  : order.status === 'Cancelled'
                                    ? 'rgba(255, 61, 113, 0.2)'
                                    : 'rgba(255, 170, 0, 0.2)'
                            : getStatusBadgeColor(order.status),
                          color: order.status === 'Delivered'
                            ? theme.success
                            : order.status === 'Shipped'
                              ? theme.info
                              : order.status === 'Packed'
                                ? theme.accent
                                : order.status === 'Cancelled'
                                  ? theme.error
                                  : theme.warning
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/order/${order._id}`}
                        style={{ color: theme.primary }}
                        className="hover:opacity-80 flex items-center justify-end"
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
