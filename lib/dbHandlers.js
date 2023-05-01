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

const getAllTeamsByUserId = async userId => {
	const usersOnTeams = await db.usersOnTeams.findMany({
		where: {
			userId: {
				equals: userId,
			},
		},
	});
	return usersOnTeams;
};

const getAllTeams = async () => {
	return await db.team.findMany();
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
	});
	return user;
};
const getUserByUserName = async userName => {
	try {
		const users = await getAllUsers();
		let user = users.filter(u => u.userName === userName);

		if (user) {
			return user;
		}
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};

const getAllUsers = async () => {
	const users = await db.user.findMany();

	return users;
};

const addUserToTeam = async (ownerId, newMemberId, teamId) => {
	const usersOnTeams = await db.usersOnTeams.findMany();
	const team = await db.team.findUnique({
		where: {
			id: teamId,
			AND: [
				{
					members: {
						userId: ownerId,
					},
				},
			],
		},
	});

	// get the UsersOnTeams table that has both the provided team id and user id
	// const teamToUpdate = usersOnTeams.map(data => {
	// 	if (data.teamId === team.id && data.userId === ownerId) {
	// 		return data;
	// 	}
	// });

	return await db.usersOnTeams.create({
		data: {
			teamId: team.id,
			userId: newMemberId,
		},
	});
};

module.exports = {
	getAllChallenges,
	getChallengeById,
	createTeam,
	getUserById,
	getAllUsers,
	getUserByUserName,
	addUserToTeam,
	getAllTeamsByUserId,
	getAllTeams,
};
