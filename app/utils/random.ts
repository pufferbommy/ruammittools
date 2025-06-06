export const randomInRange = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickRandomItem = <T>(items: T[]): T => {
	const index = randomInRange(0, items.length - 1);
	return items[index];
};
