# ChittiKala — Ladies Emporium

A polished Angular 22 storefront for **ChittiKala**, designed for Vercel hosting with a WhatsApp-first ordering flow.

## Included

- Responsive fashion storefront
- ChittiKala brand identity and editorial-style landing page
- Product catalogue with categories and search
- Add-to-bag, quantity controls and cart drawer
- WhatsApp click-to-order with a prefilled itemized message
- Mobile navigation
- Vercel SPA rewrite configuration
- No backend required for the initial ordering workflow

## 1. Install

Use a current Node.js version supported by Angular 22, then:

```bash
npm install
```

## 2. Set the WhatsApp Business number

Open:

`src/app/store.config.ts`

Change:

```ts
whatsappNumber: '919999999999'
```

to the ChittiKala WhatsApp Business number in international format **without +, spaces or dashes**.

Example for an Indian number:

```ts
whatsappNumber: '919876543210'
```

The checkout uses WhatsApp's public click-to-chat URL, so the customer is taken to WhatsApp with the order already written out. You do not expose a WhatsApp API token in the browser.

## 3. Run locally

```bash
npm start
```

Open `http://localhost:4200`.

## 4. Build

```bash
npm run build
```

The production output is created under `dist/chittikala`.

## 5. Deploy to Vercel

Push this folder to GitHub and import it into Vercel. Vercel can deploy Angular applications directly. Use:

- Framework preset: Angular
- Build command: `npm run build`
- Output directory: `dist/chittikala/browser` if Vercel asks for one explicitly; otherwise let the Angular preset detect it.

The included `vercel.json` rewrites client-side routes to `index.html`.

## Product photos

The starter catalogue uses remote Unsplash images so the project looks polished immediately. Replace the `image` values in `src/app/catalog.ts` with your actual ChittiKala product photos before launch.

## Next production upgrades

1. Add real product inventory and variants.
2. Add a backend/database if you need order history, stock management or admin access.
3. If you need automated WhatsApp messages, delivery-status updates or order creation inside WhatsApp Business Platform, add a server-side WhatsApp Cloud API integration. Keep API credentials on the server, never in Angular browser code.


## Checkout and delivery address

The shopping bag collects the customer’s full name, phone number, delivery address, city, PIN code, and an optional order note. These details are included in the WhatsApp message sent to the ChittiKala WhatsApp Business number configured in `src/app/store.config.ts`.

The catalogue currently contains 16 starter products across sarees, kurtis, dresses, jewellery, and accessories. Replace the demo image URLs and product details in `src/app/catalog.ts` with ChittiKala’s real inventory before launch.
