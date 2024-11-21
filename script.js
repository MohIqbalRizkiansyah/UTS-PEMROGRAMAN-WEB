// Data Produk
const products = [
    { id: 1, name: "payung", price: 10000 },
    { id: 2, name: "jas hujan", price: 20000 },
    { id: 3, name: "Roti", price: 3000 },
    { id: 4, name: "lampu", price: 10000},
    { id: 5, name: "senter", price: 20000 },
    { id: 6, name: "minyak", price: 30000 },
    { id: 7, name: "Aqua galon", price: 30000 },
    { id: 8, name: "beras", price: 30000 },
    { id: 9, name: "gula pasir", price: 10000 },
    { id: 10, name: "kopi", price: 7000 },
    { id: 11, name: "sabun", price: 5000 },
    { id: 12, name: "sampo", price: 5000 },
  ];
  
  // Data Keranjang
  let cart = [];
  
  // Menampilkan Halaman
  function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
      page.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
  }
  
  // Memuat Produk
  function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Bersihkan daftar sebelum ditambahkan ulang
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "product";
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Harga: ${product.price}</p>
        <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
      `;
      productList.appendChild(productElement);
    });
  }
  
  // Menambahkan Produk ke Keranjang
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      console.error("Produk tidak ditemukan");
      return;
    }
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    alert(`Produk "${product.name}" berhasil ditambahkan ke keranjang.`);
  }
  
  // Memperbarui Keranjang
  function updateCart() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = ""; // Reset daftar keranjang
    let total = 0;
  
    cart.forEach(item => {
      total += item.price * item.quantity;
  
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
        <h4>${item.name}</h4>
        <p>Harga: ${item.price}</p>
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <p>Total: ${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Hapus</button>
      `;
  
      cartList.appendChild(cartItemElement);
    });
  
    cartTotal.textContent = total;
  }
  
  // Menambah Jumlah Barang di Keranjang
  function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
      updateCart();
    }
  }
  
  // Mengurangi Jumlah Barang di Keranjang
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        // Jika jumlah jadi 0, hapus dari keranjang
        cart = cart.filter(item => item.id !== productId);
      }
      updateCart();
    }
  }
  
  // Menghapus Produk dari Keranjang
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Proses Checkout
  document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Pembayaran berhasil! Terima kasih atas pembelian Anda.");
    cart = [];
    updateCart();
    showPage("products");
  });
  
  // Memuat Data Awal
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
  });
  