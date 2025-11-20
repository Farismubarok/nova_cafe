import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './history.css';
import '../Cart/cart.css';

const HistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!user || !user.id) {
        // redirect to login if not logged in
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/orders/user/${user.id}`);
        if (!res.ok) {
          console.error('Failed to load orders', await res.text());
          setLoading(false);
          return;
        }
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error loading orders', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, navigate]);

  return (
    <div className="history-page">
      <aside className="sidebar">
        <h2>Nova Cafe</h2>
      </aside>
      <main className="main-content">
        <h3 className="title">Riwayat Pesanan</h3>

        {loading ? (
          <p>Memuat riwayat...</p>
        ) : (
          <section className="recent-orders">
            {orders.length === 0 && <p>Belum ada pesanan</p>}

            {orders.map(o => (
              <div className="order-card" key={o.order_id}>
                <div className="order-header">
                  <div>
                    <strong>Order #{o.order_id}</strong>
                    <div className="order-date">{new Date(o.created_at).toLocaleString('id-ID')}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>Total: <strong>Rp. {Number(o.total).toLocaleString('id-ID')}</strong></div>
                    <div className={o.status === 'paid' ? 'status-paid' : 'status-pending'}>{o.status}</div>
                  </div>
                </div>

                {/* order items: if backend returns items array render detailed cards */}
                <div className="cart-items">
                  {(o.items && o.items.length > 0) ? (
                    o.items.map(item => (
                      <div className="cart-card" key={item.order_detail_id || item.key || `${o.order_id}-${item.id}`}>
                        <img src={item.img || '/public/images/placeholder.png'} alt={item.name} />
                        <div className="cart-info">
                          <h4>{item.name}</h4>
                          <p>Qty: {item.quantity}</p>

                          {/* dynamic options (size, sugar, ice, portion, etc.) */}
                          {Object.keys(item).filter(k => !['order_detail_id','key','id','name','img','price','quantity','toppings','notes','totalPrice','category'].includes(k) && typeof item[k] === 'string').map(k => (
                            <p key={k}>{k.charAt(0).toUpperCase() + k.slice(1)}: {item[k]}</p>
                          ))}

                          {item.toppings && item.toppings.length > 0 && (
                            <p>Toppings: {item.toppings.join(', ')}</p>
                          )}

                          {item.notes && item.notes.trim() !== '' && (
                            <p className="cart-notes"><strong>Catatan:</strong> {item.notes}</p>
                          )}
                        </div>
                        <div className="cart-price">
                          <p>Rp. {Number(item.totalPrice || (item.price * item.quantity)).toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // fallback to simple summary if no items returned
                    <div className="order-summary">
                      <p>Rp. {Number(o.total).toLocaleString('id-ID')}</p>
                      <p className={o.status === 'paid' ? 'status-paid' : 'status-pending'}>{o.status}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
