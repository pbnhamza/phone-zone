## Short project description: Phone-Zone is a simple eCommerce platform for browsing, adding, and managing phones.

## Short project description:

Clone the repository
git clone https://github.com/pbnhamza/phone-zone
cd phone-zone

Install frontend dependencies

npm install

Configure environment variables
Create a .env file in the root folder:

NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

Start the Next.js frontend

npm run dev

Visit: http://localhost:3000

Setup and start the backend

cd server
npm install
node index.js

Backend API runs on: http://localhost:5000

Optional: Build for production

npm run build
npm run start

## Route summary:

| Route              | Description                                            | Access       |
| ------------------ | ------------------------------------------------------ | ------------ |
| `/`                | Landing page with hero, features, and product previews | Public       |
| `/login`           | Login/Register page with Google and credentials        | Public       |
| `/items`           | Item List page showing all phones, search & filter UI  | Public       |
| `/items/[id]`      | Item Details page with full description and meta       | Public       |
| `/add-product`     | Add Product form for creating new phone listings       | Protected    |
| `/manage-products` | Manage Products: view, delete existing phones          | Protected    |
| `/api/auth/*`      | NextAuth.js authentication endpoints                   | Public       |
| `/api/products`    | Backend API to get/add/delete products                 | Backend only |
