import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ item }) =>
<div className="QuestionItem">Question {item.sequence}: {item.text}</div>
);

export default SortableItem;