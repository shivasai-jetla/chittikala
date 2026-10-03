import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from './catalog';
import { Product } from './models';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabase.config';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export type ProductInput = Omit<Product, 'id'> & { id?: number };

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');

  async refresh(): Promise<void> {
    this.loading.set(true);
    const { data, error } = await supabase.from('products').select('*').eq('active', true).order('id');
    if (error) this.error.set(error.message);
    else { this.products.set((data ?? []).map(fromRow)); this.error.set(''); }
    this.loading.set(false);
  }
  async allForAdmin(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) throw error;
    return (data ?? []).map(fromRow);
  }
  async save(product: ProductInput): Promise<void> {
    const row = {
      name: product.name, category: product.category, price: product.price,
      old_price: product.oldPrice ?? null, badge: product.badge ?? null,
      description: product.description, image: product.image, active: true
    };
    const query = product.id
      ? supabase.from('products').update(row).eq('id', product.id)
      : supabase.from('products').insert(row);
    const { error } = await query;
    if (error) throw error;
    await this.refresh();
  }
  async remove(id: number): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    await this.refresh();
  }
  async uploadImage(file: File): Promise<string> {
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) throw new Error('Choose an image smaller than 5 MB');
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file, { contentType: file.type });
    if (error) throw error;
    return supabase.storage.from('product-images').getPublicUrl(path).data.publicUrl;
  }
}
function fromRow(row: any): Product {
  return { id: row.id, name: row.name, category: row.category, price: row.price,
    oldPrice: row.old_price ?? undefined, badge: row.badge ?? undefined,
    description: row.description ?? '', image: row.image };
}
