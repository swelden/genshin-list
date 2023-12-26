import type { Active, Constellation, Passive } from "@/data/types";
import { formatImageUrl } from "@/lib/utils";
import { IconImage } from "@/components/ui/icon-image";

interface SectionRowProps {
  talent: Active | Passive | Constellation;
  children?: React.ReactNode;
}

export function SectionRow({ talent, children }: SectionRowProps) {
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0" key={talent.name}>
      <div className="flex items-center gap-2">
        <IconImage
          src={formatImageUrl(talent.icon)}
          alt={talent.name}
          className="h-12 w-12"
          invert={true}
        />
        <h3 className="text-lg">{talent.name}</h3>
      </div>
      <div
        className="mt-2 text-section-foreground/75"
        dangerouslySetInnerHTML={{
          // talent description is sanitized in backend/markdown
          __html: talent.description,
        }}
      />
      {children}
    </div>
  );
}
