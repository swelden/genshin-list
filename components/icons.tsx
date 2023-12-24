import { cn } from "@/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  close: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  ),
  genshinclose: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        d="M3.821 4.022c0-.11.09-.2.2-.2h2.65a.2.2 0 01.142.341l-.594.595a.2.2 0 000 .282l3.64 3.64a.2.2 0 00.282 0l3.64-3.64a.2.2 0 000-.282l-.595-.595a.2.2 0 01.142-.341h2.65c.11 0 .2.09.2.2v2.65a.2.2 0 01-.341.141l-.595-.594a.2.2 0 00-.283 0l-3.64 3.64a.2.2 0 000 .283l3.64 3.64a.2.2 0 00.283 0l.595-.595a.2.2 0 01.341.141v2.65a.2.2 0 01-.2.2h-2.65a.2.2 0 01-.141-.34l.594-.595a.2.2 0 000-.283l-3.64-3.64a.2.2 0 00-.283 0l-3.64 3.64a.2.2 0 000 .283l.595.594a.2.2 0 01-.141.342h-2.65a.2.2 0 01-.2-.2v-2.65a.2.2 0 01.34-.142l.595.594a.2.2 0 00.283 0l3.64-3.64a.2.2 0 000-.282l-3.64-3.64a.2.2 0 00-.283 0l-.594.594a.2.2 0 01-.342-.141v-2.65z"
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  ),
  dropdown: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M20 8H4L12 16L20 8Z" fill="currentColor" />
    </svg>
  ),
  filter: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("-scale-x-100", className)}
      {...props}
    >
      <path
        d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  ),
  reverse: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("-scale-x-100", className)}
      {...props}
    >
      <path
        d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
        strokeWidth={1.5}
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  ),
  rightarrow: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M21 12L14 3V7.99L3 8V16H14V21L21 12Z" fill="currentColor" />
    </svg>
  ),
  ascensionstar: (props: IconProps) => (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.0621 4.53451C11.3843 3.66389 12.6157 3.66389 12.9379 4.53451L14.5413 8.86785C14.6426 9.14157 14.8584 9.35738 15.1321 9.45867L19.4655 11.0621C20.3361 11.3843 20.3361 12.6157 19.4655 12.9379L15.1321 14.5413C14.8584 14.6426 14.6426 14.8584 14.5413 15.1321L12.9379 19.4655C12.6157 20.3361 11.3843 20.3361 11.0621 19.4655L9.45867 15.1321C9.35738 14.8584 9.14157 14.6426 8.86785 14.5413L4.53451 12.9379C3.66389 12.6157 3.66389 11.3843 4.53451 11.0621L8.86785 9.45867C9.14157 9.35738 9.35738 9.14157 9.45867 8.86785L11.0621 4.53451Z"
        fill="currentColor"
      />
    </svg>
  ),
} as const;

export function formatAscension(label: string, className?: string) {
  return (
    <>
      {label}
      <Icons.ascensionstar className={cn("ml-1 h-5 w-5", className)} />
    </>
  );
}
