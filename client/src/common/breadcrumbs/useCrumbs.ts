export const useCrumbs = (
  pathMap: Map<string, string>,
  ignoreCount: number = 1
): [string[], Map<string, string>] => {
  const res: string[] = [];
  const newPaths = new Map();
  for (let entry of pathMap) {
    const [path, name] = entry;
    const remainingPathItems = path
      .split("/")
      .filter((x) => x)
      .slice(ignoreCount);

    res[remainingPathItems.length - 1] = name;
    newPaths.set(name, path);
  }
  return [res, newPaths];
};
