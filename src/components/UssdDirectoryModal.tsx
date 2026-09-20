import React, { useState } from 'react';
import { X, Search, PhoneCall, ShieldAlert, Copy, Check } from 'lucide-react';
import { NIGERIAN_BANK_USSD_CODES } from '../data/ussdEmergencyCodes';

interface UssdDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UssdDirectoryModal: React.FC<UssdDirectoryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBanks = NIGERIAN_BANK_USSD_CODES.filter((b) =>
    b.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.freezeCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 md:p-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              Emergency Response Directory
            </div>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Nigerian Bank Account & USSD Freeze Codes
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              If your phone or ATM card is stolen, dial your bank's code immediately from ANY phone to lock transactions.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="my-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bank (e.g., Access, GTBank, Zenith, OPay, UBA)..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </div>

        {/* Bank List */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-2.5 divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {filteredBanks.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">
              No matching bank found. Check your bank's customer care helpline.
            </div>
          ) : (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                className="pt-2.5 first:pt-0 flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
              >
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {bank.bankName}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {bank.instructions}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="rounded-lg bg-zinc-100 px-2.5 py-1 font-mono text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {bank.freezeCode}
                  </div>
                  <button
                    onClick={() => handleCopy(bank.id, bank.freezeCode)}
                    className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-200 text-zinc-600 dark:border-zinc-700 dark:hover:bg-zinc-700 dark:text-zinc-300"
                    title="Copy code"
                  >
                    {copiedId === bank.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <a
                    href={`tel:${bank.freezeCode.replace(/#/g, '%23')}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    <PhoneCall className="h-3 w-3" />
                    Dial
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 border-t border-zinc-100 pt-3 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          Tip: Memorize or write down your bank's code in a safe notebook at home. In a snatch emergency, act within 5 minutes.
        </div>
      </div>
    </div>
  );
};
