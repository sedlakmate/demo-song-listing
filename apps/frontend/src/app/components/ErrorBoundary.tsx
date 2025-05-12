'use client';

import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    message: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-error text-error-content fixed bottom-4 left-4 z-50 max-w-xs rounded-xl p-4 shadow-lg">
          <strong className="mb-1 block font-semibold">Something went wrong</strong>
          <p className="text-sm whitespace-pre-line">{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
