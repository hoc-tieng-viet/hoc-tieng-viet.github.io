'use strict';

function upperC(c) {
    if (/[a-zA-Z]/.test(c)) {
        return c.toUpperCase()
    } else if (new RegExp(LOWER_ALPHABET).test(c)) {
        return UPPER_ALPHABET.charAt(LOWER_ALPHABET.indexOf(c))
    } else {
        return c
    }
}

function lowerC(c) {
    if (/[A-Z]/.test(c)) {
        return c.toLowerCase()
    } else if (new RegExp(UPPER_ALPHABET).test(c)) {
        return LOWER_ALPHABET.charAt(UPPER_ALPHABET.indexOf(c))
    } else {
        return c
    }
}

function lower(s) {
    let rs = ""
    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i)
        rs += lowerC(c)
    }
    return rs
}

function upper(s) {
    let rs = ""
    for (let i = 0; i < s.length; i++) {
        let c = s.charAt(i)
        rs += upperC(c)
    }
    return rs
}

function _capitalize(s){
    let rs = upperC(s.charAt(0)) 
    for (let i = 1; i < s.length; i++) {
        let c = s.charAt(i)
        rs += lowerC(c)
    }
    return rs
}

function capitalize(word){
    let parts = word.split(' ');
    for (let i = 0; i < parts.length; ++i){
        parts[i] = _capitalize(parts[i])
    }
    return parts.join(' ')
}