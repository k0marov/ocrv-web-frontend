export function addAccents(text: string): string {
    return text.replace(/\+([аоуыэеёиюяaeiouy])/gmi, `$1\u0301`);
}

export function addBoldness(text: string): string {
    return text.replace(/\*(\**[^]*?\**)\*/gm, `<b>$1</b>`);
}

export function preprocess(text: string) {
    return addBoldness(addAccents(text));
}

export default preprocess;