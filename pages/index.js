import useDarkMode from 'use-dark-mode';

export default () => {
    const darkMode = useDarkMode(false)
    return (
        <>
            <button type="button" onClick={darkMode.disable}>
                ☀
            </button>
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>{' '}
            Hi Dark Mode
        </>
    )
}
