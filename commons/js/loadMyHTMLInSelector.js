export function loadMyHTMLInSelector(url, querySelector){
    fetch(url)
        .then(response => response.text())
        .then(htmlText => {
            $(querySelector).empty().append(htmlText);
        });
}