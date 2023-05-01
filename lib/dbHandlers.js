const { db } = require('./db');

/**
 *
 * @returns array of challenges
 */
const getAllChallenges = async () => {
	return await db.challenge.findMany();
};

/**
 * Grabs a challange with the provided id
 * @param {string} id - the database ID of a challenge
 */
const getChallengeById = async id => {
	const challenge = await db.challenge.findUnique({
		where: {
			id: id,
		},
	});
	return challenge;
};

/**
 *
 * @param {string} teamName the new name for the team
 * @param {string} challengeId the id of the challenge in the db
 * @param {string} userId the interacting user's id
 * @returns
 */
const createTeam = async (teamName, challengeId, userId) => {
	try {
		// get the user based off the id submitted
		let user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});

		// no user so throw error, cannot create team without registering first
		if (!user) {
			throw new Error('User must be registered as a Challenge memeber to create teams.', {
				cause: { code: 'NonUnique', values: [teamName] },
			});
		} else {
			// we have a registered user so lets create the team.
			const newTeam = await db.team.create({
				data: {
					name: teamName,
					challengeId: challengeId,
				},
			});

			if (!newTeam) {
				throw Error('The team name already exsists', {
					cause: `a team with the name ${teamName} already exsists`,
				});
			}

			// now we have a team and user, lets create the relation table UsersOnTeams
			const relationUserOnTeams = await db.usersOnTeams.create({
				data: {
					userId: user.id,
					teamId: newTeam.id,
				},
			});

			// we created the union successfully, return the team for further processing, etc
			if (relationUserOnTeams) {
				return newTeam;
			}
		}
	} catch (error) {
		console.error(`dbHandler: ${error}`);
		throw error;
	}
};

/**
 *
 * @param {string} userId the id of the user you wish to get.
 * @param {boolean} withTeam set true to include the teams user is on (default: false)
 * @returns Database User instance
 */
const getUserById = async (userId, withTeam = false) => {
	const user = db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			teams: withTeam,
		},
	});
	return user;
};

module.exports = {
	getAllChallenges,
	getChallengeById,
	createTeam,
	getUserById,
};
