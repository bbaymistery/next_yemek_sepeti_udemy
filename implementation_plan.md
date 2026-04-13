# Project Professionalization & Feature Planning

This document outlines an ordered, step-by-step roadmap to upgrade the `yemek_Sepeti_udemy` project to a modern, fully functional, and professional web application.

## User Review Required

> [!IMPORTANT]
> The steps below are ordered logically to prevent confusion. We are starting with **Client-Side Animations** as requested!

---

## Step-by-Step Roadmap

### Step 1: Client-Side Animations (UI Polish) - *[COMPLETED]*
**Goal:** Give the website a dynamic, premium feel using modern animations as the first major visual upgrade.
- Installed **Framer Motion**.
- Added fade-in and slide-up animations to the Hero component, About section, and Campaigns.
- Added smooth stagger effects to the product lists and carousel slides.

### Step 1.5: Input Validation with Zod - *[COMPLETED]*
**Goal:** Prevent invalid or malicious data from reaching the database.
- Installed `zod`.
- Created robust schemas (`user`, `product`, `category`, `order`) inside `/schema/validations.js`.
- Implemented Zod validation in POST/PUT API route handlers before executing database operations.

### Step 1.6: Centralized Error Handling - *[COMPLETED]*
**Goal:** Provide standard error messages and avoid raw `console.log(err)` across API routes.
- Created `util/errorHandler.js` utility.
- Refactored 11 API route endpoints (`users`, `products`, `orders`, `categories`, `footer`) to universally use this error wrapper.
- All errors now return a consistent JSON format with status codes.

### Step 2: Robust Admin Authentication - *[COMPLETED]*
**Goal:** Secure and manage admins properly through the database.
- Confirmed `User` DB model includes a `role` field (`"user"` or `"admin"`).
- Refactored **NextAuth** callbacks to store and provide `role` in the session.
- Created `util/adminCheck.js` to protect API routes.
- Logged in users now have persistent roles available on the client and server.

### Step 3: Dynamic Admin-Managed Carousel (Hero Section) [NEW]
**Goal:** Make the main sliders (text and images) after the navbar 100% dynamic, controllable from the Admin Panel via API, using best practices.
- Create a `Carousel` database model (image, title, description).
- Create secured API endpoints (`GET`, `POST`, `PUT`, `DELETE` at `/api/carousel`) to handle DB requests.
- Build a new tab component in the Admin Dashboard (`Admin Carousel Manager`) so admins can add, edit, or delete slides visually.
- Fetch this data in `pages/index.jsx` using `getServerSideProps` or via a fast `SWR` fetch and pass it to the Carousel component to render active slides.

### Step 4: Payment Integration (Ordering API)
**Goal:** Allow users to pay for their orders digitally rather than just "cash on delivery."
- Integrate **Stripe** as the payment gateway.
- Add an API route `pages/api/checkout_sessions` to handle Stripe checkouts safely.
- Modify the Cart page to redirect to the Stripe hosted checkout upon "Pay with Card".

### Step 5: Order Tracking System
**Goal:** Allow customers to track their order status in real time.
- Enhance the `pages/order/[id].jsx` page to show a detailed, animated progress bar (e.g., "Received" -> "Preparing" -> "On the Way" -> "Delivered").
- Add polling (via SWR) to update the status seamlessly.
- Add controls in the Admin Dashboard for admins to advance the order status visually.

### Step 6: Customer Reviews and Ratings
**Goal:** Allow customers to rate their experience and leave comments on meals they have ordered.
- Add a new `Review` model linking `User`, `Product`/`Order`, rating (1-5 stars), and a text comment.
- Add a reviews section to the Product detail page showing average star ratings and latest customer comments.
- Give admins a dashboard view to moderate/delete comments if needed.

### Step 7: Registration Confirmation Emails
**Goal:** Send a professional "Welcome" message when a user registers.
- Implement **Nodemailer** (or Resend).
- Trigger an email dispatch whenever a user successfully registers on the site.

### Step 8: Future AI Capabilities
**Goal:** Outlining where AI could be introduced later.
- Smart Recommendations based on past orders.
- Review Sentiment Analysis (to alert admins if a review is very negative).
