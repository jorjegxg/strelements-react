import { Check, Copy } from "lucide-react";
import { JSX, useRef, useState } from "react";

export default function CopyableInput({ text }: { text: string }): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      // Fallback for older browsers
      inputRef.current?.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInputClick = (): void => {
    inputRef.current?.select();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            readOnly
            onClick={handleInputClick}
            className="w-full px-4 py-3 pr-12  border border-gray-300 rounded-lg text-text-primary cursor-pointer select-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {copied && (
          <div className="text-sm text-green-600 font-medium">
            ✓ Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
