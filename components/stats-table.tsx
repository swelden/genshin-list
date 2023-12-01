import { cn } from "@/lib/utils";

interface StatsTableProps {
  data: { label: string; params: string[] }[];
  topHeadings: string[];
  numCols: number;
}

export function StatsTable({ data, topHeadings, numCols }: StatsTableProps) {
  return (
    <div
      className={cn(
        "mt-4 w-full overflow-x-auto rounded-lg border",
        sharedBorderClasses,
      )}
    >
      <div
        className={cn("overflow-hidden", numCols === 1 ? "w-auto" : "w-max")}
      >
        <table className="w-full text-left text-sm">
          <tbody>
            <TableRow heading="Level">
              {topHeadings.map((heading, i) => (
                // TODO: add class to change width of top row heading
                <TableHeading key={i}>{heading}</TableHeading>
              ))}
            </TableRow>
            {data.map(({ label, params }) => {
              return (
                <TableRow heading={label} key={label}>
                  {params.map((param, i) => (
                    <TableCell key={i}>{param}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const sharedBorderClasses = "border-black/10 dark:border-white/10";
const sharedCellClasses = "border-r p-3 last:border-r-0";

interface TableRowProps {
  heading: string;
  children: React.ReactNode;
}

function TableRow({ heading, children }: TableRowProps) {
  return (
    <tr className={cn("border-b last:border-0", sharedBorderClasses)}>
      <TableHeading>{heading}</TableHeading>
      {children}
    </tr>
  );
}

interface TableHeadingProps {
  children: React.ReactNode;
}

function TableHeading({ children }: TableHeadingProps) {
  return (
    <th
      className={cn(
        "w-36 bg-zinc-100 font-normal text-black/50 dark:bg-zinc-900/50 dark:text-white/30",
        sharedBorderClasses,
        sharedCellClasses,
      )}
    >
      {children}
    </th>
  );
}

interface TableCellProps {
  children: React.ReactNode;
}

function TableCell({ children }: TableCellProps) {
  return (
    <td
      className={cn(
        "min-w-[7rem] text-black/90 last:border-r-0 dark:text-white/90",
        sharedBorderClasses,
        sharedCellClasses,
      )}
    >
      {children}
    </td>
  );
}
