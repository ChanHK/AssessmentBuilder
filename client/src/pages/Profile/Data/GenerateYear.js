export function GenerateYear() {
  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  const res = years.map((data) => {
    return { value: data, key:data };
  });

  return res;
}
