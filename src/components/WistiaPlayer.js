"use client";

export default function WistiaPlayer({
  mediaId = "zq1batjfoj",
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[20px]"
      style={{ paddingBottom: "177.78%", height: 0 }}
    >
      <iframe
        src={`https://fast.wistia.net/embed/iframe/${mediaId}`}
        title="Wistia Video"
        allow="autoplay; fullscreen"
        allowTransparency="true"
        frameBorder="0"
        scrolling="no"
        className="absolute inset-0 h-full w-full border-0"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
