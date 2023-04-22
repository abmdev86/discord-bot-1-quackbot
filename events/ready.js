module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		// TODO: initialize and gather all user data
		const guild = client.guilds.resolve('1089293643212402718');
		// guild has owner ID and members
		// fetch() with userID working, but not without it
		// guild.members.fetch()
  		// 	.then(console.log)
  		// 	.catch(console.error);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
