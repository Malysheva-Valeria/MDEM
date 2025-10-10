import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-card shadow-card p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-error/10 p-3">
                  <AlertTriangle className="w-8 h-8 text-error" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Щось пішло не так
              </h2>

              <p className="text-gray-600 mb-6">
                Вибачте за незручності. Сталася помилка при завантаженні сторінки.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                  <p className="text-xs font-mono text-gray-700 whitespace-pre-wrap break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Спробувати знову
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="btn btn-secondary"
                >
                  На головну
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;