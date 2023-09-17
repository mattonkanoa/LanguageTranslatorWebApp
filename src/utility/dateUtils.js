export const dateOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
};

// Utility functions
export function formatDate(date) {
    return new Date(date).toLocaleString('en-US', dateOptions).replace(',', '');
}

export function getFormattedDate() {
    return new Date().toLocaleString('en-US', dateOptions).replace(',', '');
}