import { useState } from 'react';

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      aria-label="Share recipe"
      onClick={handleClick}
      className="w-full rounded-[10px] border-[1.5px] border-border px-4 py-3 font-sans text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
    >
      {copied ? 'Copied!' : 'Share Recipe'}
    </button>
  );
}
