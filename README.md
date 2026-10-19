# BhagyaSwapn Jewels — Earrings Store

A responsive React + Vite storefront with a traditional Maharashtrian-inspired visual identity with product browsing, search, category filters, cart, and a simple admin panel for adding/editing/deleting products.

## Run locally
1. Install Node.js LTS from https://nodejs.org/
2. Extract this folder and open it in VS Code.
3. Open a terminal in this folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the localhost URL printed in the terminal.

## Add or manage earrings
Click **Admin** in the top navigation. This demo admin panel lets you add, edit, and delete products. Product changes and cart contents are stored in the current browser's `localStorage`.

**Important:** This is a front-end demo. There is no secure login, shared database, inventory backend, or payment processing. Products added in Admin are only saved in that browser and will not automatically appear for other customers. For a real store, connect a database/admin authentication and a payment provider such as Razorpay or Stripe before accepting orders.

## Deploy to Vercel
1. Create a GitHub repository and upload all files in this folder.
2. Sign in at https://vercel.com/ and choose **Add New → Project**.
3. Import your GitHub repository.
4. Vercel should detect Vite automatically. Use:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click **Deploy**.

The included `vercel.json` handles client-side routes. Redeploy after pushing code changes.

## Change branding
- Edit `src/App.jsx` for store text and starter products.
- Edit `src/styles.css` for colors, spacing, and visual design.
- Product photos currently use remote Unsplash image URLs. Replace the `image` field for each product with your own product photo URL for best results.
