'use strict';

// Hashmap of unsaved memos
var memos = {}

function saveChanges() {
    let changed = false;
    for (const word in memos) {
        if (!word in memoDict || memos[word] != memoDict[word]) {
            changed = true;
            if (memos[word].length == 0) {
                delete memoDict[word]
            } else {
                memoDict[word] = memos[word]
            }
        }
    }
    if (changed) {
        download(JSON.stringify(memoDict), 'memos.json', 'text/plain');
    }
}
