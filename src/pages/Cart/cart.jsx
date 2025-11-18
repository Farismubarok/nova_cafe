// farismubarok/nova_cafe/nova_cafe-548995ea2b5bef148f7ec5bbf5d50506c2e070b1/src/pages/Cart/cart.jsx

// ... existing imports

const CartPage = () => {
  const { cartItems, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Properti yang BUKAN merupakan opsi kustomisasi yang perlu di-render secara terpisah
  const excludeProps = ['key', 'id', 'name', 'img', 'price', 'quantity', 'toppings', 'notes', 'totalPrice', 'category'];
  
  // Helper function untuk rendering opsi dinamis
  const renderSelectedOptions = (item) => {
    const optionsToRender = [];
    for (const key in item) {
      // Hanya tampilkan properti yang BUKAN properti inti dan BUKAN array
      if (!excludeProps.includes(key) && typeof item[key] === 'string') {
        // Kapitalisasi nama opsi untuk tampilan (misal: 'portion' menjadi 'Portion')
        const displayName = key.charAt(0).toUpperCase() + key.slice(1);
        optionsToRender.push(<p key={key}>{displayName}: {item[key]}</p>);
      }
    }
    return optionsToRender;
  };

  // ... existing code for empty cart

  return (
    <div className="cart-page">
      <h2>Keranjang Belanja Anda</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-card" key={item.key}>
            <img src={item.img} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              
              {/* 💡 Opsi Kustomisasi Dinamis */}
              {renderSelectedOptions(item)}
              
              {/* Tampilkan toppings jika ada */}
              {item.toppings?.length > 0 && (
                <p>Toppings: {item.toppings.join(", ")}</p>
              )}
              
              {/* Tampilkan catatan jika ada */}
              {item.notes && item.notes.trim() !== "" && (
                <p className="cart-notes">
                  <strong>Catatan:</strong> {item.notes}
                </p>
              )}
            </div>
            <div className="cart-price">
              <p>Rp. {item.totalPrice.toLocaleString("id-ID")}</p>
              <button onClick={() => removeFromCart(item.key)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-info">
          <p>Total Harga</p>
          <h4>Rp. {getTotal().toLocaleString("id-ID")}</h4>
        </div>
        
        <div className="cart-actions">
          <button 
            className="checkout-btn"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Lanjut Pembayaran
          </button>
          <button className="clear-btn" onClick={clearCart}>
            Kosongkan Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;