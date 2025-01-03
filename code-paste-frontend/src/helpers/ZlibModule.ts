import pako from 'pako';

export const ZlibEncode = async (text: string) => {
    return pako.gzip(text, { level: 7 });
};

export const ZlibDecode = async (text: ArrayBuffer) => {
    return pako.ungzip(text, { to: 'string' });
};