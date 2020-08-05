
UPPER_ALPHABET = "[ÀÁÂÃÒÓÔÕÙÚÈÉÊÌÍÝĂĐĨŨƠƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸ]"
LOWER_ALPHABET = "[àáâãòóôõùúèéêìíýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]"
VI_ALPHABET = "[ÀÁÂÃÒÓÔÕÙÚÈÉÊÌÍÝĂĐĨŨƠƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸàáâãòóôõùúèéêìíýăđĩũơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ-\\w]"

WORD_GLOBAL = new RegExp("(" + VI_ALPHABET + "+)", "g")
WORD = new RegExp("(" + VI_ALPHABET + "+)")

var caseSensitive = true

var selectedRange = [-1, -1]

var thisMemo = ''




function changeCase(c) {
    let word = $("#this-word").val()
    if (c == 'capitalize'){
        word = capitalize(word)
    } else if (c == 'lower'){
        word = lower(word)
    }
    $("#this-word").val(word)
    loadMemo()
}


function selectWords(caseSensitive = true) {
    $(".selected").removeClass("selected")
    words = []
    for (let i = selectedRange[0]; i <= selectedRange[1]; ++i) {
        let span = $("span.word[data-index='" + String(i) + "']")
        span.addClass("selected")
        if (caseSensitive) {
            words.push(span.text())
        } else {
            words.push(lower(span.text()))
        }
    }
    $("#this-word").val(words.join(" "))
    loadMemo()
}

function updateMemo() {
    let word = $("#this-word").val()
    let memo = $("#word-memo").val()
    if (memo != thisMemo) {
        if (memo.length == 0){
            console.log(memo)
            if (word in memoDict){
                memos[word] = memo;
            } else if (word in memos){
                delete memos[word]
            }
        } else {
            memos[word] = memo;
        }
        thisMemo = memo
        updateMemoDisplay(word, memo)
    }
}

function updateMemoDisplay(word, memo) {
    dd = $("#memo-list dd[data-word='" + word + "']")
    if (dd.length > 0) {
        if (memo.length == 0){
            if (word in memos){
                dd.text("Memo Deleted.")
            } else {
                dd.prev().remove()
                dd.remove()
            }
        } else {
            dd.text(memo)
        }
    } else {
        dt = $("<dt></dt>")
        dt.text(word)
        dt.attr('data-word', word)
        dd = $("<dd></dd>")
        dd.attr('data-word', word)
        dd.text(memo.length == 0 ? "Memo Deleted." : memo)
        $("#memo-list").append(dt).append(dd)
    }

}

function loadMemo() {
    let word = $("#this-word").val()
    let memo = ''
    if (word in memos) {
        memo = memos[word]
    } else if (word in memoDict) {
        memo = memoDict[word]
    }
    thisMemo = memo
    $('#word-memo').val(memo)
}

function newSpan(text, index) {
    let span = $("<span></span>")
    if (isWord(text)) {
        span.addClass("word")
    }
    span.attr("data-index", index)
    span.text(text)
    return span
}

function splitWords(text) {
    return text.split(WORD_GLOBAL)
}

function isWord(word) {
    return WORD.test(word)
}

function genReadContent(text) {
    let words = splitWords(text)
    let content = $("<div></div>")
    let curP = $("<p></p>").appendTo(content)
    let i = 0;
    for (const word of words) {
        if (/.*[\r\n].*/.test(word)) {
            newSpan(word, i).appendTo(curP)
            ++i;
            curP = $("<p></p>").appendTo(content)
        } else if (/^\s+$/.test(word)) {
            curP.append(word)
        } else {
            newSpan(word, i).appendTo(curP)
            ++i;
        }
    }
    return content
}

$(() => {



    $("#submit-input-text").click(() => {
        let inputText = $("#input-text").val()
        $("#text-to-read").empty()
        $("#text-to-read").append(genReadContent(inputText))
        return false
    })

    $(document).on("click", ".word", (e) => {
        let span = $(e.currentTarget)
        let index = parseInt(span.attr("data-index"))
        if (selectedRange[0] == index + 1) {
            selectedRange[0] = index;
        } else if (selectedRange[1] == index - 1) {
            selectedRange[1] = index;
        } else {
            selectedRange[0] = index;
            selectedRange[1] = index;
        }
        selectWords(caseSensitive)
    })

    $("#submit-memo").click(() => {
        updateMemo()
        return false
    })


    $("#submit-file").click(() => {
        startRead()

        return false
    })

    $("#parse-file").click(() => {

        loadMemoDict()
        return false
    })

    $("#save-memos").click(() => {
        saveChanges()
        return false
    })

    $('body').click((e) => {
        if (!$(e.target).hasClass('word')) {
            selectedRange[0] = -1
            selectedRange[1] = -1
            $(".selected").removeClass("selected")
        }
    })

    $('#case-sensitive-switch').click((e) => {
        e.stopPropagation();
        if ($(e.target).prop('checked') == true) {
            caseSensitive = true
        } else {
            caseSensitive = false
        }
        selectWords(caseSensitive)
    })

    $('#case-sensitive-switch-label').click((e) => {
        e.stopPropagation()
    })

    $('#input-text').click((e) => {
        e.stopPropagation()
    })

    $('#btn-capitalize').click((e) => {
        e.stopPropagation()
        changeCase('capitalize')
    })

    $('#btn-lower').click((e) => {
        e.stopPropagation()
        changeCase('lower')
    })

    $('#btn-hide').click(() => {
        $('#btn-load-new-text').removeClass('d-none')
        $('#btn-load-new-text').show()
    })

    $('#btn-load-new-text').click((e) => {
        $(e.target).hide()
    })

});