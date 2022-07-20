import React from "react";

type DropDownListProps<ElementType> = {
  list: ElementType[];
  converter?: (v: ElementType) => React.ReactElement<HTMLOptionElement>;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
  value?: string;
};
export default function DropDownList<ElementType>({
  list,
  converter,
  onChange,
  value,
}: DropDownListProps<ElementType>) {
  return (
    <select onChange={onChange}>
      {list.map(
        converter ??
          ((v, i) => {
            return (
              <option
                key={"key-" + i}
                value={v as unknown as string}
                defaultChecked={value === (v as any)}
              >
                {v as unknown as string}
              </option>
            );
          })
      )}
    </select>
  );
}
