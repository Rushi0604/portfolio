import React from 'react';
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from './cursor';

export const CursorDemoPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-[#0a0e17] flex flex-col items-center justify-center text-slate-100 p-4 font-sans">
      <h1 className="text-xl font-bold mb-6 text-violet-400">Cursor Component Demo</h1>
      
      <div className="max-w-[400px] h-[400px] w-full rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center relative overflow-hidden">
        <p className="font-medium italic text-slate-400 select-none">
          Move your mouse over this area
        </p>
        <CursorProvider>
          <Cursor>
            <svg
              className="w-6 h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
            >
              <path
                fill="currentColor"
                d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
              />
            </svg>
          </Cursor>
          <CursorFollow>
            <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm shadow-lg whitespace-nowrap">
              Designer
            </div>
          </CursorFollow>
        </CursorProvider>
      </div>

      <a href="/" className="mt-8 text-sm text-slate-400 hover:text-slate-200 underline">
        Back to Portfolio
      </a>
    </div>
  );
};

export default CursorDemoPage;
