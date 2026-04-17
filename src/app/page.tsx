"use client";

import { Controls } from "@/components/Controls";
import { HighlightBox } from "@/components/HighlightBox";
import { PreviewFrame } from "@/components/PreviewFrame";
import { SelectedInfo } from "@/components/SelectedInfo";
import { UrlPreview } from "@/components/UrlPreview";
import { useElementPicker } from "@/hooks/useElementPicker";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [pendingElement, setPendingElement] = useState<any>(null);
  const [name, setName] = useState("");

  const handleOpenSite = (url: string) => {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    window.open(url, "_blank");
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/selector");
        const data = await res.json();

        if (data?.selector) { 
          setPendingElement(data);
        }
      } catch (e) {}
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <UrlPreview onOpen={handleOpenSite} loading={false} />

      {pendingElement && (
        <div style={{ marginTop: 20 }}>
          <div>
            <strong>Выбран элемент:</strong> {pendingElement.selector}
          </div>

          <input
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={() => {
              setItems((prev) => [
                ...prev,
                {
                  name,
                  selector: pendingElement.selector,
                },
              ]);

              setName("");
              setPendingElement(null);
            }}
          >
            Сохранить
          </button>
        </div>
      )}

      <SelectedInfo items={items} />
    </main>
  );
}