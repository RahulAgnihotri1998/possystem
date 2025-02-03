import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ServiceCard } from './components/ServiceCard';
import { Cart } from './components/Cart';
import { CustomerForm } from './components/CustomerForm';
import { Receipt } from './components/Receipt';
import { services } from './data/services';
import { Service, CartItem, Customer, Receipt as ReceiptType } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptType | null>(null);

  const categories = Array.from(new Set(services.map(service => service.category)));

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (service: Service) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.service.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (serviceId: string, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.service.id === serviceId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (serviceId: string) => {
    setCartItems(prev => prev.filter(item => item.service.id !== serviceId));
  };

  const handleCustomerSubmit = (customer: Customer) => {
    const total = cartItems.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
    const receipt: ReceiptType = {
      id: Math.random().toString(36).substr(2, 9),
      customer,
      items: cartItems,
      total,
      date: new Date().toLocaleString()
    };
    setReceipt(receipt);
    setShowCheckout(false);
    setCartItems([]);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <h1 className="h3 mb-0">Service POS System</h1>
        </div>
      </header>

      <main className="container py-4">
        {receipt ? (
          <Receipt receipt={receipt} onClose={handleCloseReceipt} />
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="mb-4">
                <div className="row g-3">
                  <div className="col">
                    <div className="position-relative">
                      <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                      <input
                        type="text"
                        placeholder="Search services..."
                        className="form-control ps-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="position-relative">
                      <Filter className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
                      <select
                        className="form-select ps-5"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-cols-1 row-cols-md-2 g-4">
                {filteredServices.map(service => (
                  <div key={service.id} className="col">
                    <ServiceCard
                      service={service}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              {showCheckout ? (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Customer Information</h5>
                    <CustomerForm onSubmit={handleCustomerSubmit} />
                  </div>
                </div>
              ) : (
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={() => setShowCheckout(true)}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;