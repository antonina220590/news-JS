import Loader from './loader';

function getEnvVar(key: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Environment variable ${key} is missing!`);
    }
    return value;
}
class AppLoader extends Loader {
    constructor() {
        super(getEnvVar('API_URL', process.env.API_URL), {
            apiKey: getEnvVar('API_KEY', process.env.API_KEY),
        });
    }
}

export default AppLoader;
