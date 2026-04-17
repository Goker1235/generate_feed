interface Props {
  html: string | null;
  error: string | null;
}

export const PreviewFrame = ({ html, error }: Props) => {
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!html) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        height: "500px",
        overflow: "auto",
      }}
    >
      <iframe
        srcDoc={html}
        style={{ width: "100%", height: "100%" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};