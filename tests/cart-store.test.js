import { describe, it, expect, beforeEach } from 'vitest';
import { getCart, addItem, getTotalItems, clearItems, updateQuantity, removeItem, getTotal } from '../js/cart-store.js';

describe('cart-store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add an item to the cart', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    const cart = getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe('1');
    expect(cart[0].quantity).toBe(1);
  });

  it('should increase quantity if the item already exists', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    const cart = getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  it('should calculate the correct total of items', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    addItem({ id: '2', nombre: 'Mesa', precio: 5000 });
    expect(getTotalItems()).toBe(3);
  });

  it('should calculate the correct total price', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    addItem({ id: '2', nombre: 'Mesa', precio: 5000 });
    expect(getTotal()).toBe(7000);
  });

  it('should remove an item correctly', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    removeItem('1');
    expect(getCart().length).toBe(0);
  });

  it('should update quantity correctly', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    updateQuantity('1', 5);
    const cart = getCart();
    expect(cart[0].quantity).toBe(5);
  });

  it('should remove the item when quantity is updated to 0', () => {
    addItem({ id: '1', nombre: 'Silla', precio: 1000 });
    updateQuantity('1', 0);
    expect(getCart().length).toBe(0);
  });
});
