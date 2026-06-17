import { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Check,
  UtensilsCrossed,
  Droplets,
  Camera,
  Cat,
  Dog,
  Ruler,
  Home,
} from 'lucide-react';
import type { FilterOptions, ProductCategory, PetType, PetSize, DietHabit, LivingSpace } from '@/types';
import {
  categoryOptions,
  petTypeOptions,
  petSizeOptions,
  dietHabitOptions,
  livingSpaceOptions,
} from '@/data/filterConfig';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: FilterOptions & { priceRange?: [number, number] };
  onFilterChange: (filters: FilterOptions & { priceRange?: [number, number] }) => void;
  onReset: () => void;
}

interface SectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, icon: Icon, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-semibold text-dark">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-400 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, onFilterChange, onReset }: FilterPanelProps) {
  const handleCategoryChange = (category: ProductCategory) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handlePetTypeChange = (petType: PetType) => {
    onFilterChange({
      ...filters,
      petType: filters.petType === petType ? undefined : petType,
    });
  };

  const handlePetSizeChange = (petSize: PetSize) => {
    onFilterChange({
      ...filters,
      petSize: filters.petSize === petSize ? undefined : petSize,
    });
  };

  const handleDietHabitChange = (dietHabit: DietHabit) => {
    onFilterChange({
      ...filters,
      dietHabit: filters.dietHabit === dietHabit ? undefined : dietHabit,
    });
  };

  const handleLivingSpaceChange = (livingSpace: LivingSpace) => {
    onFilterChange({
      ...filters,
      livingSpace: filters.livingSpace === livingSpace ? undefined : livingSpace,
    });
  };

  const handlePriceRangeChange = (value: number, index: 0 | 1) => {
    const currentRange = filters.priceRange ?? [0, 3000];
    const newRange: [number, number] = [...currentRange] as [number, number];
    newRange[index] = value;
    if (index === 0 && value > (currentRange[1] ?? 3000)) {
      newRange[1] = value;
    }
    if (index === 1 && value < (currentRange[0] ?? 0)) {
      newRange[0] = value;
    }
    onFilterChange({
      ...filters,
      priceRange: newRange,
    });
  };

  const activeFiltersCount = [
    filters.category,
    filters.petType,
    filters.petSize,
    filters.dietHabit,
    filters.livingSpace,
  ].filter(Boolean).length + (filters.priceRange ? 1 : 0);

  const categoryIcons = {
    feeder: UtensilsCrossed,
    water: Droplets,
    camera: Camera,
  };

  const petTypeIcons = {
    cat: Cat,
    dog: Dog,
  };

  const priceRange = filters.priceRange ?? [0, 3000];

  return (
    <aside className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-dark">筛选条件</h3>
          {activeFiltersCount > 0 && (
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-medium flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
            重置
          </button>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        <FilterSection title="产品分类" icon={UtensilsCrossed}>
          <div className="grid grid-cols-1 gap-2">
            {categoryOptions.map((option) => {
              const Icon = categoryIcons[option.value];
              const isSelected = filters.category === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleCategoryChange(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200',
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="宠物类型" icon={Cat}>
          <div className="grid grid-cols-1 gap-2">
            {petTypeOptions.map((option) => {
              const Icon = petTypeIcons[option.value];
              const isSelected = filters.petType === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handlePetTypeChange(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200',
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="宠物体型" icon={Ruler}>
          <div className="grid grid-cols-1 gap-2">
            {petSizeOptions.map((option) => {
              const isSelected = filters.petSize === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handlePetSizeChange(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left',
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span
                      className={cn(
                        'text-xs mt-0.5',
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      )}
                    >
                      {option.desc}
                    </span>
                  </div>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="饮食习惯" icon={UtensilsCrossed}>
          <div className="grid grid-cols-1 gap-2">
            {dietHabitOptions.map((option) => {
              const isSelected = filters.dietHabit === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleDietHabitChange(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left',
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span
                      className={cn(
                        'text-xs mt-0.5',
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      )}
                    >
                      {option.desc}
                    </span>
                  </div>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="居住空间" icon={Home}>
          <div className="grid grid-cols-1 gap-2">
            {livingSpaceOptions.map((option) => {
              const isSelected = filters.livingSpace === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleLivingSpaceChange(option.value)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left',
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-dark'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span
                      className={cn(
                        'text-xs mt-0.5',
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      )}
                    >
                      {option.desc}
                    </span>
                  </div>
                  {isSelected && <Check className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="价格区间" icon={SlidersHorizontal}>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-primary">¥{priceRange[0]}</span>
              <span className="text-gray-400">—</span>
              <span className="font-semibold text-primary">¥{priceRange[1]}</span>
            </div>

            <div className="relative pt-1">
              <div className="relative h-2 bg-gray-100 rounded-full">
                <div
                  className="absolute h-full bg-primary rounded-full"
                  style={{
                    left: `${(priceRange[0] / 3000) * 100}%`,
                    right: `${100 - (priceRange[1] / 3000) * 100}%`,
                  }}
                />
              </div>
              <div className="relative -mt-6">
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), 0)}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer slider-thumb"
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), 1)}
                  className="absolute w-full appearance-none bg-transparent pointer-events-none cursor-pointer slider-thumb"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>¥0</span>
              <span>¥3000</span>
            </div>
          </div>
        </FilterSection>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={onReset}
          className="w-full mt-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:border-primary hover:text-primary transition-all duration-200"
        >
          重置筛选
        </button>
      )}
    </aside>
  );
}
