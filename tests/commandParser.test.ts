import { messageParser } from '../src/handlers/commands'
import { Client } from 'discord.js'

test('command parser is working as it should', () => {
    expect(messageParser('!command arg1 arg2')).toEqual({
        prefix: '!',
        command: 'command',
        args: ['arg1', 'arg2'],
    })

    expect(messageParser('..ccommand arg1')).toEqual({
        prefix: '..',
        command: 'ccommand',
        args: ['arg1'],
    })

    expect(messageParser('!command')).toEqual({
        prefix: '!',
        command: 'command',
        args: [],
    })
})
