export function getStorageItem(name) {
    const storedItems = localStorage.getItem(name);

    if (storedItems) {
        return JSON.parse(storedItems);
    }
}

export function setStorageItem(name, data) {
    localStorage.setItem(name, JSON.stringify(data.value))
}