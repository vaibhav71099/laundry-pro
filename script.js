let cart = [];

function toggleCart(name, price) {
    
    const btnId = "btn-" + name.replace(/\s+/g, '');
    const btn = document.getElementById(btnId);
    
    
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex === -1) {
        // --- ADD ITEM LOGIC ---
        cart.push({ id: Date.now(), name, price });
        

        btn.innerHTML = `Remove Item <i class="fas fa-minus-circle"></i>`;
        btn.style.backgroundColor = "#ef4444"; // Red color
        btn.style.color = "#fff";
    } else {
        
        cart.splice(itemIndex, 1);
        
        
        btn.innerHTML = `Add Item <i class="fas fa-plus-circle"></i>`;
        btn.style.backgroundColor = "#f1f5f9"; // Original gray color
        btn.style.color = "#1e293b";
    }
    
    updateUI();
}

function updateUI() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('total-price');
    list.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-txt">Add items to start booking</p>';
    } else {
        cart.forEach(item => {
            total += item.price;
            list.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:5px 0; border-bottom:1px solid #f1f5f9;">
                    <span>${item.name}</span>
                    <span>₹${item.price.toFixed(2)}</span>
                </div>`;
        });
    }
    totalDisp.innerText = `₹ ${total.toFixed(2)}`;
}


function sendEmail() {
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone || cart.length === 0) {
        alert("Sagli mahiti bhara ani service niwda!");
        return;
    }

    const params = {
        from_name: name,
        user_email: email,
        phone_number: phone,
        message: "Orders: " + cart.map(i => i.name).join(", ") + " | Total: " + document.getElementById('total-price').innerText
    };

    emailjs.send("service_osqbdzv", "template_yplfecj", params)
        .then(() => {
            document.getElementById('success-msg').style.display = 'block';
            
            
            cart.forEach(item => {
                const btnId = "btn-" + item.name.replace(/\s+/g, '');
                const btn = document.getElementById(btnId);
                if(btn) {
                    btn.innerHTML = `Add Item <i class="fas fa-plus-circle"></i>`;
                    btn.style.backgroundColor = "#f1f5f9";
                    btn.style.color = "#1e293b";
                }
            });

            cart = [];
            updateUI();
            document.querySelectorAll('input').forEach(i => i.value = '');
            setTimeout(() => { document.getElementById('success-msg').style.display = 'none'; }, 5000);
        });
}
