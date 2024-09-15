type Key = 'name' | 'value';

export function headerObjectToRecord(items: Array<Record<Key, string>>): Record<string, string> {
  return items.reduce(
    (acc, header) => {
      if (header.name && header.value) {
        return { ...acc, [header.name]: header.value };
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
