import Event from './../../types/Event';

import { calendar } from './../../services/calendar/calendar';

export const onReady: Event = {
	eventName: 'ready',
	handler() {
		if (this.user) {
			console.log(`Logged in as ${this.user.tag} !`);
			this.user.setActivity(` - ${this.prefix}help`);
			calendar(this);
		} else {
			throw new Error('Problem with the client !');
		}
	},
};
