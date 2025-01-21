import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/contact-us')({
  component: () => {
    const [formIsDirty, setFromIsDirty] = useState(false);

    useBlocker({
      shouldBlockFn: () => {
        if (!formIsDirty) return false

        const shouldLeave = confirm('Are you sure you want to leave?')
        return !shouldLeave
      },
    });

    return (
      <>
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
      </>
    );
  },
});
