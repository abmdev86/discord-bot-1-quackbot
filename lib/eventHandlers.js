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
		// get form data
		const teamName = interaction.fields.getTextInputValue("teamName");
		const projectUrl = interaction.fields.getTextInputValue("projectURL");
		const repoUrl = interaction.fields.getTextInputValue("repoURL");
		const userId = interaction.user.id;
		
		console.log("userId: ", userId);
		console.log("teamName: ", teamName);
		console.log("projectUrl: ", projectUrl);
		console.log("repoUrl: ", repoUrl);
		// get user
		const userData = await db.user.findUnique({
			where: {
				id: userId
			}
		});
		// check if user is registered
		if (!userData) {
			await interaction.reply("You must register to participate in quackathon");
			return
		}
		// get team entered in form
		const teamData = await db.team.findUnique({
			where: {
				teamName: teamName.trim(),
			},
			include: {
				members
			}
		});
		// check if user is in the team
		if (!teamData.members.includes(userId)) {
			await interaction.reply("It does not appear that you are a member of this team. Make sure that another team member has sent you and invite!");
			return
		}
		// check for projectURL
		// check for repoURL
		// TODO: validate urls
		if (!projectUrl || !repoUrl){
			await interaction.reply("You must supply a project url and repo url. You can submit the repo url for both if the project did not re	quire a deployment.");
			return
		}
		// add to Submission table
		await db.submission.create({
			data: {
				projectName: teamData.name,
				teamId: teamData.id,
				repoUrl: repoUrl,
				deployedUrl: projectUrl,
			}
		})

		
		await interaction.reply("Congrats! You have successfully submitted a project. Winners will be select over the next week!");

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
