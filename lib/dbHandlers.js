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
	console.log('getting unique challenge with id of: ', id);

	const challenge = await db.challenge.findUnique({
		where: {
			id: id,
		},
	});
	console.log('getting unique challenge', challenge);
	return challenge;
};

module.exports = {
	getAllChallenges,
	getChallengeById,
};
