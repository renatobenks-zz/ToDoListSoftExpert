export function *isEnabled (names) {
    let hashes = window.location.hash.split('#');
    hashes.splice(0, 1);
    for (let index in names) {
        if (names.hasOwnProperty(index)) {
            yield hashes[index] === names[index];
        }
    }
}
