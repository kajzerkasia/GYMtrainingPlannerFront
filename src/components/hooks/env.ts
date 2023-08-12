export const isFeatureEnabled = (name: string): boolean => {
    return process.env[name] === '1';
}

export const isDemoEnabled: () => boolean = isFeatureEnabled.bind(null, 'REACT_APP_IS_DEMO');

console.log(isDemoEnabled() && 'ok');