import { motion } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export interface BurdenItem {
  id: string;
  text: string;
  category: 'within' | 'influence' | 'outside';
  createdAt: string;
}

interface BurdenCardProps {
  item: BurdenItem;
  onMoveCategory: (id: string, category: BurdenItem['category']) => void;
  onReleaseBurden: (id: string) => void;
}

export function BurdenCard({ item, onMoveCategory, onReleaseBurden }: BurdenCardProps) {
  let borderColor = '';
  
  if (item.category === 'within') borderColor = 'border-[#A7F3D0]';
  else if (item.category === 'influence') borderColor = 'border-[#FDE68A]';
  else if (item.category === 'outside') borderColor = 'border-[#CBD5E1]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`bg-white p-3 rounded-lg border ${borderColor} shadow-2xs text-xs text-[#1E293B] flex flex-col gap-2 justify-between`}
    >
      <p className="leading-relaxed font-medium">{item.text}</p>
      <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px] text-[#64748B]">
        
        {item.category === 'within' && (
          <>
            <button
              onClick={() => onMoveCategory(item.id, 'influence')}
              className="hover:text-[#B45309] transition-colors"
            >
              Bicarakan →
            </button>
            <button
              onClick={() => onReleaseBurden(item.id)}
              className="text-[#4A6B5D] hover:text-[#3D584C] font-medium transition-colors"
              title="Selesai"
            >
              <CheckCircle2 size={14} />
            </button>
          </>
        )}

        {item.category === 'influence' && (
          <>
            <button
              onClick={() => onMoveCategory(item.id, 'within')}
              className="hover:text-[#047857] transition-colors"
            >
              ← Lakukan Skrg
            </button>
            <button
              onClick={() => onMoveCategory(item.id, 'outside')}
              className="hover:text-[#475569] transition-colors"
            >
              Luar Kendali →
            </button>
          </>
        )}

        {item.category === 'outside' && (
          <>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onMoveCategory(item.id, 'within')}
                className="hover:text-[#047857] transition-colors"
              >
                ← Lakukan Skrg
              </button>
              <span>•</span>
              <button
                onClick={() => onMoveCategory(item.id, 'influence')}
                className="hover:text-[#B45309] transition-colors"
              >
                ← Bicarakan
              </button>
            </div>
            <button
              onClick={() => onReleaseBurden(item.id)}
              className="text-[#C86D51] hover:text-[#B75D45] font-semibold transition-colors flex items-center gap-1"
              title="Lepaskan"
            >
              <Sparkles size={12} />
              <span>Lepaskan</span>
            </button>
          </>
        )}

      </div>
    </motion.div>
  );
}
