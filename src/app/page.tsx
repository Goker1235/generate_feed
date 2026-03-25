"use client";

import { useElementPicker } from "@/hooks/useElementPicker";
import { HighlightBox } from "@/components/HighlightBox";

export default function Home() {
  const { isActive, setIsActive, rect, hoverClass, selected } =
    useElementPicker();

  const handleDownloadFeed = async () => {
    const res = await fetch("/api/feed");
    if (!res.ok) {
      alert("Ошибка при генерации фида");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feed.xml";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <main style={{ padding: 40 }}>
      <button
        onClick={() => setIsActive(!isActive)}
        style={{ padding: "10px 16px", fontSize: 16, cursor: "pointer" }}
      >
        {isActive ? "Отменить выбор" : "Выбрать элемент"}
      </button>

      <div style={{ marginTop: 40, border: "1px solid #ccc", padding: 20 }}>
        <h2 className="title">Заголовок блока</h2>
        <p className="description">
          Демонстрационный текст для тестирования наведения.
        </p>

        <div
          className="card product-card"
          style={{ padding: 20, marginTop: 15, background: "#f5f5f5" }}
        >
          <span className="product-title text-black">Название товара</span>
          <p className="product-price text-black">Цена: 1999₽</p>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        {selected && (
          <div>
            <strong>Выбранный элемент:</strong>
            <div>tag: {selected.tag}</div>
            <div>class: {selected.className}</div>
            <div>id: {selected.id}</div>
          </div>
        )}
      </div>

      <HighlightBox rect={rect} className={hoverClass} />
      <button
        onClick={handleDownloadFeed}
        style={{
          padding: "10px 16px",
          fontSize: 16,
          cursor: "pointer",
          marginLeft: 16,
        }}
      >
        Скачать фид
      </button>
    </main>
  );
}
