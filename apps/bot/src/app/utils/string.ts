export const normalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export const shortify = (text: string, size = 15) =>
    text.length < 15 ? text : text.slice(0, size - 3) + '...'
