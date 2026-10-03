import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductInput, supabase } from './product.service';
import { Product } from './models';

type Draft = ProductInput;
const blank = (): Draft => ({ name: '', category: 'Sarees', price: 0, description: '', image: '' });
@Component({
  selector: 'ck-admin', standalone: true, imports: [FormsModule],
  templateUrl: './admin.html', styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  readonly service = inject(ProductService);
  readonly email = signal(''); readonly password = signal('');
  readonly loggedIn = signal(false); readonly message = signal('');
  readonly busy = signal(false); readonly items = signal<Product[]>([]);
  draft: Draft = blank();
  async ngOnInit() {
    const { data } = await supabase.auth.getSession();
    this.loggedIn.set(!!data.session);
    if (data.session) await this.load();
  }
  async login() {
    const { error } = await supabase.auth.signInWithPassword({ email: this.email(), password: this.password() });
    if (error) this.message.set(error.message);
    else { this.loggedIn.set(true); this.message.set(''); await this.load(); }
  }
  async logout() { await supabase.auth.signOut(); this.loggedIn.set(false); this.items.set([]); }
  async load() { try { this.items.set(await this.service.allForAdmin()); } catch(e) { this.message.set(String(e)); } }
  edit(item: Product) { this.draft = { ...item }; }
  reset() { this.draft = blank(); }
  async upload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return;
    this.busy.set(true);
    try { this.draft.image = await this.service.uploadImage(file); this.message.set('Image uploaded'); }
    catch(e) { this.message.set(String(e)); }
    finally { this.busy.set(false); }
  }
  async save() {
    this.busy.set(true);
    try { await this.service.save(this.draft); await this.load(); this.reset(); this.message.set('Product saved'); }
    catch(e) { this.message.set(String(e)); }
    finally { this.busy.set(false); }
  }
  async remove(item: Product) {
    if (!confirm(`Delete ${item.name}?`)) return;
    try { await this.service.remove(item.id); await this.load(); this.message.set('Product deleted'); }
    catch(e) { this.message.set(String(e)); }
  }
}
