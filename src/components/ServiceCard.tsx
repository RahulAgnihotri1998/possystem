import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onAddToCart: (service: Service) => void;
}

export function ServiceCard({ service, onAddToCart }: ServiceCardProps) {
  return (
    <div className="card h-100">
      <img 
        src={service.image} 
        alt={service.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{service.name}</h5>
          <span className="text-success fw-bold">
            ${service.price.toFixed(2)}
          </span>
        </div>
        <p className="card-text text-muted small mb-3">{service.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="text-muted d-flex align-items-center">
            <Clock className="me-1" size={16} />
            <small>{service.duration}</small>
          </div>
          <button
            onClick={() => onAddToCart(service)}
            className="btn btn-primary d-flex align-items-center"
          >
            <Plus className="me-1" size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}