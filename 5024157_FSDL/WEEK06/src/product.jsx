export default function Product({ item, onAdd }) {
  return (
    <div className="product-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <button onClick={() => onAdd(item)}>Add to Cart</button>
    </div>
  );
}
