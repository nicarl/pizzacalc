import {
  type DoughType,
  doughPresets,
  doughTypeList,
} from '@/util/dough-presets';

interface DoughTypeSelectorProps {
  selected: DoughType;
  onSelect: (type: DoughType) => void;
}

export function DoughTypeSelector({
  selected,
  onSelect,
}: DoughTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {doughTypeList.map(type => {
        const isSelected = type === selected;
        return (
          <button
            key={type}
            type="button"
            data-selected={isSelected}
            onClick={() => {
              if (!isSelected) onSelect(type);
            }}
            className={`rounded-full border-[1.5px] px-3.5 py-1.5 font-sans text-[13px] transition-colors ${
              isSelected
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-transparent text-text-tertiary hover:border-primary/50'
            }`}
          >
            {doughPresets[type].name}
          </button>
        );
      })}
    </div>
  );
}
