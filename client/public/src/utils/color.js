export const smartColor = (text = "") => {
  const colors = [
    "#E3F2FD", "#FCE4EC", "#E8F5E9",
    "#FFF3E0", "#F3E5F5", "#E0F7FA"
  ];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
