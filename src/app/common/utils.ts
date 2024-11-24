/**
 * Finds and returns an item of an array by id
 * @param {*[]} items - List of items
 * @param {string} id - Current item id
 */
export const findItemById = <T extends { id: string }>(items: T[], id: string): T | undefined => {
	return items.find(item => item?.id === id);
};
