import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (serviceId: string, change: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center text-muted py-5">
          <ShoppingCart className="mb-2" size={24} />
          <p className="mb-0">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">Shopping Cart</h5>
        <div className="mb-4">
          {items.map((item) => (
            <div key={item.service.id} className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
              <div>
                <h6 className="mb-1">{item.service.name}</h6>
                <p className="text-muted small mb-0">${item.service.price.toFixed(2)}</p>
              </div>
              <div className="d-flex align-items-center">
                <button
                  onClick={() => onUpdateQuantity(item.service.id, -1)}
                  className="btn btn-outline-secondary btn-sm"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="mx-3">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.service.id, 1)}
                  className="btn btn-outline-secondary btn-sm"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => onRemoveItem(item.service.id)}
                  className="btn btn-outline-danger btn-sm ms-3"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-top pt-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold">Total:</span>
            <span className="fs-4 fw-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="btn btn-success w-100"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}