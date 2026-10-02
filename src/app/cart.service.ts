import { Injectable, signal, computed } from '@angular/core';
import { CartLine, CustomerDetails, Product } from './models';
import { STORE_CONFIG } from './store.config';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly linesSignal = signal<CartLine[]>([]);
  readonly lines = this.linesSignal.asReadonly();
  readonly itemCount = computed(() => this.linesSignal().reduce((sum, line) => sum + line.quantity, 0));
  readonly subtotal = computed(() => this.linesSignal().reduce((sum, line) => sum + line.price * line.quantity, 0));

  add(product: Product): void {
    this.linesSignal.update((lines) => {
      const existing = lines.find((line) => line.id === product.id);
      if (existing) {
        return lines.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line);
      }
      return [...lines, { ...product, quantity: 1 }];
    });
  }

  decrease(productId: number): void {
    this.linesSignal.update((lines) => lines.flatMap((line) => {
      if (line.id !== productId) return [line];
      return line.quantity > 1 ? [{ ...line, quantity: line.quantity - 1 }] : [];
    }));
  }

  remove(productId: number): void {
    this.linesSignal.update((lines) => lines.filter((line) => line.id !== productId));
  }

  clear(): void {
    this.linesSignal.set([]);
  }

  whatsappLink(customer: CustomerDetails): string {
    const lines = this.linesSignal();
    const items = lines.map((line) => `• ${line.name} × ${line.quantity} — ${STORE_CONFIG.currency}${line.price * line.quantity}`).join('\n');
    const message = [
      `Hello ${STORE_CONFIG.name}! 🌸`,
      `I'd like to place an order:`,
      '',
      items,
      '',
      `Subtotal: ${STORE_CONFIG.currency}${this.subtotal()}`,
      '',
      `CUSTOMER DETAILS`,
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Delivery address: ${customer.address}`,
      `City: ${customer.city}`,
      `PIN code: ${customer.pincode}`,
      customer.note ? `Note: ${customer.note}` : '',
      '',
      'Please confirm product availability, delivery charges and final total. Thank you!'
    ].filter(Boolean).join('\n');
    return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
