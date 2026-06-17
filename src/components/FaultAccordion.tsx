import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FaultItem, Severity } from '@/types';
import { cn } from '@/lib/utils';

interface FaultAccordionProps {
  faults: FaultItem[];
}

const severityConfig: Record<Severity, { label: string; badgeClass: string }> = {
  low: {
    label: '轻微',
    badgeClass: 'bg-green-100 text-green-700 border-green-200',
  },
  medium: {
    label: '中等',
    badgeClass: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  high: {
    label: '严重',
    badgeClass: 'bg-red-100 text-red-700 border-red-200',
  },
};

export default function FaultAccordion({ faults }: FaultAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faults.map((fault) => {
        const isOpen = openId === fault.id;
        const severity = severityConfig[fault.severity];

        return (
          <div
            key={fault.id}
            className={cn(
              'bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300',
              isOpen ? 'shadow-md' : 'shadow-sm hover:shadow-md'
            )}
          >
            <button
              onClick={() => toggle(fault.id)}
              className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  'shrink-0 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border',
                  severity.badgeClass
                )}
              >
                {severity.label}
              </span>
              <span className="flex-1 text-base font-medium text-dark">
                {fault.title}
              </span>
              <div className="shrink-0 text-dark/50">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-[2000px]' : 'max-h-0'
              )}
            >
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-gray-100">
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-dark mb-3">
                    排查步骤
                  </h4>
                  <ol className="space-y-3">
                    {fault.steps.map((step) => (
                      <li key={step.step} className="flex gap-3">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-medium">
                          {step.step}
                        </div>
                        <p className="pt-0.5 text-sm text-dark/80 leading-relaxed">
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
