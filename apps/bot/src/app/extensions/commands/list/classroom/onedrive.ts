import { SlashCommand } from '../../base/SlashCommand'
import { SlashCommandBuilder } from '@discordjs/builders'

export const onedriveCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('onedrive')
        .setDescription('Link para o OneDrive com recursos do curso'),

    run() {
        return 'https://ipvcpt-my.sharepoint.com/:f:/g/personal/amatossousa_ipvc_pt/EneYoFbWQHNAlh4MBOLhtVUByrmdpsR3EulU6BU5Wqp5ww?e=bTIVth'
    },
}
