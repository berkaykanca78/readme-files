const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

const URL_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
  /(?:youtube\.com\/embed\/)([\w-]{11})/,
  /(?:youtu\.be\/)([\w-]{11})/,
  /(?:youtube\.com\/shorts\/)([\w-]{11})/,
];

export function extractYoutubeVideoId(url: string): string | null {
  for (const pattern of URL_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1] && YOUTUBE_ID_PATTERN.test(match[1])) {
      return match[1];
    }
  }
  return null;
}

/** YouTube'un kendi oynatıcı önizlemesi — thumbnail + tıklayınca oynat */
export function youtubeEmbedHtml(videoId: string, title = 'YouTube video'): string {
  return `<div class="yt-embed">
  <iframe
    src="https://www.youtube.com/embed/${videoId}"
    title="${title}"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>`;
}
