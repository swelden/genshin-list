import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import Image, { ImageProps } from "next/image";
import * as React from "react";

const cardVariants = cva(
  "relative overflow-hidden rounded-md bg-gradient-to-t from-item via-item shadow-md ring-1 ring-black/10 dark:shadow-zinc-600/50",
  {
    variants: {
      hover: {
        default:
          "outline-none ring-offset-white transition duration-300 ease-in-out hocus:ring-black/20 hocus:ring-offset-[3px] motion-safe:hocus:scale-105",
      },
    },
  },
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = ({ className, hover, asChild = false, ...props }: CardProps) => {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(cardVariants({ hover, className }))} {...props} />;
};
Card.displayName = "Card";

const cardImageVariants = cva(
  "relative flex items-center justify-center overflow-hidden rounded-br-[1.25rem] border-b border-white/20",
  {
    variants: {
      gradient: {
        default: "bg-gradient-to-t from-[#4a5366] to-[#323947]", // item
        purple: "bg-gradient-to-t from-[#9c75b7] to-[#5e5789]", // 4 star
        gold: "bg-gradient-to-t from-[#b27330] to-[#945c2c]", // 5 star
        red: "bg-gradient-to-t from-[#b4455a] to-[#9b3c56]", // collab
      },
    },
  },
);

type CardImageVariantProps = VariantProps<typeof cardImageVariants>;

interface CardImageProps
  extends Omit<ImageProps, "width" | "height">,
    Required<Pick<ImageProps, "width" | "height">>,
    Omit<CardImageVariantProps, "gradient">,
    Required<Pick<CardImageVariantProps, "gradient">> {
  imageClassName?: string;
}

const CardImage = ({
  className,
  imageClassName,
  gradient,
  children,
  ...props
}: CardImageProps) => (
  <div className={cn(cardImageVariants({ gradient, className }))}>
    <Image className={cn(imageClassName)} {...props} />
    {children}
  </div>
);
CardImage.displayName = "CardImage";

const CardLabel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="relative w-full px-2 py-0.5" {...props}>
    <span
      className={cn(
        "relative block w-full truncate text-center capitalize text-item-foreground",
        className,
      )}
    >
      {children}
    </span>
  </div>
);
CardLabel.displayName = "CardLabel";

export { Card, CardImage, CardLabel };
