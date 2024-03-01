import { Block, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/contact-us')({
  component: () => {
    const [formIsDirty, setFromIsDirty] = useState(false);
    return (
      <Block
        blocker={() => {
          return window.confirm('Are you sure you want to leave?');
        }}
        condition={formIsDirty}
      >
        <div>Hello /contact-us with url masking and blocker!</div>
        <button
          onClick={() => {
            setFromIsDirty(prev => {
              return !prev;
            });
          }}
        >
          {formIsDirty ? 'Form is dirty' : 'Form is clean'}
        </button>
      </Block>
    );
  },
});
