export type VisaStatus = 'visa_free' | 'visa_on_arrival' | 'e_visa' | 'visa_required' | 'no_admission';

export interface Country {
  code: string;
  slug: string;
  name_tr: string;
  name_en: string;
  continent: string;
  continent_tr: string;
  visa_status: VisaStatus;
  visa_status_tr: string;
  max_stay_days: number | null;
  visa_fee_usd: number | null;
  processing_days: number | null;
  visa_type_details: string;
  notes_tr: string;
  official_embassy_url: string;
  application_url: string;
  currency: string;
  currency_symbol: string;
  capital_tr: string;
  population: number;
  language_tr: string;
  flag_emoji: string;
  flag_url: string;
  advisory_level: number;
  advisory_text_tr: string;
  covid_restrictions: boolean;
  henley_rank: number;
  popular: boolean;
  last_verified: string;
}

export interface PassportData {
  last_updated: string;
  source: string;
  turkish_passport: {
    rank_henley: number;
    rank_passport_index: number;
    visa_free_count: number;
    visa_on_arrival_count: number;
    e_visa_count: number;
    visa_required_count: number;
    total_destinations: number;
  };
  countries: Country[];
}

export const VISA_STATUS_CONFIG: Record<VisaStatus, {
  label_tr: string;
  color: string;
  bg_color: string;
  icon: string;
  priority: number;
  description_tr: string;
}> = {
  visa_free: {
    label_tr: 'Vizesiz',
    color: 'green',
    bg_color: 'visa-free-bg',
    icon: '✓',
    priority: 1,
    description_tr: 'Vize almadan giriş yapılabilir'
  },
  visa_on_arrival: {
    label_tr: 'Kapıda Vize',
    color: 'amber',
    bg_color: 'visa-on-arrival-bg',
    icon: '◉',
    priority: 2,
    description_tr: 'Havalimanında vize alınabilir'
  },
  e_visa: {
    label_tr: 'E-Vize',
    color: 'blue',
    bg_color: 'e-visa-bg',
    icon: '⬡',
    priority: 3,
    description_tr: 'Seyahatten önce online vize alınmalı'
  },
  visa_required: {
    label_tr: 'Vize Gerekli',
    color: 'red',
    bg_color: 'visa-required-bg',
    icon: '✗',
    priority: 4,
    description_tr: 'Büyükelçilik veya konsolosluğa başvuru gerekli'
  },
  no_admission: {
    label_tr: 'Giriş Yasak',
    color: 'gray',
    bg_color: 'no-admission-bg',
    icon: '⛔',
    priority: 5,
    description_tr: 'Giriş yapılamaz'
  }
};

export function getVisaStatusCounts(countries: Country[]) {
  return {
    visa_free: countries.filter(c => c.visa_status === 'visa_free').length,
    visa_on_arrival: countries.filter(c => c.visa_status === 'visa_on_arrival').length,
    e_visa: countries.filter(c => c.visa_status === 'e_visa').length,
    visa_required: countries.filter(c => c.visa_status === 'visa_required').length,
    no_admission: countries.filter(c => c.visa_status === 'no_admission').length,
  };
}

export function sortCountries(countries: Country[], sortBy: 'name' | 'status' | 'stay') {
  return [...countries].sort((a, b) => {
    if (sortBy === 'status') {
      return VISA_STATUS_CONFIG[a.visa_status].priority - VISA_STATUS_CONFIG[b.visa_status].priority;
    }
    if (sortBy === 'stay') {
      const aDays = a.max_stay_days ?? 0;
      const bDays = b.max_stay_days ?? 0;
      return bDays - aDays;
    }
    return a.name_tr.localeCompare(b.name_tr, 'tr');
  });
}

export function filterByContinent(countries: Country[], continent: string) {
  if (continent === 'all') return countries;
  return countries.filter(c => c.continent === continent);
}

export function filterByVisaStatus(countries: Country[], status: string) {
  if (status === 'all') return countries;
  return countries.filter(c => c.visa_status === status);
}

export function searchCountries(countries: Country[], query: string) {
  if (!query) return countries;
  const q = query.toLowerCase();
  return countries.filter(c =>
    c.name_tr.toLowerCase().includes(q) ||
    c.name_en.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q)
  );
}

export function calculateSchengenDays(entries: Array<{entry: string, exit: string}>) {
  const today = new Date();
  const windowStart = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);

  let daysUsed = 0;
  for (const entry of entries) {
    const entryDate = new Date(entry.entry);
    const exitDate = new Date(entry.exit);
    const periodStart = entryDate > windowStart ? entryDate : windowStart;
    const periodEnd = exitDate < today ? exitDate : today;
    if (periodStart < periodEnd) {
      daysUsed += Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  return {
    daysUsed,
    daysRemaining: Math.max(0, 90 - daysUsed),
    isOverLimit: daysUsed > 90
  };
}

export function getContinentEmoji(continent: string): string {
  const map: Record<string, string> = {
    europe: '🌍',
    asia: '🌏',
    africa: '🌍',
    americas: '🌎',
    oceania: '🌏',
    all: '🌐'
  };
  return map[continent] || '🌐';
}
