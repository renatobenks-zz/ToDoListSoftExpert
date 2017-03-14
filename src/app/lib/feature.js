export const isEnabled = (name) => {
    return window.location.hash.split('#').includes(name);
};
