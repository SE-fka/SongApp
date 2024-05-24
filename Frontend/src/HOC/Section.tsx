import React from 'react';

const section = (props: { id: string | undefined; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
  return <section id={props.id}>{props.children}</section>;
};

export default section;
