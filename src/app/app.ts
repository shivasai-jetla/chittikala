import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CartService } from './cart.service';
import { PRODUCTS } from './catalog';
import { Category, CustomerDetails, Product } from './models';
import { STORE_CONFIG } from './store.config';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  readonly store = STORE_CONFIG;
  readonly products = PRODUCTS;
  readonly cart = inject(CartService);
  readonly categories: Category[] = ['All', 'Sarees', 'Kurtis', 'Jewellery', 'Dresses', 'Accessories'];
  readonly selectedCategory = signal<Category>('All');
  readonly search = signal('');
  readonly cartOpen = signal(false);
  readonly toast = signal('');
  readonly mobileMenu = signal(false);
  readonly customerName = signal('');
  readonly customerPhone = signal('');
  readonly customerAddress = signal('');
  readonly customerCity = signal('');
  readonly customerPincode = signal('');
  readonly customerNote = signal('');

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const query = this.search().trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  });

  setCategory(category: Category): void {
    this.selectedCategory.set(category);
    this.scrollTo('collection');
  }

  addToCart(product: Product): void {
    this.cart.add(product);
    this.toast.set(`${product.name} added to your bag`);
    window.setTimeout(() => this.toast.set(''), 2200);
  }

  openCart(): void { this.cartOpen.set(true); }
  closeCart(): void { this.cartOpen.set(false); }

  orderOnWhatsApp(): void {
    if (!this.cart.itemCount()) return;
    const customer: CustomerDetails = {
      name: this.customerName().trim(),
      phone: this.customerPhone().trim(),
      address: this.customerAddress().trim(),
      city: this.customerCity().trim(),
      pincode: this.customerPincode().trim(),
      note: this.customerNote().trim()
    };
    if (!customer.name || !customer.phone || !customer.address || !customer.city || !customer.pincode) {
      this.toast.set('Please enter your name, phone and complete delivery address');
      window.setTimeout(() => this.toast.set(''), 2600);
      return;
    }
    window.open(this.cart.whatsappLink(customer), '_blank', 'noopener,noreferrer');
  }

  buySingle(product: Product): void {
    this.cart.add(product);
    this.openCart();
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileMenu.set(false);
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-IN').format(value);
  }
}
