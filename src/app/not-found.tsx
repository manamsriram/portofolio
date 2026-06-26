import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-bg text-text-primary font-ui flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="bg-surface border border-surface-lighter rounded-lg overflow-hidden">
          <div className="bg-surface-light px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs text-text-secondary font-mono-display">404</span>
          </div>
          <div className="p-8 font-mono-display">
            <div className="text-terminal-green text-sm mb-2">$ find /page</div>
            <div className="text-red-400 text-sm mb-6">Error: No such file or directory</div>
            <div className="text-6xl font-bold text-electric-cyan mb-4">404</div>
            <p className="text-text-secondary mb-8">Page not found.</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 border border-electric-cyan text-electric-cyan rounded-lg hover:bg-electric-cyan hover:text-deep-bg transition-colors text-sm"
            >
              cd ~/ → go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
