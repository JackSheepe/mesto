export function renderLoading({ submitBtn }, isLoading) {
  const intialText = submitBtn.textContent;
  if (isLoading) {
    submitBtn.textContent = "Сохранение...";
  } else {
    submitBtn.textContent = intialText;
  }
}
