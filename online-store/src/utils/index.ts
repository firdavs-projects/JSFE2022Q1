export const localStorageGeneric = <T>(key: string, value?: T): T | undefined => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        return JSON.parse(localStorage.getItem(key) as string);
    }
}
