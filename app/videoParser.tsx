export function videoParser(videos) {
  return videos.map((item, index) => ({
    name: item.name ?? "",
  }));
}