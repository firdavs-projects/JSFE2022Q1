export const generatePlaceholder = (text?: string, width = 600, height = 400): string => {
    return `https://via.placeholder.com/${width}x${height}${text && `?text=${text.replace(' ', '+')}`}`;
};

export const setFooterYear = (): void => {
    const created = document.getElementById('created');
    const currentYear = new Date().getFullYear();
    if (created && created.innerText === `${currentYear}`) {
        return;
    }
    const current = document.getElementById('current');
    if (current) {
        current.innerText = ` - ${currentYear}`;
    }
};
