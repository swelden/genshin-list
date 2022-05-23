import useRange from "../../hooks/useRange";
import { Props } from "../../pages/[name]";
import { imageUrl } from "../../utils/urls";
import { ItemCard } from "../Card";
import StatsTable from "../StatsTable";
import Section from "./Section";

type Ascension = Pick<Props, "ascensions">;

const AscensionSection: React.FC<Ascension> = ({ ascensions }) => {
  console.log(ascensions);
  return (
    <Section title="Ascensions" className="overflow-hidden">
      <StatsTable
        data={ascensions.stats.data}
        numCols={ascensions.stats.headings.length}
        topHeadings={ascensions.stats.headings}
      />
      <AscensionCalculator
        costs={ascensions.costs}
        icons={ascensions.materialIcons}
      />
    </Section>
  );
};

const AscensionCalculator: React.FC<{
  costs: Ascension["ascensions"]["costs"];
  icons: Ascension["ascensions"]["materialIcons"];
}> = ({ costs, icons }) => {
  const {
    start,
    decrementStart,
    incrementStart,
    end,
    decrementEnd,
    incrementEnd,
    // reset,
  } = useRange(0, 6);

  const totalMaterials = calculateAscensionRange(costs, start, end);
  console.log(totalMaterials);
  return (
    <div className="flex flex-col">
      <h3>Material Calculator</h3>
      <div className="flex items-center gap-4 text-gold">
        <h4>Start {start}</h4>
        <button className="p-2" onClick={decrementStart}>
          -
        </button>
        <button className="p-2" onClick={incrementStart}>
          +
        </button>
      </div>
      <div className="flex items-center gap-4 text-gold">
        <h4>End {end}</h4>
        <button className="p-2" onClick={decrementEnd}>
          -
        </button>
        <button className="p-2" onClick={incrementEnd}>
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-6">
        {Object.entries(totalMaterials)
          .sort((a, b) => icons[a[0]].sortorder - icons[b[0]].sortorder)
          .map(([material, count]) => {
            return (
              <div
                className="flex w-[92px] flex-col  items-center gap-2"
                key={material}
              >
                <ItemCard
                  label={count.toLocaleString()}
                  imgSrc={imageUrl(icons[material].nameicon)}
                />
                <span className="text-center text-xs">{material}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const calculateAscensionRange = (
  costs: Ascension["ascensions"]["costs"],
  start: number, // min of 0
  end: number // max of 6 (max is len of array (not max index))
) => {
  const materials: { [key: string]: number } = {};
  // console.log(`${start} - ${end}`);
  // console.log(Object.entries(costs).slice(start, end));

  for (const [_key, value] of Object.entries(costs).slice(start, end)) {
    for (const { name, count } of value) {
      if (materials.hasOwnProperty(name)) {
        materials[name] += count;
      } else {
        materials[name] = count;
      }
    }
  }

  return materials;
};

export default AscensionSection;
