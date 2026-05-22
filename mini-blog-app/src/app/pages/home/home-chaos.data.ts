export type ChaosZone = 'left' | 'right';

export interface ChaosSticker {
  id: string;
  src: string;
  alt: string;
  zone: ChaosZone;
  width: number;
  rotate: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

export const HERO_CHAOS_STICKERS: ChaosSticker[] = [
  {
    id: 'recep-dans',
    src: '/images/chaos/recep-dans.gif',
    alt: 'Recep İvedik dans ediyor',
    zone: 'left',
    width: 122,
    rotate: -4,
    delay: 0,
    duration: 5.2,
    driftX: 10,
    driftY: 12,
  },
  {
    id: 'ensarix-komik',
    src: '/images/chaos/ensarix-komik.gif',
    alt: 'EnsariX komik meme',
    zone: 'left',
    width: 124,
    rotate: 3,
    delay: 1.2,
    duration: 4.8,
    driftX: 8,
    driftY: 10,
  },
  {
    id: '4380',
    src: '/images/chaos/4380.gif',
    alt: '4380 hatası',
    zone: 'right',
    width: 118,
    rotate: 4,
    delay: 0.6,
    duration: 4.6,
    driftX: 9,
    driftY: 11,
  },
  {
    id: 'kadikoy-bogasi',
    src: '/images/chaos/kadikoy-bogasi.gif',
    alt: 'Kadıköy Boğası',
    zone: 'right',
    width: 120,
    rotate: -3,
    delay: 1.5,
    duration: 5,
    driftX: 7,
    driftY: 9,
  },
  {
    id: 'erdal-kos',
    src: '/images/chaos/erdal-kos.gif',
    alt: 'Erdal Bakkal koşuyor',
    zone: 'left',
    width: 120,
    rotate: 5,
    delay: 0.4,
    duration: 4.4,
    driftX: 12,
    driftY: 8,
  },
  {
    id: 'kandirali-ferdi',
    src: '/images/chaos/kandirali-ferdi.gif',
    alt: 'Kandıralı Ferdi',
    zone: 'right',
    width: 116,
    rotate: -3,
    delay: 0.9,
    duration: 5.4,
    driftX: 11,
    driftY: 10,
  },
];
