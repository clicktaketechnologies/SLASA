import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let isFirebaseError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            errorMessage = `Firebase Error: ${parsed.error} during ${parsed.operationType} on ${parsed.path}`;
            isFirebaseError = true;
          }
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-8 text-center border border-slate-100">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Oops! Something went wrong</h2>
            <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left">
              <p className="text-sm text-slate-600 font-mono break-words">
                {errorMessage}
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Reload Application</span>
            </button>
            {isFirebaseError && (
              <p className="mt-4 text-xs text-slate-400">
                This error has been logged for our developers to investigate.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
