import type { Active } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface StatsTableProps {
  data: Active["attributes"];
  topHeadings: string[];
}

export function StatsTable({ data, topHeadings }: StatsTableProps) {
  return (
    <Table containerClassName="border rounded-lg">
      <TableBody>
        <TableRow>
          <FirstColumnHead paddingClassName="px-4">Level</FirstColumnHead>
          {topHeadings.map((heading, i) => (
            <TableHead key={i} className={cn("border-l", headColorClassName)}>
              {heading}
            </TableHead>
          ))}
        </TableRow>

        {data.map(({ label, params }) => {
          return (
            <TableRow key={label}>
              <FirstColumnHead paddingClassName="p-4">{label}</FirstColumnHead>
              {params.map((param, i) => (
                <TableCell key={i} className="min-w-[7rem] border-l">
                  {param}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const headColorClassName = "bg-muted dark:bg-background";

interface StatsHeadProps {
  className?: string;
  paddingClassName?: string;
  children: React.ReactNode;
}

function FirstColumnHead({
  className,
  paddingClassName,
  children,
}: StatsHeadProps) {
  return (
    <TableHead
      className={cn(
        "sticky left-0 w-36 p-0 sm:w-40",
        headColorClassName,
        className,
      )}
    >
      <div className={cn("w-36 sm:w-40", paddingClassName)}>{children}</div>
    </TableHead>
  );
}
