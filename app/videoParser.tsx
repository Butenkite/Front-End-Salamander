export function videoParser(videos) {
  return videos.map((item, index) => ({
    id: index + 1,
    name: typeof item === 'string' ? item : item.name ?? "",
  }));
}