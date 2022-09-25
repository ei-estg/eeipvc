/*import { messageParser, CommandsExtension } from '../src/extensions/commands'

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
test('command parser arguments', () => {
    expect(CommandsExtension.areArgumentsRight(0, 1, 1)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(2, 3, 1)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(3, 3, 1)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(3, 4, 1)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(0, 3, 3)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(0, 3, 3)).toBe(true)
    expect(CommandsExtension.areArgumentsRight(3, 3, 1)).toBe(true)

    expect(CommandsExtension.areArgumentsRight(2, 1, 0)).toBe(false)
    expect(CommandsExtension.areArgumentsRight(0, 2, 1)).toBe(false)
    expect(CommandsExtension.areArgumentsRight(0, 1, 0)).toBe(false)
})
*/
