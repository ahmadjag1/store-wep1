   // --- PAGE NAVIGATION ---
        const homePage = document.getElementById('home-page');
        const storePage = document.getElementById('store-page');
        const navItems = document.querySelectorAll('.nav-item');

        function showPage(pageName) {
            window.scrollTo(0, 0);
            navItems.forEach(item => item.classList.remove('active'));
            
            if (pageName === 'home') {
                homePage.style.display = 'block';
                storePage.style.display = 'none';
                navItems.forEach(item => { if(item.textContent === 'Home') item.classList.add('active'); });
            } else if (pageName === 'store') {
                homePage.style.display = 'none';
                storePage.style.display = 'block';
                navItems.forEach(item => { if(item.textContent === 'Store') item.classList.add('active'); });
            }
        }

        // --- STORE CATEGORY FILTERS ---
        function filterStore(category, btn) {
            // Update active button
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all sections
            document.querySelectorAll('.products-section').forEach(section => section.classList.remove('active'));

            // Show selected section
            document.getElementById(`cat-${category}`).classList.add('active');
        }

        // --- SHOPPING CART LOGIC ---
        let cart = [];
        const cartDrawer = document.getElementById('cartDrawer');
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const cartCountEl = document.getElementById('cartCount');

        function toggleCart() {
            cartDrawer.classList.toggle('open');
        }

        function addToCart(btn, title, price, icon) {
            cart.push({ title, price, icon });
            updateCartDisplay();
            
            // Visual Feedback
            const originalText = btn.textContent;
            
            btn.textContent = "Add to Cart Successful";
            btn.style.backgroundColor = "#2ecc71"; // Green color
            btn.style.color = "white";
            btn.style.borderColor = "#2ecc71";
            
            // Revert after 2 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ""; // Revert to CSS default
                btn.style.color = ""; 
                btn.style.borderColor = "";
            }, 2000);
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartDisplay();
        }

        function updateCartDisplay() {
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
                cartCountEl.textContent = '0';
                cartTotalEl.textContent = '$0.00';
                return;
            }

            cart.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-img"><i class="fa-solid ${item.icon}"></i></div>
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.title}</span>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            cartTotalEl.textContent = '$' + total.toFixed(2);
            cartCountEl.textContent = cart.length;
        }

        function checkout() {
            if(cart.length === 0) return;
            const btn = document.querySelector('.checkout-btn');
            const originalText = btn.textContent;
            btn.textContent = "Processing...";
            btn.style.background = "#2ecc71"; // Green
            
            setTimeout(() => {
                alert('Thank you for your purchase! Items have been added to your account.');
                cart = [];
                updateCartDisplay();
                toggleCart();
                btn.textContent = originalText;
                btn.style.background = ""; // Reset
            }, 1500);
        }

        // --- LOGIN LOGIC ---
        const loginModal = document.getElementById('loginModal');
        const loginBtn = document.getElementById('loginBtn');
        const userProfile = document.getElementById('userProfile');

        function openLoginModal() { loginModal.classList.add('active'); }
        function closeLoginModal() { loginModal.classList.remove('active'); }
        loginModal.addEventListener('click', (e) => { if (e.target === loginModal) closeLoginModal(); });

        function performLogin() {
            const btn = document.querySelector('.login-btn-large');
            const originalText = btn.innerText;
            btn.innerText = "Authenticating...";
            
            setTimeout(() => {
                btn.innerText = originalText;
                closeLoginModal();
                loginBtn.style.display = 'none';
                userProfile.style.display = 'flex';
                showPage('home');
            }, 1500);
        }

        // Initialize
        showPage('home');