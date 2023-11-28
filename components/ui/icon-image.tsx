import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  invert?: boolean;
}

const IconImage = ({
  src,
  alt,
  className,
  imageClassName,
  invert = false,
}: IconImageProps) => {
  return (
    <div className={cn("relative block", className)}>
      <Image
        alt={alt}
        src={src}
        fill
        unoptimized={true}
        className={cn(invert && "invert dark:filter-none", imageClassName)}
      />
    </div>
  );
};

export { IconImage };
