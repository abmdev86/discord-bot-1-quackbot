const { SlashCommandBuilder } = require('@discordjs/builders');
const { getUserById } = require('../lib/dbHandlers');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('team-invite')
		.setDescription('Invite a member to your team')
		.addStringOption(option => option.setName('user').setDescription('The name of user').setRequired(true)),

	async execute(interaction) {
		try {
			console.log(interaction.user);
			const userId = interaction.user.id;

			const user = await getUserById(userId, true);

			if (user) {
				//todo
				const otherMember = interaction.options._hoistedOptions[0].value;
				console.log('OTHER MEMEBER ', otherMember);
				const newUser = await getUserById(otherMember.id, true);

				await interaction.reply(`Invited ${newUser.id}`);
			} else {
				interaction.reply('You must be a registered user to invite. try /register command first');
			}
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
