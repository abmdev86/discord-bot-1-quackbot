const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('join-quackathon'),
};
