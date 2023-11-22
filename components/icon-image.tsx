import { cn } from "@/lib/utils";
import Image from "next/image";

const IconImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  unoptimized?: boolean;
  invert?: boolean;
}> = ({ src, alt, className, unoptimized = true, invert = false }) => {
  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={unoptimized}
        className={cn(invert && "invert dark:filter-none")}
      />
    </div>
  );
};

export default IconImage;
