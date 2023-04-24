const { db } = require('../lib/db');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isModalSubmit()) {
			if (interaction.customId === 'myModal') {
				await interaction.reply({ content: 'Your submission was received successfully!' });
			} else if (interaction.customId === 'createQuackathon') {
				console.log('modal submitted...');
				const res1 = await interaction.fields.getTextInputValue('titleInput');
				console.log('res1: ', res1);
				const res2 = await interaction.fields.getTextInputValue('descriptionInput');
				const res3 = await interaction.fields.getTextInputValue('requirementsInput');
				const res4 = await interaction.fields.getTextInputValue('dueAtInput');
				console.log(res1, res2, res3, res4);

				await db.challenge.create({
					data: {
						title: res1.trim(),
						description: res2.trim(),
						requirements: res3.trim(),
						dueAt: new Date(res4),
					},
				});

				await interaction.reply({ content: 'Quackathon Created!!' });
			} else {
				await interaction.reply({ content: 'Quackathon Created!!' });
			}
		}
		if (!interaction.isCommand()) return;

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
