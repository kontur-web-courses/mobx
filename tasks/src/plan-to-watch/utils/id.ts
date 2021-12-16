const maxId = Math.floor(Number.MAX_SAFE_INTEGER / 2);
const stepSize = Math.floor(Number.MAX_SAFE_INTEGER / 8);
let id = Math.floor(Math.random() * maxId);

export const generateId = () => {
  id += Math.floor(stepSize * Math.random()) + 1;
  id = id % maxId;
  return id.toString(28).slice(0, 12).padStart(12, "0");
};
