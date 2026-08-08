export function LocationMap({
  mapQuery,
  businessName,
}: {
  mapQuery: string;
  businessName: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <div className="border border-border aspect-[4/3] w-full overflow-hidden">
      <iframe
        src={src}
        title={`Map showing the location of ${businessName}`}
        loading="lazy"
        className="w-full h-full grayscale-[15%]"
      />
    </div>
  );
}
