let current = null;

document.addEventListener("mouseover", (e) => {
  const el = e.target;

  if (current) current.style.outline = "";

  el.style.outline = "2px solid red";
  current = el;
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const el = e.target;

  const selector = getSelector(el);

  console.log("Selected:", selector);

  // отправляем в extension
  chrome.runtime.sendMessage({
    type: "ELEMENT_SELECTED",
    payload: {
      selector,
      tag: el.tagName,
      className: el.className,
      id: el.id
    }
  });
});

function getSelector(el) {
  if (el.id) return "#" + el.id;

  if (el.className) {
    return (
      el.tagName.toLowerCase() +
      "." +
      el.className.toString().replace(/\s+/g, ".")
    );
  }

  return el.tagName.toLowerCase();
}