module.exports = () => {
    return (req, res, next) => {
        // Controlla se la richiesta è per la pagina di login o per il processo di autenticazione
        if (req.path === '/login' || req.path === '/logout') {
            return next();
        }

        // Se l'utente non è autenticato, reindirizza alla pagina di login
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        // Altrimenti, prosegui con le altre route protette
        next();
    }
}