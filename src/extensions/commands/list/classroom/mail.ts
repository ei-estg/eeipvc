import {SlashCommand} from "../../base/SlashCommand";
import {SlashCommandBuilder} from "@discordjs/builders";
import {eiEmbed} from "../../../../defaults/embed";
import {getMailByTeacherName} from "../../../../requests/mails";

export const emailCommand: SlashCommand = {
    builder: new SlashCommandBuilder()
        .setName('mail')
        .setDescription('Encontra os emails dos docentes através do nome')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Nome do docente para procurar o email')
                .setRequired(true)
        ),
    async run(it) {
        const teacherName = it.options.get('nome').value

        const teachers = await getMailByTeacherName(teacherName)

        const embed = eiEmbed()
        embed.setTitle('Emails')
        teachers.forEach(teacher => embed.addFields({
            name: teacher.fullName,
            value: teacher.email || 'E-mail não encontrado'
        }))

        return embed
    }
}
