import { Link } from 'react-router-dom';
import { UtensilsCrossed, Droplets, Camera } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const categoryIcons = {
  feeder: UtensilsCrossed,
  water: Droplets,
  camera: Camera,
};

const categoryLabels = {
  feeder: '喂食器',
  water: '饮水机',
  camera: '摄像头',
};

const categoryBadgeColors = {
  feeder: 'bg-orange-100 text-orange-600',
  water: 'bg-blue-100 text-blue-600',
  camera: 'bg-purple-100 text-purple-600',
};

export default function ProductCard({ product }: ProductCardProps) {
  const CategoryIcon = categoryIcons[product.category];

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl overflow-hidden',
        'shadow-sm hover:shadow-xl transition-all duration-300',
        'hover:-translate-y-1 hover:scale-[1.02]'
      )}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div
          className={cn(
            'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center',
            categoryBadgeColors[product.category]
          )}
          title={categoryLabels[product.category]}
        >
          <CategoryIcon className="w-5 h-5" />
        </div>
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded-md">
            省¥{product.originalPrice - product.price}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-base font-semibold text-dark line-clamp-2 min-h-[3.5rem] leading-snug">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-secondary/10 text-secondary font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold text-primary">
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ¥{product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
