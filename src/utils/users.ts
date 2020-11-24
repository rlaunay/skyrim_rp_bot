export const isUserMention = (mention: string) => {
	return mention.startsWith('<@') && mention.endsWith('>');
};
