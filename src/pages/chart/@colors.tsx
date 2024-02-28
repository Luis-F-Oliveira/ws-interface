const generateColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
    }
    return colors;
}

export const backgroundColors = generateColors(30)
export const borderColors = backgroundColors.map(color => color.replace('0.2', '1'))