import React from 'react';
import { Receipt as ReceiptType } from '../types';
import { Check } from 'lucide-react';

interface ReceiptProps {
  receipt: ReceiptType;
  onClose: () => void;
}

export function Receipt({ receipt, onClose }: ReceiptProps) {
  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <div className="text-center mb-4">
          <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px' }}>
            <Check className="text-success" size={24} />
          </div>
          <h4 className="mb-1">Thank You!</h4>
          <p className="text-muted">Your order has been confirmed</p>
        </div>

        <div className="border-top border-bottom py-4 mb-4">
          <div className="mb-4">
            <h6 className="mb-2">Customer Details</h6>
            <p className="text-muted mb-1">{receipt.customer.name}</p>
            <p className="text-muted mb-1">{receipt.customer.email}</p>
            <p className="text-muted mb-0">{receipt.customer.phone}</p>
          </div>

          <div>
            <h6 className="mb-3">Order Details</h6>
            {receipt.items.map((item) => (
              <div key={item.service.id} className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  {item.service.name} x {item.quantity}
                </span>
                <span>
                  ${(item.service.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between mb-4">
          <span className="fw-bold">Total</span>
          <span className="fw-bold">${receipt.total.toFixed(2)}</span>
        </div>

        <div className="text-center">
          <p className="text-muted small mb-4">
            Receipt #{receipt.id}<br />
            {receipt.date}
          </p>
          <button
            onClick={onClose}
            className="btn btn-primary w-100"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}