import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cat,
  Dog,
  Ruler,
  UtensilsCrossed,
  Home,
  Check,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import {
  petTypeOptions,
  petSizeOptions,
  dietHabitOptions,
  livingSpaceOptions,
} from '@/data/filterConfig';
import type { PetType, PetSize, DietHabit, LivingSpace } from '@/types';
import { cn } from '@/lib/utils';

interface SelectedFilters {
  petType?: PetType;
  petSize?: PetSize;
  dietHabit?: DietHabit;
  livingSpace?: LivingSpace;
}

const stepTitles = [
  '您的宠物是？',
  '宠物体型',
  '饮食习惯',
  '居住空间',
  '筛选完成',
];

const stepDescriptions = [
  '选择您的宠物类型，我们将为您推荐最合适的产品',
  '根据宠物体型推荐合适容量和尺寸',
  '根据饮食习惯推荐喂食方案',
  '根据居住空间推荐合适产品',
  '已为您匹配最佳产品组合',
];

export default function SmartFilter() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<SelectedFilters>({});

  const stepIcons = [Cat, Ruler, UtensilsCrossed, Home];

  const progress = (step / 4) * 100;

  const handleSelect = <K extends keyof SelectedFilters>(
    key: K,
    value: SelectedFilters[K]
  ) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleViewResults = () => {
    const params = new URLSearchParams();
    if (selected.petType) params.append('petType', selected.petType);
    if (selected.petSize) params.append('petSize', selected.petSize);
    if (selected.dietHabit) params.append('dietHabit', selected.dietHabit);
    if (selected.livingSpace) params.append('livingSpace', selected.livingSpace);

    const queryString = params.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return !!selected.petType;
      case 1:
        return !!selected.petSize;
      case 2:
        return !!selected.dietHabit;
      case 3:
        return !!selected.livingSpace;
      default:
        return true;
    }
  };

  const renderPetTypeStep = () => (
    <div className="grid grid-cols-2 gap-4">
      {petTypeOptions.map((option) => {
        const Icon = option.value === 'cat' ? Cat : Dog;
        const isSelected = selected.petType === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleSelect('petType', option.value)}
            className={cn(
              'flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300',
              'hover:shadow-lg hover:-translate-y-1',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 bg-white'
            )}
          >
            <div
              className={cn(
                'w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors',
                isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              <Icon className="w-10 h-10" />
            </div>
            <span
              className={cn(
                'text-lg font-semibold',
                isSelected ? 'text-primary' : 'text-dark'
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  const renderOptionCards = <T extends string>(
    options: { value: T; label: string; desc: string }[],
    key: keyof SelectedFilters,
    IconComponent: React.ComponentType<{ className?: string }>
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map((option) => {
        const isSelected = selected[key] === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleSelect(key, option.value as SelectedFilters[typeof key])}
            className={cn(
              'flex flex-col items-start p-5 rounded-2xl border-2 text-left transition-all duration-300 relative',
              'hover:shadow-lg hover:-translate-y-1',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 bg-white'
            )}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors',
                isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              )}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <span
              className={cn(
                'text-base font-semibold mb-1',
                isSelected ? 'text-primary' : 'text-dark'
              )}
            >
              {option.label}
            </span>
            <span className="text-sm text-gray-500">{option.desc}</span>
          </button>
        );
      })}
    </div>
  );

  const renderCompleteStep = () => (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Check className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-dark mb-2">筛选完成！</h3>
      <p className="text-gray-500 mb-6">根据您的选择，我们为您匹配了最合适的产品</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
        {selected.petType && (
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">宠物类型</div>
            <div className="text-sm font-medium text-dark">
              {petTypeOptions.find((o) => o.value === selected.petType)?.label}
            </div>
          </div>
        )}
        {selected.petSize && (
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">宠物体型</div>
            <div className="text-sm font-medium text-dark">
              {petSizeOptions.find((o) => o.value === selected.petSize)?.label}
            </div>
          </div>
        )}
        {selected.dietHabit && (
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">饮食习惯</div>
            <div className="text-sm font-medium text-dark">
              {dietHabitOptions.find((o) => o.value === selected.dietHabit)?.label}
            </div>
          </div>
        )}
        {selected.livingSpace && (
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-xs text-gray-500 mb-1">居住空间</div>
            <div className="text-sm font-medium text-dark">
              {livingSpaceOptions.find((o) => o.value === selected.livingSpace)?.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderPetTypeStep();
      case 1:
        return renderOptionCards(petSizeOptions, 'petSize', Ruler);
      case 2:
        return renderOptionCards(dietHabitOptions, 'dietHabit', UtensilsCrossed);
      case 3:
        return renderOptionCards(livingSpaceOptions, 'livingSpace', Home);
      case 4:
        return renderCompleteStep();
      default:
        return null;
    }
  };

  const StepIcon = stepIcons[Math.min(step, 3)];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <StepIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark">{stepTitles[step]}</h2>
              <p className="text-sm text-gray-500">{stepDescriptions[step]}</p>
            </div>
          </div>

          <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>步骤 {step + 1} / 5</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="mb-8">{renderStepContent()}</div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
              step === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            上一步
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                'btn-primary flex items-center gap-2',
                !canProceed() && 'opacity-50 cursor-not-allowed'
              )}
            >
              下一步
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleViewResults} className="btn-primary flex items-center gap-2">
              查看推荐产品
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
