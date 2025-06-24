# EcommerceBackend

## Project Objective

1. **Order Management**  
   Manage orders, including creation, deletion, and retrieval.

2. **Product Management**  
   Handle product creation, updates, and deletion, including categories, subcategories, and brands.

3. **User Management**  
   Manage user accounts, addresses, and associated device information.

4. **Review System**  
   Allow users to add, delete, and view reviews for products.

## How to Run This Backend Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server in watch mode:
   ```bash
   node --watch index.js
   ```

3. Ensure MongoDB is running and connected via the `Mongodb_URI` in your `.env` file.

## API Endpoints

### Categories
- **Create Category**: `POST /api/categories`
- **Get All Categories**: `GET /api/categories`

### Subcategories
- **Create SubCategory**: `POST /api/subcategories`
- **Get All SubCategories**: `GET /api/subcategories`
- **Delete SubCategory**: `DELETE /api/subcategories/:id`

### Products
- **Create Product**: `POST /api/products`
- **Get All Products**: `GET /api/products`
- **Get Product by ID**: `GET /api/products/:id`
- **Delete Product**: `DELETE /api/products/:id`

### Brands
- **Create Brand**: `POST /api/brands`
- **Get All Brands**: `GET /api/brands`
- **Delete Brand**: `DELETE /api/brands/:id`

### Orders
- **Create Order**: `POST /api/orders`
- **Get All Orders**: `GET /api/orders`
- **Delete Order**: `DELETE /api/orders/:id`

### Reviews
- **Add Review**: `POST /api/products/:id/reviews`
- **Delete Review**: `DELETE /api/products/:productId/reviews/:reviewId`

### Addresses
- **Create Address**: `POST /api/addresses`

## Notes

- Ensure all required fields are provided in the request body for POST and PUT endpoints.
- Use tools like Postman or curl to test the API endpoints.
- Check the logs for any errors during development.



