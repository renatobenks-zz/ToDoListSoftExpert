export const isEnabled = (name) => {
    return window.location.hash.split('#')[1] === name;
};
