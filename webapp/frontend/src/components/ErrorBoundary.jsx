import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      hasError: true
    });

    // Report error to monitoring service if available
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🛠️ Something went wrong</h2>
            <p>We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.</p>
            
            {this.props.showDetails && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={this.handleRetry}
                disabled={this.state.retryCount >= 3}
              >
                {this.state.retryCount >= 3 ? 'Too many retries' : 'Try Again'}
              </button>
              
              <button 
                className="refresh-button"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
            
            <p className="error-retry-count">
              Retry attempts: {this.state.retryCount}/3
            </p>
          </div>
          
          <style jsx>{`
            .error-boundary {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 400px;
              padding: 2rem;
              background: var(--ff9-bg-card);
              border-radius: 12px;
              border: 2px solid var(--ff9-crystal-red);
              box-shadow: 0 4px 15px rgba(239, 83, 80, 0.3);
            }
            
            .error-container {
              text-align: center;
              max-width: 600px;
              color: var(--ff9-text-primary);
              font-family: var(--ff9-font-body);
            }
            
            .error-container h2 {
              color: var(--ff9-crystal-red);
              font-family: var(--ff9-font-title);
              text-shadow: 0 0 10px rgba(239, 83, 80, 0.5);
              margin-bottom: 1rem;
            }
            
            .error-container p {
              margin: 1rem 0;
              line-height: 1.6;
            }
            
            .error-details {
              margin: 1.5rem 0;
              text-align: left;
            }
            
            .error-details summary {
              cursor: pointer;
              font-weight: bold;
              color: var(--ff9-text-gold);
              margin-bottom: 0.5rem;
            }
            
            .error-stack {
              background: var(--ff9-bg-accent);
              padding: 1rem;
              border-radius: 8px;
              border: 1px solid var(--ff9-border-primary);
              font-size: 0.9rem;
              white-space: pre-wrap;
              overflow-x: auto;
              max-height: 200px;
              overflow-y: auto;
            }
            
            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              margin: 1.5rem 0;
            }
            
            .retry-button,
            .refresh-button {
              background: var(--ff9-bg-accent);
              color: var(--ff9-text-primary);
              border: 2px solid var(--ff9-border-primary);
              padding: 0.8rem 1.5rem;
              border-radius: 8px;
              cursor: pointer;
              font-weight: bold;
              transition: all 0.3s ease;
              font-family: var(--ff9-font-title);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .retry-button:hover:not(:disabled),
            .refresh-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 15px var(--ff9-shadow-crystal);
              background: var(--ff9-crystal-blue);
              color: white;
            }
            
            .retry-button:disabled {
              opacity: 0.5;
              cursor: not-allowed;
              background: var(--ff9-crystal-red);
              color: white;
            }
            
            .refresh-button {
              background: var(--ff9-crystal-green);
              border-color: var(--ff9-crystal-green);
              color: white;
            }
            
            .error-retry-count {
              font-size: 0.9rem;
              color: var(--ff9-text-secondary);
              margin-top: 1rem;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;