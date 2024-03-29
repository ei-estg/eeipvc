import { SlashCommand } from '../../base/SlashCommand'

export const roastCoder: SlashCommand = {
    name: 'roastcoder',
    description: 'Da roast a um Eng. cada vez que fizer asneiras.',

    async run() {
        const urlPool = [
            'Your code is so bad that the garbage collector collected your code instead of the memory...',
            "Your code is so bad that when people read it, they think it's Perl.",
            'Your code is so undocumented that it just got sent back to Mexico',
            'Yo code is so bad the error checker crashed',
            'Or maybe "your code is so bad it can\'t even compile to PHP"',
            'You class structure is so bad that your repo was just cloned by Karl Marx',
            'Yo code is so bad oracle asked to use it (Can replace oracle qith microsoft or mojang and it still works)',
            'Your code is so obfuscated you need a PGP decryption key to read it.',
            'Your coding practice is to programming what homeopathy is to medicine.',
            'Your code is so bad, Kyle Reese was sent back in time to submit your resume to Cyberdyne Systems.',
            'Your code is so dangerous, Deep Mind, Elon Musk and over 1000 industry experts have signed a pledge not to weaponize it.',
            'Yo code is so bad that the only way it runs is inside of a PHP sandbox explicitly named "Spaghetti Bowl"',
            "Your code is so bad that Microsoft won't even change it.",
            'Your code is so bad that even Ribeiro can use it',
            "Your code is so bad that the editor didn't even know which language you were writing...",
            'Your assembly is so bad that it was mistaken for IKEA furniture.',
            `public void OpTrysToGetGirlfriend()
{
    throw new TooUglyException()
}`,
            'Your code is so bad that when github copilot tries to help you he sends you to a hospice',
        ]

        return urlPool[Math.floor(Math.random() * urlPool.length)]
    },
}
