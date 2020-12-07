import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items, selectQuestion }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <div key={`item-${index}`} onClick={() => selectQuestion(index)}>
          <SortableItem key={`item-${index}`} index={index} item={item} />
        </div>
      ))}
    </ul>
  );
});

export default SortableList;
