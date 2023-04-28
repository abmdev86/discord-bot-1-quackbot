import { UsersOnTeams } from '@prisma/client';
import prisma from './client'

interface CreateQuackathon {
    title: string,
    description: string,
    requirements: string,
    dueAt: Date
}

export async function createQuackathon(challenge: CreateQuackathon) {
	return await prisma.challenge.create({
		data: {
			title: challenge.title.trim(),
			description: challenge.description.trim(),
			requirements: challenge.requirements.trim(),
			dueAt: new Date(challenge.dueAt),
		},
	});
    
}

interface CreateProjectTeam {
	projectName: string,
	challengeId: string,
	members: string[],
	isSubmitted: boolean,
}

// export async function createProjectTeam(projectTeam: CreateProjectTeam) {
// 	return await prisma.projectTeam.create({
// 		data: {
// 			projectName: projectTeam.projectName.trim(),
// 			challengeId: projectTeam.challengeId,
// 			winner: projectTeam.winner,
// 			isSubmitted: projectTeam.isSubmitted,
// 			members: {
// 				create: [
// 					{ userId: projectTeam.members[0] },
// 					{ userId: projectTeam.members[1] },
// 					{ userId: projectTeam.members[2] },
// 				]
// 			}
// 		},
		
// 	});
// }

// export async function createUser(userId: string) {
// 	return await prisma.user.create({
// 		data: {
// 			id: userId,
// 		},
// 	});
// }

// export async function submitProject(projectTeam: string, userId: string) {

// 	// check if project exists
// 	const project = await prisma.projectTeam.findUnique({
// 		where: {
// 			projectName: projectTeam,
// 		},
// 		select: {
// 			id: true,
// 			isSubmitted: true,
// 			members: true,
// 			challengeId: true,
// 		},
// 	});

// 	if (!project) {
// 		throw new Error('Project does not exist');
// 	}
// 	// check if user is a member of the project
// 	if (!project.members.includes(userId as unknown as UsersOnProjects)) {
// 		throw new Error('User is not a member of this project');
// 	}
// 	// check if project is submitted
// 	if (project.isSubmitted) {
// 		throw new Error('Project is already submitted');
// 	}
// 	// check if project is submitted after due date
// 	const challenge = await prisma.challenge.findUnique({
// 		where: {
// 			id: project.challengeId,
// 		},
// 		select: {
// 			dueAt: true,
// 		}
// 	});
	
// 	if (challenge && challenge.dueAt < new Date()) {
// 		throw new Error('Project is submitted after due date');
// 	}
// 	try {
// 		return await prisma.projectTeam.update({
// 			where: {
// 				id: project.id,
// 			},
// 			data: {
// 				isSubmitted: true,
// 			},
// 		});
// 	} catch (error){
// 		console.error("error on update", error)
// 	}


	
// }