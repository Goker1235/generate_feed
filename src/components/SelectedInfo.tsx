interface Item {
  name: string;
  selector: string;
  tag?: string;
}

export const SelectedInfo = ({ items }: { items: Item[] }) => {
  if (!items.length) return null;

  return (
    <div style={{ marginTop: 20 }}>
      <strong>Выбранные элементы:</strong>

      <ul style={{ marginTop: 10 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            <strong>{item.name}</strong> → {item.selector}
          </li>
        ))}
      </ul>
    </div>
  );
};