const { db } = require('../lib/db');
const { isValidTeamSize, isValidDate } = require('./validators');
const { getAllChallenges, getChallengeById, createTeam, submitProject } = require('../lib/dbHandlers');
/**
 * (async function) that handles the interactionCreate#isModalSubmit#createQuackathon event
 * @param interaction (payload) the payload of the #interactionCreate event.

 */
async function handleCreateQuackathon(interaction) {
	console.log(`creating new Quackathon....`);
	const title = await interaction.fields.getTextInputValue('titleInput');
	const desc = await interaction.fields.getTextInputValue('descriptionInput');
	const requirements = await interaction.fields.getTextInputValue('requirementsInput');
	const dueAt = await interaction.fields.getTextInputValue('dueAtInput');
	const teamSize = await interaction.fields.getTextInputValue('teamSize');

	console.log(`\n TITLE: ${title}`);
	console.log(`\n DESCRIPTION: ${desc}`);
	console.log(`\n REQUIREMENTS: ${requirements}`);
	console.log(`\n DUE_AT: ${dueAt}`);
	console.log(`\n TEAM_SIZE: ${teamSize}`);

	if (isValidDate(dueAt)) {
		try {
			await db.challenge.create({
				data: {
					title: title.trim(),
					description: desc.trim(),
					requirements: requirements.trim(),
					dueAt: new Date(dueAt),
					minTeam: isValidTeamSize(teamSize) ? parseInt(teamSize[0]) : 2,
					maxTeam: isValidTeamSize(teamSize) ? parseInt(teamSize[2]) : 4,
				},
			});
		} catch (error) {
			console.error('challenge was not created', error);
			await interaction.reply({ content: 'unable to save to database' });
		}

		await interaction.reply({ content: 'Quackathon Created!!' });
	} else {
		await interaction.reply({
			content: 'date format must be DD-MM-YYYY and team size must be a range in the format of {number}-{number}',
		});
		return;
	}
}

async function handleJoinQuackathon(interaction) {
	try {
		//todo update the teams array on the database for Challenges
		const updatedChallenge = await db.challenge.findFirst({
			where: {
				id: interaction.values[0],
			},
		});

		await interaction.update({
			content: `${interaction.user} has joined the challenge ${updatedChallenge.title} `,
			components: [],
		});
	} catch (error) {
		console.error(error);
	}
}
async function handleSubmitProject(interaction) {
	try {

		interaction.fields.getTextInputValue("")
		// const response = submitProject()

		interaction.reply({ content: 'ok sir, message received' });
		//todo update the teams array on the database for Challenges

		// const updatedChallenge = await db.challenge.findFirst({
		// 	where: {
		// 		id: interaction.values[0],
		// 	},
		// });

		// await interaction.update({
		// 	content: `${interaction.user} has joined the challenge ${updatedChallenge.title} `,
		// 	components: [],
		// });
	} catch (error) {
		console.error(error);
	}
}
async function handleCreateTeam(interaction) {
	const team = interaction.message.content;
	const challengeID = interaction.values[0];
	const challenge = await getChallengeById(challengeID);

	await interaction.deferReply(); // defer to allow time for prisma to create team.
	// todo create team
	try {
		await createTeam(team, challengeID, interaction.user.id);
		return await interaction.editReply(
			`The Team, ${team.toUpperCase()},  has been created for the challenge ${challenge.title}`,
		);
	} catch (error) {
		await interaction.editReply(`Something went wrong with creating a team, errorcode: ${error.code}`);
	}
}

async function handleRegister(interaction) {
	try {
		const user = await db.user.findUnique({
			where: {
				id: interaction.user.id,
			},
		});
		if (!user) {
			await db.user.create({
				data: {
					id: interaction.user.id,
					userName: interaction.user.username,
				},
			});
		} else {
			await interaction.reply({ content: 'You are already registered!' });
		}
	} catch (error) {
		console.error('registration failed ==>', error);
		await interaction.reply({ content: 'unable to save to database' });
	}
	await interaction.reply({ content: 'Awesome, you are registered! Now you may create or join a team.' });
}

module.exports = {
	handleCreateQuackathon,
	handleJoinQuackathon,
	handleSubmitProject,
	handleRegister,
	handleCreateTeam,
};
