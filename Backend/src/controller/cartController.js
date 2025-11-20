import { db } from "../config/db.js";

const query = (sql, vals=[]) => new Promise((resolve, reject) => {
  db.query(sql, vals, (err, result) => {
    if (err) return reject(err);
    resolve(result);
  });
});

// GET /cart/:userId
export const getCart = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  try {
    const items = await query('SELECT * FROM cart_item WHERE user_id = ?', [userId]);

    const detailed = [];
    for (const it of items) {
      const cartItemId = it.cart_item_id;
      // base item
      const menuRow = await query('SELECT * FROM menu WHERE menu_id = ? LIMIT 1', [it.menu_id]);
      const menu = menuRow[0] || {};

      // options
      const optionsRows = await query('SELECT option_name, option_value FROM cart_option WHERE cart_item_id = ?', [cartItemId]);
      const options = {};
      optionsRows.forEach(r => { options[r.option_name] = r.option_value; });

      // toppings
      const toppingRows = await query(
        'SELECT t.topping_name FROM cart_topping ct JOIN toppings t ON ct.topping_id = t.topping_id WHERE ct.cart_item_id = ?',
        [cartItemId]
      ).catch(() => []);
      const toppings = toppingRows.map(r => r.topping_name);

      const price = Number(menu.price || 0);
      detailed.push({
        key: cartItemId,
        id: it.menu_id,
        name: menu.menu_name || it.menu_name || '',
        img: menu.image_path || menu.image || it.image || '',
        price,
        quantity: it.quantity,
        notes: it.notes || '',
        toppings,
        totalPrice: Number((it.quantity || 1) * price),
        ...options
      });
    }

    res.json(detailed);
  } catch (err) {
    console.error('getCart error', err);
    res.status(500).json({ error: err.message });
  }
};

// POST /cart  body: { user_id, item }
export const addCartItem = async (req, res) => {
  const { user_id, item } = req.body;
  if (!user_id || !item || !item.id) return res.status(400).json({ message: 'user_id and item.id required' });

  try {
    // insert cart_item (schema: cart_item_id, user_id, menu_id, quantity, created_at)
    const quantity = item.quantity || 1;
    const result = await query(
      'INSERT INTO cart_item (user_id, menu_id, quantity) VALUES (?, ?, ?)',
      [user_id, item.id, quantity]
    );

    const cartItemId = result.insertId;

    // insert options (take item props that are not core fields)
      const core = ['key','id','name','img','price','quantity','toppings','notes','totalPrice','category'];
    for (const k of Object.keys(item)) {
      if (!core.includes(k) && typeof item[k] === 'string') {
        await query('INSERT INTO cart_option (cart_item_id, option_name, option_value) VALUES (?, ?, ?)', [cartItemId, k, item[k]]).catch(()=>{});
      }
    }

    // insert toppings if provided (assume frontend sends topping names or ids)
      if (Array.isArray(item.toppings) && item.toppings.length > 0) {
      for (const t of item.toppings) {
        // try to resolve topping id by name
        let toppingId = null;
        if (typeof t === 'number') toppingId = t;
        else {
          const r = await query('SELECT topping_id FROM toppings WHERE topping_name = ? LIMIT 1', [t]).catch(()=>[]);
          if (r && r[0]) toppingId = r[0].topping_id;
        }
        if (toppingId) {
          await query('INSERT INTO cart_topping (cart_item_id, topping_id) VALUES (?, ?)', [cartItemId, toppingId]).catch(()=>{});
        }
      }
    }

    res.status(201).json({ message: 'added', cart_item_id: cartItemId });
  } catch (err) {
    console.error('addCartItem error', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /cart/:cartItemId
export const removeCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  if (!cartItemId) return res.status(400).json({ message: 'cartItemId required' });

  try {
    await query('DELETE FROM cart_option WHERE cart_item_id = ?', [cartItemId]);
    await query('DELETE FROM cart_topping WHERE cart_item_id = ?', [cartItemId]);
    const r = await query('DELETE FROM cart_item WHERE cart_item_id = ?', [cartItemId]);
    res.json({ message: 'deleted', affectedRows: r.affectedRows });
  } catch (err) {
    console.error('removeCartItem error', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /cart/user/:userId  (clear user's cart)
export const clearCart = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  try {
    // get cart item ids
    const items = await query('SELECT cart_item_id FROM cart_item WHERE user_id = ?', [userId]);
    for (const it of items) {
      await query('DELETE FROM cart_option WHERE cart_item_id = ?', [it.cart_item_id]).catch(()=>{});
      await query('DELETE FROM cart_topping WHERE cart_item_id = ?', [it.cart_item_id]).catch(()=>{});
    }
    await query('DELETE FROM cart_item WHERE user_id = ?', [userId]);
    res.json({ message: 'cleared' });
  } catch (err) {
    console.error('clearCart error', err);
    res.status(500).json({ error: err.message });
  }
};
