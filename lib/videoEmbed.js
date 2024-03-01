export function getVideoEmbedUrl(dirtyUrl) {
  if (!dirtyUrl) return '';

  const vimeo = /vimeo.*\/(\d+)/i.exec(dirtyUrl);
  if (vimeo && vimeo[1]) {
    return `https://player.vimeo.com/video/${vimeo[1]}?dnt=1`;
  }

  const youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const matchesYouTube = dirtyUrl.match(youtube);

  if (matchesYouTube && matchesYouTube[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${matchesYouTube[2]}`;
  }

  return dirtyUrl;
}
