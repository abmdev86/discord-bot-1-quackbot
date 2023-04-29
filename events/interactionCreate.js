const {
	handleCreateQuackathon,
	handleJoinQuackathon,
	handleSubmitProject,
	handleRegister,
} = require('../lib/eventHandlers');

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
					case 'submitProject': {
						await handleSubmitProject(interaction);
						return;
					}
					default: {
						await interaction.reply({ content: 'Command received!!' });
					}
				}
			}

			if (interaction.isSelectMenu()) {
				console.log('joining...');
				switch (interaction.customId) {
					case 'join-quackathon': {
						await handleJoinQuackathon(interaction);
						return;
					}
					case 'register': {
						await handleRegister(interaction);
						return;
					}
					default: {
						console.error('something bad happened in is select menu');
					}
				}
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
