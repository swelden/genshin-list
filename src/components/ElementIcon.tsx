import Image from "next/image";

const ElementIcon: React.FC<{ element: string; twH: string; twW: string }> = ({
  element,
  twH,
  twW,
}) => {
  return (
    <div className={`relative aspect-square ${twH} ${twW}`}>
      <Image
        src={`/element-icons/${element}-icon.png`}
        alt={`${element} icon`}
        layout="fill"
        unoptimized={true}
      />
    </div>
  );
};

export default ElementIcon;
