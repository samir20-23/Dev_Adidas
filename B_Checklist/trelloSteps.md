 

### 🗂️ Lists (Columns)
1. **Backlog**  
2. **To Do**  
3. **In Progress**  
4. **Code Review / PR**  
5. **QA & Testing**  
6. **Done**  

---

### 📋 Card Templates

#### Backlog  
*(high‑level features to scope later)*  
- Internationalization (i18n)  
- Analytics integration  
- SEO optimizations  
- Performance tuning  

---

#### To Do  
1. **Setup Project**  
   - initialize Git repo, add `.gitignore`  
   - install dependencies (React/Vue/Angular, routing, state)  
   - configure ESLint/Prettier, CI pipeline  
2. **Wireframe Pages**  
   - create empty routes/components for Home, Product, Cart, Checkout, Confirmation, Contact, Login/Register  
3. **Import Design Assets**  
   - copy exported SVG/PNG/WebP into `/assets`  
   - define SCSS/CSS variables for colors & fonts  
4. **Navigation Bar**  
   - implement responsive navbar with links: Home, Products, Cart, Contact, Account  
5. **Product Data Service**  
   - build API client (real or mocked JSON)  
   - define TypeScript interfaces (or JS JSDoc) for Product model  
6. **Home Page**  
   - fetch & display product cards  
   - handle loading & error states  
7. **Product Detail Page**  
   - implement image carousel & variant selectors (size/color)  
   - display stock status & description  
8. **Cart Functionality**  
   - add‑to‑cart action (with animation/feedback)  
   - cart state management (context/redux/pinia)  
   - empty cart view & remove/update quantity  
9. **Checkout Flow**  
   - build multi‑step or single‑page form  
   - field validations (email, address, phone)  
   - error state handling (payment failure)  
10. **Confirmation Page**  
    - show order summary & “Thank you” message  
11. **Auth**  
    - login/register pages & form validation  
    - stub or integrate real auth (JWT/OAuth)  
12. **Responsive Layouts**  
    - test & adjust breakpoints for tablet/mobile  
13. **Accessibility**  
    - add `aria` attributes, keyboard focus styles, alt texts  
14. **Payment Integration Stub**  
    - integrate with test keys or mock service  
15. **Unit & E2E Tests**  
    - write tests for critical flows (add to cart, checkout)  

---

#### In Progress  
– Move cards here when you start coding them.

---

#### Code Review / PR  
– Once a feature is implemented, open a PR and move the card here.

---

#### QA & Testing  
– After merge, verify in staging, fix bugs, then move onward.

---

#### Done  
– Completed and deployed features go here.

---

### 🔄 Workflow Tips
- **Prioritize**: Pull from Backlog → To Do each sprint.  
- **WIP Limit**: Don’t have more than 3 cards In Progress at once.  
- **PR Reviews**: Tag teammates and link PRs in card comments.  
- **Definition of Done**: Code merged, tests passing, design ✅, accessibility ✅.

 