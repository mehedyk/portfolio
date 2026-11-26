/** A friendly note for the people who open DevTools. (Kept out of index.html so the CSP can ban inline scripts.) */
export function printGreeting(): void {
  const style = 'color:#c0ff2e;font-size:14px;font-weight:600;';
  console.log('%cHey, curious one 👋', style);
  console.log('I\'m Mehedy — a Software Engineering student. If you found something worth fixing, I\'d genuinely like to hear it: mehedy.netlify.app/#contact');
}
