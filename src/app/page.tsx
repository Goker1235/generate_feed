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
  const [urlInput, setUrlInput] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [result, setResult] = useState<any[]>([]);
  

const handleOpenSite = () => {
  if (!urlInput.trim()) {
    alert("Введите URL");
    return;
  }

  let url = urlInput;

  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  setCurrentUrl(url);

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

  const mapItemsToSelectors = (items: any[]) => {
    const result: any = {};

    items.forEach((item) => {
      result[item.name] = item.selector;
    });

    return result;
  };
  

  return (
    <main style={{ padding: 40 }}>
      <UrlPreview
        url={urlInput}
        setUrl={setUrlInput}
        onOpen={handleOpenSite}
        loading={false}
      />
      <button
        onClick={async () => {
          if (!currentUrl) {
            alert("Сначала открой сайт");
            return;
          }

          const selectors = mapItemsToSelectors(items);

          if (!selectors.container) {
            selectors.container = "body";
          }

          console.log("SEND URL:", currentUrl);
          console.log("SELECTORS:", selectors);

          const res = await fetch("/api/parse-playwright", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: currentUrl,
              selectors,
            }),
          });

          if (!res.ok) {
            const err = await res.text();
            console.error("SERVER ERROR:", err);
            return;
          }

          const data = await res.json();
          console.log("PARSED:", data);
          setResult(data);
        }}
      >
        Парсить
      </button>

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

      {result.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Результат:</h3>

          {result.map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value as string}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <SelectedInfo items={items} />
    </main>
  );
}
