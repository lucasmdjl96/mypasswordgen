import CryptoJS from "crypto-js"

export interface WorkerRequest {
    id: number,
    masterPassword: string,
    username: string,
    emailAddress: string,
    pageName: string,
    keySize: number,
    iterations: number
}

export interface WorkerResponse {
    id: number,
    password: string
}

onmessage = (event: MessageEvent<WorkerRequest>) => {
    const masterPassword = event.data.masterPassword;
    const username = event.data.username;
    const emailAddress = event.data.emailAddress;
    const pageName = event.data.pageName;
    const keySize = event.data.keySize;
    const iterations = event.data.iterations;
    const message: WorkerResponse = {
        id: event.data.id,
        password: CryptoJS.PBKDF2(
            masterPassword, 
`${username}
${emailAddress}
${pageName}`,             
            {
                keySize: keySize,
                iterations: iterations,
                hasher: CryptoJS.algo.SHA512
            }
        ).toString(CryptoJS.enc.Base64url)
    }
    postMessage(message);
}