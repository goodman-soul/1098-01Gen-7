import type { PetType, PetSize, DietHabit, LivingSpace, ProductCategory } from '../types';

export const petTypeOptions: { value: PetType; label: string; icon: string }[] = [
  { value: 'cat', label: '猫咪', icon: 'Cat' },
  { value: 'dog', label: '狗狗', icon: 'Dog' },
];

export const petSizeOptions: { value: PetSize; label: string; desc: string }[] = [
  { value: 'small', label: '小型 (<5kg)', desc: '如吉娃娃、泰迪、英短' },
  { value: 'medium', label: '中型 (5-20kg)', desc: '如柯基、柴犬、布偶' },
  { value: 'large', label: '大型 (>20kg)', desc: '如金毛、阿拉斯加' },
];

export const dietHabitOptions: { value: DietHabit; label: string; desc: string }[] = [
  { value: 'regular', label: '规律饮食', desc: '定时定量进食' },
  { value: 'frequent', label: '多餐少食', desc: '幼宠/孕期推荐' },
  { value: 'diet', label: '控制饮食', desc: '减重/慢食需求' },
];

export const livingSpaceOptions: { value: LivingSpace; label: string; desc: string }[] = [
  { value: 'studio', label: '单间/公寓', desc: '<50㎡' },
  { value: 'apartment', label: '标准住宅', desc: '50-120㎡' },
  { value: 'house', label: '别墅/大平层', desc: '>120㎡' },
];

export const categoryOptions: { value: ProductCategory; label: string; icon: string }[] = [
  { value: 'feeder', label: '自动喂食器', icon: 'UtensilsCrossed' },
  { value: 'water', label: '智能饮水机', icon: 'Droplets' },
  { value: 'camera', label: '宠物摄像头', icon: 'Camera' },
];
