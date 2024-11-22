export async function asynFn(fn, ...args) {
    return new Promise((resolve, reject) => {
        try {
            const result = fn(...args)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    });
}