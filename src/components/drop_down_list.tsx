import React from "react";
import "../scss/drop-down-list.scss";

type DropDownListProps<ElementType> = {
  /**
   * List to show
   */
  list: ElementType[];
  /**
   * Optional function to convert the stuffs to the html
   */
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
    <select onChange={onChange} value={value}>
      {list.map(
        converter ??
          ((v, i) => {
            return (
              <option key={"key-" + i} value={v as unknown as string}>
                {v as unknown as string}
              </option>
            );
          })
      )}
    </select>
  );
}
