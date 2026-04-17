chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "ELEMENT_SELECTED") {
    console.log("FROM CONTENT:", message.payload);

    // отправка в твой Next.js
    fetch("http://localhost:3000/api/selector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message.payload)
    });
  }
});