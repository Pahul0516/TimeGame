# TimeGame

A small learning project built to practice React refs, effects, and portals through a game that tests your sense of time.

## About the app

The Almost Final Countdown challenges players to stop a hidden timer just before it expires. There are four difficulty levels with targets of 1, 5, 10, and 15 seconds. Players can set their name, start a challenge, and count in their head before pressing Stop.

Stopping closer to the target earns a higher score, calculated as the percentage of the target duration that has elapsed and rounded to a whole number. Reaching or passing the deadline scores zero. A result dialog shows the score and remaining time, and each challenge keeps its best score for the current session. Players can dismiss the dialog with Play again or Escape and try again. Refreshing the page resets the player name and scores.

## Technical overview

Built with React 19, JavaScript (JSX), CSS, and Vite. The interface uses separate components for the player form, reusable timer challenges, and result dialogs. Each challenge manages its own state, allowing the same component to support different target times through props.

The app runs entirely in the browser, without a backend or database. Timing uses browser APIs, and scoring is kept separate from the interface so it can be tested independently. Result dialogs use the native HTML dialog element and render through a React portal into a dedicated container outside the main app root.

## What I learned

- Using `useState` for information that changes the interface, such as the player name, running status, results, and best scores.
- Using `useRef` to keep timer handles and start timestamps between renders without triggering a new render, and to access input and dialog elements directly.
- Understanding the difference between state and refs, including when an uncontrolled input is useful for reading a value on form submission.
- Reusing components with props and passing callback functions so a child component can notify its parent when a dialog closes.
- Using `useEffect` to synchronize a native dialog with React and clean up pending timers when a component unmounts.
- Rendering dialogs with `createPortal` while keeping them part of the React component tree.
- Working with `setTimeout`, `clearTimeout`, and `performance.now()` to measure elapsed time rather than relying only on when a timeout callback runs.
- Rendering content conditionally and using functional state updates when the next best score depends on the previous value.
- Improving accessibility with input labels, dialog headings connected through `useId`, status announcements, keyboard focus styles, and reduced-motion support.
- Building responsive layouts with CSS, checking scoring boundaries with Node's built-in test runner, and using ESLint to catch code issues.
- Creating a production build with Vite and hosting a static React app on Vercel.

## Hosting

Play the app here: [TimeGame](https://time-game-puce.vercel.app).

The app is hosted on Vercel.
