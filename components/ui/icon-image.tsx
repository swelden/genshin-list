import Image from "next/image";

import type { LocalImageFolderFiles } from "@/data/types";
import { cn, formatImageUrl, formatLocalImageUrl } from "@/lib/utils";

type IconImageProps = {
  alt: string;
  className?: string;
  imageClassName?: string;
  invert?: boolean;
} & (
  | {
      [Folder in keyof LocalImageFolderFiles]: {
        folder: Folder;
        src: LocalImageFolderFiles[Folder];
      };
    }[keyof LocalImageFolderFiles]
  | {
      folder?: undefined;
      src: string;
    }
);

function IconImage({
  folder,
  src,
  alt,
  className,
  imageClassName,
  invert = false,
}: IconImageProps) {
  const formattedSrc = folder
    ? formatLocalImageUrl(folder, src)
    : formatImageUrl(src);

  return (
    <div className={cn("relative block", className)}>
      <Image
        alt={alt}
        src={formattedSrc}
        fill
        unoptimized // https://vercel.com/docs/image-optimization/limits-and-pricing
        className={cn(invert && "invert dark:filter-none", imageClassName)}
      />
    </div>
  );
}

export { IconImage };
