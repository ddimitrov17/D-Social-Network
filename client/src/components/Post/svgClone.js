import React from 'react';

export const cloneWithProps = (element, props) => {
  return React.cloneElement(element, props);
};