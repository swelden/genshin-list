import Image from "next/image";

import { cn } from "@/lib/utils";

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
        unoptimized
        className={cn(invert && "invert dark:filter-none", imageClassName)}
      />
    </div>
  );
};

export { IconImage };
