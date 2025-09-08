const arrayConverter = <T, K>(
  array: T[],
  callback: (item: T, index: number) => K,
): K[] => {
	const arrayLength = array?.length || 0;
  const convertedArray: K[] = new Array(arrayLength);
  for (let i = 0; i < arrayLength; ++i) {
    convertedArray[i] = callback(array[i], i);
  }

  return convertedArray;
};

export default arrayConverter;
