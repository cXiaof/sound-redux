export const windowResize = (height, width) => ({
    type: 'WINDOW_RESIZE',
    height,
    width
})

export const initEnvironment = () => (dispatch) => {
    dispatch(windowResize(window.innerHeight, window.innerWidth))

    window.onresize = () => {
        dispatch(windowResize(window.innerHeight, window.innerWidth))
    }
}
