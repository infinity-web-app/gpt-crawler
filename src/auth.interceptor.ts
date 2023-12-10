import {NextFunction, Request, Response} from "express";

const ttl = 30 * 60 * 1000 // 30 minutes

export default (request: Request, response: Response, next: NextFunction) => {
    try {
        const t = request.header('authorization')
        // logger.debug(`Supplied token: ${t}`)

        if (!t)
            return response.sendStatus(401)

        const [scheme, suppliedTimestamp] = t.split(' ').map(s => s.trim()).map(s => s.toLowerCase())

        const now = Date.now()
        const timestamp = Number(suppliedTimestamp)
        if (isNaN(timestamp))
            return response.sendStatus(401)

        if (scheme === 'bearer' && Math.abs(now - timestamp) <= ttl)
            return next()
        else
            response.sendStatus(401)
    } catch (e) {
        console.error(`Error occurred: `, e)
        response.sendStatus(400)
    }
}
