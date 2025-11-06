export default function ClothId({
  slug,
  bg,
}: {
  slug: string;
  bg: string;
}) {
  return <div className={bg}>This is the cloth id page: {slug}</div>;
}
