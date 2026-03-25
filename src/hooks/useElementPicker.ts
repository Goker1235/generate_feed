"use client";

import { useEffect, useState } from "react";
import { SelectedElementInfo } from "@/types/picker";

export const useElementPicker = () => {
  const [isActive, setIsActive] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [hoverClass, setHoverClass] = useState<string>("");
  const [selected, setSelected] = useState<SelectedElementInfo | null>(null);
  const [parsingConfig, setParsingConfig] = useState<{
    container?: string;
    title?: string;
    price?: string;
    image?: string;
  }>({});

  useEffect(() => {
    if (!isActive) return;

    const getSelector = (el: HTMLElement): string => {
      if (el.id) return `#${el.id}`;
      const path: string[] = [];
      while (el.parentElement) {
        let selector = el.tagName.toLowerCase();
        if (el.className) {
          const classes = el.className.split(" ").filter(Boolean).join(".");
          selector += `.${classes}`;
        }
        path.unshift(selector);
        el = el.parentElement;
      }
      return path.join(" > ");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      setRect(target.getBoundingClientRect());
      setHoverClass(target.className || "-");
    };

    const handleClick = (
      e: MouseEvent,
      type?: "container" | "title" | "price" | "image",
    ) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const selector = getSelector(target);

      setSelected({
        tag: target.tagName.toLowerCase(),
        className: target.className || "-",
        id: target.id || "-",
        selector,
      });

      // Если указан тип (title, price, image), сохраняем в parsingConfig
      if (type) {
        setParsingConfig((prev) => ({ ...prev, [type]: selector }));
      }

      setIsActive(false);
      setRect(null);
      setHoverClass("");
    };

    document.body.style.cursor = "crosshair";

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isActive]);

return {
  isActive,
  setIsActive,
  rect,
  hoverClass,
  selected,
  parsingConfig,
  setParsingConfig, // чтобы можно было обновлять вручную из компонента
};
};
