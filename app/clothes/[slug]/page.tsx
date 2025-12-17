import ClothId from "@/app/_components/ClothId/ClothId";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <ClothId slug={slug} bg="" />
    </div>
  );
}
