interface Props {
  url: string;
  setUrl: (v: string) => void;
  onOpen: () => void;
  loading: boolean;
}

export const UrlPreview = ({ url, setUrl, onOpen, loading }: Props) => {
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
      <button onClick={onOpen} disabled={loading}>
        {loading ? "Opening..." : "Open site"}
      </button>
    </div>
  );
};