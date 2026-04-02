import type { Country } from './visaHelpers';

export function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(1)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${(pop / 1_000).toFixed(0)}K`;
  return pop.toString();
}

export function getVisaFeeText(feeUsd: number | null, currency: string, currencySymbol: string): string {
  if (feeUsd === null || feeUsd === 0) return 'Ücretsiz';
  if (currency === 'USD') return `$${feeUsd}`;
  if (currency === 'EUR') return `${currencySymbol}${feeUsd}`;
  return `$${feeUsd} (${currencySymbol}${feeUsd})`;
}

export function getProcessingText(days: number | null): string {
  if (days === null || days === 0) return 'Anında';
  if (days <= 3) return `${days} iş günü`;
  if (days <= 14) return `~${days} iş günü`;
  return `~${Math.round(days / 7)} hafta`;
}

export function getStayText(days: number | null): string {
  if (days === null) return 'Belirtilmemiş';
  if (days === 365) return '365 gün (1 yıl)';
  if (days >= 180) return `${days} gün (6 ay)`;
  if (days >= 90) return `${days} gün (3 ay)`;
  if (days >= 30) return `${days} gün (1 ay)`;
  return `${days} gün`;
}

export function getAdvisoryColor(level: number): string {
  const colors: Record<number, string> = {
    1: 'text-green-600',
    2: 'text-yellow-600',
    3: 'text-orange-600',
    4: 'text-red-600'
  };
  return colors[level] || 'text-gray-600';
}

export function getAdvisoryBg(level: number): string {
  const colors: Record<number, string> = {
    1: 'bg-green-50',
    2: 'bg-yellow-50',
    3: 'bg-orange-50',
    4: 'bg-red-50'
  };
  return colors[level] || 'bg-gray-50';
}

export function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  };
  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getPopularCountries(countries: Country[]): Country[] {
  return countries.filter(c => c.popular).slice(0, 12);
}

export function getCountriesByContinent(countries: Country[], continent: string): Country[] {
  return countries.filter(c => c.continent === continent);
}

export function getRelatedCountries(countries: Country[], currentCountry: Country, limit: number = 4): Country[] {
  return countries
    .filter(c => c.continent === currentCountry.continent && c.code !== currentCountry.code)
    .sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.name_tr.localeCompare(b.name_tr, 'tr');
    })
    .slice(0, limit);
}

export function getContinents(countries: Country[]): Array<{ key: string; label: string; emoji: string; count: number }> {
  const map = new Map<string, number>();
  for (const c of countries) {
    map.set(c.continent, (map.get(c.continent) || 0) + 1);
  }
  const labels: Record<string, { label: string; emoji: string }> = {
    europe: { label: 'Avrupa', emoji: '🌍' },
    asia: { label: 'Asya', emoji: '🌏' },
    africa: { label: 'Afrika', emoji: '🌍' },
    americas: { label: 'Amerika', emoji: '🌎' },
    oceania: { label: 'Okyanusya', emoji: '🌏' }
  };
  return Array.from(map.entries()).map(([key, count]) => ({
    key,
    label: labels[key]?.label || key,
    emoji: labels[key]?.emoji || '🌐',
    count
  })).sort((a, b) => a.label.localeCompare(b.label, 'tr'));
}
