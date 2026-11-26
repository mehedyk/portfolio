import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; label?: string }
interface State { failed: boolean }

/** Catches render errors so one broken widget doesn't blank the whole page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.label ?? 'app'}]`, error, info.componentStack);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    if (this.props.fallback !== undefined) return this.props.fallback;
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="font-heading text-2xl">Something broke on my end.</p>
        <button className="rounded-md border border-primary px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground" onClick={() => window.location.reload()}>
          Reload the page
        </button>
      </div>
    );
  }
}
