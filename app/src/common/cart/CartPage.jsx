import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import styles from './CartPage.module.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3100/api/cart/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const data = response.data;
        if (Array.isArray(data.cart)) setCartItems(data.cart);
        else setCartItems([]);
      })
      .catch(err => console.error('Lỗi lấy giỏ hàng:', err))
      .finally(() => setLoading(false));
  };

  const formatCurrency = num => num.toLocaleString('vi-VN') + ' ₫';

  const handleSelectChange = (id, checked) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleDelete = async (cartItemID) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
    if (!confirmed) return;

    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete('http://localhost:3100/api/cart/removecartitem', {
        headers: { Authorization: `Bearer ${token}` },
        data: { cartItemID },
      });

      if (response.status === 200) {
        setCartItems(prev => prev.filter(item => item.CartItemId !== cartItemID));
        setSelectedItems(prev => {
          const newSelected = { ...prev };
          delete newSelected[cartItemID];
          return newSelected;
        });
        alert(response.data.message || 'Đã xóa sản phẩm khỏi giỏ hàng');
      } else {
        alert(response.data.error || 'Xóa sản phẩm thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa:', error);
      alert('Xảy ra lỗi khi xóa sản phẩm');
    }
  };

  const handleCheckout = async () => {
    const selectedCartItemIDs = Object.entries(selectedItems)
      .filter(([_, checked]) => checked)
      .map(([id]) => parseInt(id));

    if (selectedCartItemIDs.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:3100/api/order/orderItem',
        { cartItemID: selectedCartItemIDs },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert('Thanh toán thành công!');
        setCartItems(prev => prev.filter(item => !selectedCartItemIDs.includes(item.CartItemId)));
        setSelectedItems({});
      } else {
        alert(response.data.message || 'Thanh toán thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi thanh toán:', error);
      alert('Đã xảy ra lỗi khi thanh toán');
    }
  };

  const totalSelectedAmount = cartItems.reduce((total, item) => {
    if (selectedItems[item.CartItemId]) {
      return total + item.BookPrice * item.Quantity;
    }
    return total;
  }, 0);

  if (loading) return <div className="text-center p-8 text-white">Đang tải giỏ hàng...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 text-white">
      {cartItems.length === 0 ? (
        <p className="text-gray-400">Giỏ hàng trống</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.CartItemId} className="mb-4">
              <CartItem
                item={item}
                formatCurrency={formatCurrency}
                onDelete={handleDelete}
                onSelectChange={handleSelectChange}
                isSelected={!!selectedItems[item.CartItemId]}
              />
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold text-yellow-400 mb-4">
              Tổng tiền các sản phẩm được chọn: {formatCurrency(totalSelectedAmount)}
            </p>
            <button
              className={styles.checkoutButton}
              disabled={totalSelectedAmount === 0}
              onClick={handleCheckout}
            >
              Mua hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
