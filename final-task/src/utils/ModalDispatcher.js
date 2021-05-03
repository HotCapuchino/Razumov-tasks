export default function modalDispatcher(message) {
    window.dispatchEvent(new CustomEvent('warning', {
        detail: {
            message: message
        }
    }));
}