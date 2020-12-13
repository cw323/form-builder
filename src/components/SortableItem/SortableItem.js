import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import s from './SortableItem.module.css';

const SortableItem = SortableElement(({ item }) =>
  <div className={s.questionItem}>Question {item.sequence}: {item.text}</div>
);

export default SortableItem;
