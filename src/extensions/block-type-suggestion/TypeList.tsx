import { SuggestionProps } from "@tiptap/suggestion";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const TypeList = forwardRef<unknown, SuggestionProps>((props, ref) => {
  const [selectedType, setSelectedType] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedType(
      (selectedType + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedType((selectedType + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedType);
  };

  useEffect(() => setSelectedType(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent<HTMLDivElement> }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="items">
      {props.items.length > 0 ? (
        props.items.map((item, index) => (
          <button
            className={`item ${index === selectedType ? "is-selected" : ""}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});

TypeList.displayName = "SuggestionList";

export { TypeList };
