const { handleCreateQuackathon } = require('../lib/eventHandlers');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		if (interaction.isModalSubmit()) {
			switch (interaction.customId) {
				case 'myModal': {
					await interaction.reply({ content: 'Your submission was received successfully!' });
					return;
				}
				case 'createQuackathon': {
					await handleCreateQuackathon(interaction);
					return;
				}
				default: {
					await interaction.reply({ content: 'Command recieved!!' });
				}
			}
			// if (interaction.customId === 'myModal') {
			// 	await interaction.reply({ content: 'Your submission was received successfully!' });
			// } else if (interaction.customId === 'createQuackathon') {
			// 	await handleCreateQuackathon(interaction);
			// } else {
			// 	await interaction.reply({ content: 'Quackathon Created!!' });
			// }
		}

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
