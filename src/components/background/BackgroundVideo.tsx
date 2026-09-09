interface BackgroundVideoProps {
  isDark: boolean;
}

const LIGHT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_103318_2aa26b55-df1a-43a6-903d-941e718c9366.mp4";

const DARK_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4";

function BackgroundVideo({ isDark }: BackgroundVideoProps) {
  const videoUrl = isDark ? DARK_VIDEO : LIGHT_VIDEO;

  return (
    <video
      key={videoUrl}
      src={videoUrl}
      autoPlay
      muted
      loop
      playsInline
      className="fixed inset-0 -z-10 h-full w-full object-cover"
    />
  );
}

export default BackgroundVideo;