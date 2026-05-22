import { Injectable } from '@angular/core';
import { marked } from 'marked';

import {
  extractYoutubeVideoId,
  youtubeEmbedHtml,
} from '../utils/youtube.util';

const YOUTUBE_LINE =
  /^\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]+(?:&[^\s]*)?|youtu\.be\/[\w-]+(?:\?[^\s]*)?|youtube\.com\/embed\/[\w-]+|youtube\.com\/shorts\/[\w-]+))\s*$/gm;

const YOUTUBE_TOKEN = /\[\[youtube:([\w-]{11})\]\]/g;

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  constructor() {
    marked.setOptions({
      gfm: true,
      breaks: false,
    });
  }

  parse(markdown: string): string {
    const prepared = this.preprocessYoutubeLines(
      this.preprocessYoutubeInCodeBlocks(markdown),
    );
    const html = marked.parse(prepared, { async: false }) as string;
    return this.wrapTables(this.embedYoutube(html));
  }

  /** Blog yazısı — manifest başlığı zaten var, markdown'daki ilk h1 atılır */
  parseArticle(markdown: string): string {
    const html = this.parse(markdown);
    return html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, '');
  }

  /** ``` içindeki tek satırlık YouTube URL'lerini düz linke çevirir */
  private preprocessYoutubeInCodeBlocks(markdown: string): string {
    return markdown.replace(
      /```[^\n]*\n\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]+(?:&[^\s]*)?|youtu\.be\/[\w-]+(?:\?[^\s]*)?|youtube\.com\/embed\/[\w-]+|youtube\.com\/shorts\/[\w-]+))\s*\n```/gm,
      (_, url: string) => url.trim(),
    );
  }

  private wrapTables(html: string): string {
    return html.replace(/<table>/g, '<div class="md-table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  }

  /** Tek satırlık YouTube URL'lerini embed token'a çevirir */
  private preprocessYoutubeLines(markdown: string): string {
    return markdown.replace(YOUTUBE_LINE, (url) => {
      const id = extractYoutubeVideoId(url.trim());
      return id ? `[[youtube:${id}]]` : url;
    });
  }

  private embedYoutube(html: string): string {
    let result = html.replace(
      /<p>\[\[youtube:([\w-]{11})\]\]<\/p>/g,
      (_, id: string) => youtubeEmbedHtml(id),
    );

    result = result.replace(YOUTUBE_TOKEN, (_, id: string) => youtubeEmbedHtml(id));

    result = result.replace(
      /<p><a href="(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]+(?:&amp;[^"]*)?|youtu\.be\/[\w-]+|youtube\.com\/embed\/[\w-]+))"[^>]*>\1<\/a><\/p>/g,
      (_, url: string) => {
        const decoded = url.replace(/&amp;/g, '&');
        const id = extractYoutubeVideoId(decoded);
        return id ? youtubeEmbedHtml(id) : `<p><a href="${url}">${url}</a></p>`;
      },
    );

    result = result.replace(
      /<pre><code(?: class="[^"]*")?>\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w_-]+(?:&amp;[^\s<]*)?|youtu\.be\/[\w_-]+|youtube\.com\/embed\/[\w_-]+|youtube\.com\/shorts\/[\w_-]+))\s*<\/code><\/pre>/g,
      (_, url: string) => {
        const decoded = url.replace(/&amp;/g, '&').trim();
        const id = extractYoutubeVideoId(decoded);
        return id ? youtubeEmbedHtml(id) : `<pre><code>${url}</code></pre>`;
      },
    );

    return result;
  }
}
