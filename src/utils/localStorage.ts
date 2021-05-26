const JWT_KEY: string = 'jwtToken';

function saveJwtToken(jwtToken: string) {
    localStorage.setItem(JWT_KEY, jwtToken);
}

function deleteJwtToken() {
    localStorage.removeItem(JWT_KEY);
}

function getJwtToken(): string | null {
    return localStorage.getItem(JWT_KEY);
}

const functions = {
    saveJwtToken, 
    deleteJwtToken,
    getJwtToken
}

export default functions;