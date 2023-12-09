export default {}

const loadImage = (path: string) => {
    return new window.URL(path, import.meta.url).href;
};

export { loadImage }