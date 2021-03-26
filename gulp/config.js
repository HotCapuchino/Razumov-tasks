const SRC = 'src';
const BUILD = 'build';

const config = {
    src: {
        root: SRC,
        html: `${SRC}/*.html`,
        style: `${SRC}/styles/*.css`,
        js: `${SRC}/scripts`
    },
    build: {
        root: BUILD,
        html: BUILD, 
        style: `${BUILD}/styles`,
        js: `${BUILD}/scripts`
    },
    watch: {
        html: `${SRC}/*.html`,
        style: `${SRC}/styles/*.css`,
        js: `${SRC}/scripts`
    }, 
};

export { config };