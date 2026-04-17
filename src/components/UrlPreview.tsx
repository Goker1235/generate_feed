import { useState } from "react";

interface Props {
  onOpen: (url: string) => void;
  loading: boolean;
}

export const UrlPreview = ({ onOpen, loading }: Props) => {
  const [url, setUrl] = useState("");

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="url"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          padding: "8px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button onClick={() => onOpen(url)} disabled={loading}>
        {loading ? "Opening..." : "Open site"}
      </button>
    </div>
  );
};