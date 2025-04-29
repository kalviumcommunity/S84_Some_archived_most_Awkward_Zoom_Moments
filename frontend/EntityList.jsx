import React from 'react';

const EntityList = ({ entities }) => (
  <ul>
    {entities.map(entity => (
      <li key={entity.id}>
        <strong>{entity.title}</strong> - {entity.description}
      </li>
    ))}
  </ul>
);

export default EntityList;
