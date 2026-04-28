import { useRef } from 'react';

export default function Checkout({ cartItems }) {
  const promoRef = useRef(null); // Ref usage
  return (
    <div>
      <h2>Your Cart</h2>
      {/* Keys usage */}
      {cartItems.map((item, index) => (
        <div key={index}>{item.name} - ${item.price}</div>
      ))}
      <form onSubmit={(e) => { e.preventDefault(); alert(promoRef.current.value); }}>
        <input ref={promoRef} type="text" placeholder="Promo code" />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}
