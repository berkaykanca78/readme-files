export type ChaosZone = 'left' | 'right';

export interface ChaosSticker {
  id: string;
  src: string;
  alt: string;
  zone: ChaosZone;
  topPercent: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
}

type ChaosStickerBase = Omit<ChaosSticker, 'delay' | 'duration' | 'driftX' | 'driftY'>;

const DRIFT_PRESETS: ReadonlyArray<[delay: number, duration: number, driftX: number, driftY: number]> = [
  [0, 5.2, 12, 14],
  [0.8, 4.8, 10, 12],
  [1.4, 5, 14, 10],
  [0.4, 4.6, 11, 13],
  [1.1, 5.4, 9, 15],
  [0.6, 4.4, 13, 11],
];

const BASE_STICKERS: ChaosStickerBase[] = [
  {
    id: 'recep-dans',
    src: '/images/chaos/recep-dans.gif',
    alt: 'Recep İvedik dans ediyor',
    zone: 'left',
    topPercent: 2,
  },
  {
    id: 'gibi-yilmaz-kollar',
    src: '/images/chaos/gibi-yilmaz-kollar.gif',
    alt: 'Gibi Yılmaz kollarını açıyor',
    zone: 'left',
    topPercent: 13,
  },
  {
    id: 'ensarix-komik',
    src: '/images/chaos/ensarix-komik.gif',
    alt: 'Ablacığım abiciğim ne anlatıyon',
    zone: 'left',
    topPercent: 24,
  },
  {
    id: 'gibi-nasip-olmuyor',
    src: '/images/chaos/gibi-nasip-olmuyor.gif',
    alt: 'Bize hiçbir şey nasip olmuyor ya',
    zone: 'left',
    topPercent: 35,
  },
  {
    id: 'gora-joe-biden',
    src: '/images/chaos/gora-joe-biden.gif',
    alt: 'Gora Joe Biden thank you',
    zone: 'left',
    topPercent: 46,
  },
  {
    id: 'erdal-kos',
    src: '/images/chaos/erdal-kos.gif',
    alt: 'Erdal Bakkal koşuyor',
    zone: 'left',
    topPercent: 57,
  },
  {
    id: 'gibi-ilkkan-sasirdin',
    src: '/images/chaos/gibi-ilkkan-sasirdin.gif',
    alt: 'Sen iyice şaşırdın',
    zone: 'left',
    topPercent: 68,
  },
  {
    id: 'maskeli-besler-tezcan',
    src: '/images/chaos/maskeli-besler-tezcan.gif',
    alt: 'İsim vererek konuşuyorsun Tezcan',
    zone: 'left',
    topPercent: 79,
  },
  {
    id: 'ahanda-iste-orda',
    src: '/images/chaos/ahanda-iste-orda.gif',
    alt: 'Ahanda işte orada',
    zone: 'left',
    topPercent: 90,
  },
  {
    id: '4380',
    src: '/images/chaos/4380.gif',
    alt: '4380',
    zone: 'right',
    topPercent: 2,
  },
  {
    id: 'avrupa-yakasi-cikolata',
    src: '/images/chaos/avrupa-yakasi-cikolata.gif',
    alt: 'Çikolata yemeliyim',
    zone: 'right',
    topPercent: 13,
  },
  {
    id: 'prens-alkis',
    src: '/images/chaos/prens-alkis.gif',
    alt: 'Prens Giray alkış',
    zone: 'right',
    topPercent: 24,
  },
  {
    id: 'kadikoy-bogasi',
    src: '/images/chaos/kadikoy-bogasi.gif',
    alt: 'Kadıköy Boğası',
    zone: 'right',
    topPercent: 35,
  },
  {
    id: 'behzat-sacma-sapan',
    src: '/images/chaos/behzat-sacma-sapan.gif',
    alt: 'Saçma sapan konuşma la',
    zone: 'right',
    topPercent: 46,
  },
  {
    id: 'kolpacino',
    src: '/images/chaos/kolpacino.gif',
    alt: 'Kolpaçino',
    zone: 'right',
    topPercent: 57,
  },
  {
    id: 'genis-aile-tipe-bak',
    src: '/images/chaos/genis-aile-tipe-bak.gif',
    alt: 'Geniş Aile tipe bak',
    zone: 'right',
    topPercent: 68,
  },
  {
    id: 'ottoman-fighters',
    src: '/images/chaos/ottoman-fighters.gif',
    alt: 'Ottoman Fighters',
    zone: 'right',
    topPercent: 79,
  },
  {
    id: 'kandirali-ferdi',
    src: '/images/chaos/kandirali-ferdi.gif',
    alt: 'Kandıralı Ferdi',
    zone: 'right',
    topPercent: 90,
  },
];

export const CHAOS_STICKERS: ChaosSticker[] = BASE_STICKERS.map((sticker, index) => {
  const [delay, duration, driftX, driftY] = DRIFT_PRESETS[index % DRIFT_PRESETS.length];
  return { ...sticker, delay, duration, driftX, driftY };
});
