import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement these browser APIs that our components touch.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false, media: query, onchange: null,
    addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false,
  }),
});
class NoopObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
(globalThis as unknown as Record<string, unknown>).IntersectionObserver = NoopObserver;
(globalThis as unknown as Record<string, unknown>).ResizeObserver = NoopObserver;
Element.prototype.scrollIntoView = () => {};
