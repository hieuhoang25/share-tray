import { getRepos } from '@/server/repositories';
import type { Place, BraveLevel } from '@/types/domain';

export interface RecommendParams {
  level: BraveLevel;
  lat?: number;
  lng?: number;
  foodRules?: string[];
  district?: string;
}

export interface RecommendationResult {
  place: Place;
  dishNameVi: string;
  dishGlossEn: string;
  walkMin: number;
  reasons: string[];
}

export async function recommendNow(params: RecommendParams): Promise<RecommendationResult | null> {
  const repos = getRepos();
  const places = await repos.places.getAll();
  const dishes = await repos.dishes.getAll();

  // Filter published places matching level
  const published = places.filter((p) => p.status === 'published' && p.level === params.level);
  if (published.length === 0) return null;

  const selectedPlace = published[0];
  const dish = dishes.find((d) => d.id === selectedPlace.dish_id) || dishes[0];

  const reasons = [
    `Open and serving right now until ${selectedPlace.open_hours.close}`,
    `${selectedPlace.known_for_en}`,
    selectedPlace.covered_seating
      ? 'Covered indoor seating with reliable ceiling fans'
      : 'Sidewalk dining on authentic low plastic stools',
  ];

  return {
    place: selectedPlace,
    dishNameVi: dish ? dish.name_vi : 'Phở bò',
    dishGlossEn: dish ? dish.gloss_en : 'Aromatic beef noodle soup',
    walkMin: 4,
    reasons,
  };
}

export function buildVendorCard(options: {
  items: { name_vi: string; count: number; price: number }[];
  foodRules?: string[];
  totalVnd: number;
}) {
  const lines = options.items.map((it) => `${it.count} × ${it.name_vi}`);
  let allergyText = '';
  if (options.foodRules && options.foodRules.length > 0) {
    const allergyList: string[] = [];
    if (options.foodRules.includes('no_pork')) allergyList.push('thịt lợn');
    if (options.foodRules.includes('no_peanut')) allergyList.push('lạc');
    if (options.foodRules.includes('vegetarian')) allergyList.push('thịt động vật');
    if (allergyList.length > 0) {
      allergyText = `Cháu không ăn được ${allergyList.join(' và ')}.`;
    }
  }

  return {
    orderHeader: 'Cho cháu:',
    itemsText: lines.join(', '),
    allergyNotice: allergyText,
    totalPrompt: `Tổng ${options.totalVnd.toLocaleString('vi-VN')}₫, đúng không ạ?`,
    vendorButtons: [
      { textVi: 'Đúng rồi', textEn: 'Yes, that is correct!' },
      { textVi: 'Hết món', textEn: 'Sorry, sold out!' },
      { textVi: 'Đợi chút', textEn: 'Please wait a moment!' },
    ],
  };
}
