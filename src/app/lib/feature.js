export function *isEnabled (names) {
    let hashes = window.location.hash.split('#');
    hashes.splice(0, 1);
    for (let hash of hashes) {
        let isEnabled = names.filter(name => name === hash).map(name => name === hash)[0];
        if (isEnabled) yield hash
    }
}
