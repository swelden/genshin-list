import Image from "next/image";

const IconImage: React.FC<{
  src: string;
  twH: string;
  twW: string;
  alt: string;
  className?: string;
  unoptimized?: boolean;
  invert?: boolean;
}> = ({
  src,
  twH,
  twW,
  alt,
  className = "",
  unoptimized = true,
  invert = false,
}) => {
  return (
    <div
      className={`relative flex aspect-square items-center justify-center ${twH} ${twW} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        unoptimized={unoptimized}
        className={invert ? "invert dark:filter-none" : undefined}
      />
    </div>
  );
};

export default IconImage;
