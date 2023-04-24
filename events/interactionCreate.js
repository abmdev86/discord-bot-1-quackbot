const { handleCreateQuackathon, handleJoinQuackathon } = require('../lib/eventHandlers');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			// we dont have that command report back.
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		// executing interactions based on type in try/catch
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
				// if (interaction.customId === 'myModal') {
				// 	await interaction.reply({ content: 'Your submission was received successfully!' });
				// } else if (interaction.customId === 'createQuackathon') {
				// 	await handleCreateQuackathon(interaction);
				// } else {
				// 	await interaction.reply({ content: 'Quackathon Created!!' });
				// }

				// if they are joining a quackathon
			}

			if (interaction.isSelectMenu()) {
				console.log('joining...');
				await handleJoinQuackathon(interaction);
			}

			await command.execute(interaction);
		} catch (err) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(err);
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};
