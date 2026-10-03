# ChittiKala + Supabase setup

This project is based on ChittiKala v3 (cart quantity controls, address collection, WhatsApp checkout). The storefront now reads products from Supabase. `/admin` lets an authorized admin add, edit, delete, and upload product images.

1. In Supabase create a project. Open **SQL Editor**, run `supabase/setup.sql` once. If you want the 16 existing sample products, run `supabase/seed.sql` once afterward.
2. In **Authentication > Users**, create an admin user with an email and password (or invite your own email and set a password). Copy their **Auth user UID**. In SQL Editor run: `insert into public.admins (user_id) values ('PASTE_THE_ADMIN_AUTH_USER_UUID');`. Do not use the project API key as an admin credential.
3. Open **Project Settings > API** (or Connect), copy the **Project URL** and **publishable key** (legacy `anon` key also works). Put them in `src/app/supabase.config.ts`. Never put the database password, service_role key, or secret key in frontend code.
4. Set the real WhatsApp Business number in `src/app/store.config.ts` (international digits, no `+`).
5. Use Node compatible with Angular 22. Run `npm install` then `npm start`. Visit `/admin`, sign in with the admin email/password, and add products. Run `npm run build` before deploying.
6. Push to GitHub and import into Vercel. The included `vercel.json` supports client-side routes, including `/admin`. Product changes go live without redeploying.

Security: Product reads are public only for active products. Product writes and photo uploads are restricted by Row Level Security to users whose Auth UID is in `public.admins`. The image bucket is public, so do not upload private images. Orders and customer addresses are sent to WhatsApp, not saved in Supabase. The admin UI relies on database policies for actual authorization; merely hiding `/admin` would not secure the data.

If a product is missing, check the browser console, `src/app/supabase.config.ts`, whether `setup.sql` was run, and whether the product has `active = true`. There is no fallback to the hardcoded catalogue: run `seed.sql` to import it.
