'use client';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'personal-info', label: 'Personal Information', icon: 'user' },
    { id: 'order-history', label: 'Order History', icon: 'shopping-bag' },
    { id: 'shipping-addresses', label: 'Shipping Addresses', icon: 'truck' },
    { id: 'payment-methods', label: 'Payment Methods', icon: 'credit-card' },
    { id: 'account-settings', label: 'Account Settings', icon: 'cog' },
  ];

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">
                <i className={`fas fa-${tab.icon}`}></i>
              </span>
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
      