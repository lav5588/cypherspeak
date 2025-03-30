import cookie from "cookie";
import jwt from "jsonwebtoken";
export const verifyTokenForSocket = (socket, next) => {
    const { cookie: rawCookie } = socket.handshake.headers;

    if (!rawCookie) {
        return next(new Error("No cookies sent"));
    }

    const parsedCookies = cookie.parse(rawCookie);
    const token = parsedCookies.token;

    if (!token) {
        return next(new Error("Token not found in cookies"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Attach user info to socket
        next();
    } catch (err) {
        console.error("JWT Error:", err);
        return next(new Error("Invalid token"));
    }
};
