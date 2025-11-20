export const isAuthenticated = (req, res, next) => {
    const authHeader = 'xyz';
    if (authHeader === 'xyz') {
        next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
        res.status(401).send({ error: 'Unauthorized' }); // User is not authenticated
    }
}