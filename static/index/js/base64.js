function base64encode(e) {
    var a, r, h, o, c, d;
    for (h = e.length, r = 0, a = ""; r < h;) {
        if (o = 255 & e.charCodeAt(r++), r == h) {
            a += base64EncodeChars.charAt(o >> 2), a += base64EncodeChars.charAt((3 & o) << 4), a += "==";
            break
        }
        if (c = e.charCodeAt(r++), r == h) {
            a += base64EncodeChars.charAt(o >> 2), a += base64EncodeChars.charAt((3 & o) << 4 | (240 & c) >> 4), a += base64EncodeChars.charAt((15 & c) << 2), a += "=";
            break
        }
        d = e.charCodeAt(r++), a += base64EncodeChars.charAt(o >> 2), a += base64EncodeChars.charAt((3 & o) << 4 | (240 & c) >> 4), a += base64EncodeChars.charAt((15 & c) << 2 | (192 & d) >> 6), a += base64EncodeChars.charAt(63 & d)
    }
    return a
}

function base64decode(e) {
    var a, r, h, o, c, d, s;
    for (d = e.length, c = 0, s = ""; c < d;) {
        do {
            a = base64DecodeChars[255 & e.charCodeAt(c++)]
        } while (c < d && -1 == a);
        if (-1 == a) break;
        do {
            r = base64DecodeChars[255 & e.charCodeAt(c++)]
        } while (c < d && -1 == r);
        if (-1 == r) break;
        s += String.fromCharCode(a << 2 | (48 & r) >> 4);
        do {
            if (61 == (h = 255 & e.charCodeAt(c++))) return s;
            h = base64DecodeChars[h]
        } while (c < d && -1 == h);
        if (-1 == h) break;
        s += String.fromCharCode((15 & r) << 4 | (60 & h) >> 2);
        do {
            if (61 == (o = 255 & e.charCodeAt(c++))) return s;
            o = base64DecodeChars[o]
        } while (c < d && -1 == o);
        if (-1 == o) break;
        s += String.fromCharCode((3 & h) << 6 | o)
    }
    return s
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);