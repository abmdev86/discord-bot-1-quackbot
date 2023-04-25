const { handleCreateQuackathon, handleJoinQuackathon } = require('../lib/eventHandlers');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);

		try {
			// if it is a modal
			if (interaction.isModalSubmit()) {
				// checking modal Id to execute proper event handler and response.
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
			}

			if (interaction.isSelectMenu()) {
				console.log('joining...');
				await handleJoinQuackathon(interaction);
			}

			// todo does this need to be here?
			if (!interaction.isCommand()) return;

			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
