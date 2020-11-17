import { SkyrimBot } from '../client';

export default interface Event {
	eventName: string;
	handler(this: SkyrimBot, ...any: any): Promise<void> | void;
}
