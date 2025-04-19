import React from 'react';

export const LoadingSpinner = () => (
  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
);

export const LoadingSpinnerBig = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000000]">
        <div className="flex space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full bg-blue-800 animate-bounce`}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.2s'
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  export const LoadingSpinnerForChat = () => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-800 animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.2s' }}></div>
        <div className="w-4 h-4 rounded-full bg-blue-800 animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '1.2s' }}></div>
        <div className="w-4 h-4 rounded-full bg-blue-800 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }}></div>
      </div>
    );
  };