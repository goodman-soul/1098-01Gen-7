import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  PackageSearch,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterPanel from '@/components/FilterPanel';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import type { FilterOptions, PetType, PetSize, DietHabit, LivingSpace, ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest';

interface FiltersWithPrice extends FilterOptions {
  priceRange?: [number, number];
}

const defaultFilters: FiltersWithPrice = {
  petType: undefined,
  petSize: undefined,
  dietHabit: undefined,
  livingSpace: undefined,
  category: undefined,
  priceRange: [0, 3000],
};

export default function Products() {
  const [searchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const getInitialFilters = (): FiltersWithPrice => {
    const filters: FiltersWithPrice = { ...defaultFilters };

    const petType = searchParams.get('petType') as PetType;
    const petSize = searchParams.get('petSize') as PetSize;
    const dietHabit = searchParams.get('dietHabit') as DietHabit;
    const livingSpace = searchParams.get('livingSpace') as LivingSpace;
    const category = searchParams.get('category') as ProductCategory;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (petType && ['cat', 'dog'].includes(petType)) filters.petType = petType;
    if (petSize && ['small', 'medium', 'large'].includes(petSize)) filters.petSize = petSize;
    if (dietHabit && ['regular', 'frequent', 'diet'].includes(dietHabit)) filters.dietHabit = dietHabit;
    if (livingSpace && ['apartment', 'house', 'studio'].includes(livingSpace)) filters.livingSpace = livingSpace;
    if (category && ['feeder', 'water', 'camera'].includes(category)) filters.category = category;
    if (minPrice || maxPrice) {
      filters.priceRange = [
        minPrice ? Number(minPrice) : 0,
        maxPrice ? Number(maxPrice) : 3000,
      ];
    }

    return filters;
  };

  const [filters, setFilters] = useState<FiltersWithPrice>(getInitialFilters);

  const handleFilterChange = (newFilters: FiltersWithPrice) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setShowMobileFilter(false);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.petType) {
      result = result.filter((p) => p.petType.includes(filters.petType!));
    }

    if (filters.petSize) {
      result = result.filter((p) => p.petSize.includes(filters.petSize!));
    }

    if (filters.dietHabit) {
      result = result.filter((p) => p.dietHabit.includes(filters.dietHabit!));
    }

    if (filters.livingSpace) {
      result = result.filter((p) => p.livingSpace.includes(filters.livingSpace!));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: '默认排序' },
    { value: 'price-asc', label: '价格从低到高' },
    { value: 'price-desc', label: '价格从高到低' },
    { value: 'newest', label: '最新上架' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <section className="py-8 max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark/60 mb-8">
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              首页
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-dark font-medium">全部商品</span>
          </nav>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-2">
                全部商品
              </h1>
              <p className="text-dark/60">
                为您的毛孩子挑选最适合的智能宠物用品
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="hidden md:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowMobileFilter(true)}
                    className="md:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-dark font-medium hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    筛选
                  </button>
                  <span className="text-dark/70">
                    找到 <span className="font-semibold text-primary">{filteredProducts.length}</span> 件商品
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white border border-gray-200 text-dark font-medium cursor-pointer hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40 pointer-events-none" />
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <PackageSearch className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">
                    暂无匹配商品
                  </h3>
                  <p className="text-dark/60 mb-6 max-w-sm">
                    抱歉，没有找到符合您筛选条件的商品。试试调整筛选条件，或查看全部商品。
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="btn-primary"
                  >
                    重置筛选条件
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {showMobileFilter && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilter(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto">
              <div className="sticky top-0 bg-background border-b border-gray-100 p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-dark">筛选条件</h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-dark" />
                </button>
              </div>
              <div className="p-4">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
              <div className="sticky bottom-0 bg-background border-t border-gray-100 p-4">
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className={cn(
                    'w-full py-3 rounded-xl font-semibold text-white transition-all duration-300',
                    'gradient-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                  )}
                >
                  查看 {filteredProducts.length} 件商品
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
