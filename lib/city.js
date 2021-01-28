export const hasProfile = ({ intro_long, chapter_1, chapter_2, chapter_3, chapter_4 }) => {
  return [intro_long, chapter_1, chapter_2, chapter_3, chapter_4].reduce((acc, chapter) => {
    if (chapter && chapter.length > 0) {
      return true;
    }

    return acc;
  }, false);
};
