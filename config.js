const config = {
    port: process.env.PORT || 8080,
    db: "localhost",
    db_port: 1234,
    db_user: "webserver",
    db_password: "webserverpassword",
    test_port: 6800,
    test_db: ""
}

module.exports = config;