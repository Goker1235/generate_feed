interface Props {
  isActive: boolean;
  toggle: () => void;
  onParse: () => void;
  onDownload: () => void;
}

export const Controls = ({
  isActive,
  toggle,
  onParse,
  onDownload,
}: Props) => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <button onClick={toggle}>
        {isActive ? "Отменить выбор" : "Выбрать элемент"}
      </button>

      <button onClick={onDownload}>Скачать фид</button>
      <button onClick={onParse}>Парсинг</button>
    </div>
  );
};