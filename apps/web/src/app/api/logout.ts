import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // apaga cookie
    res.setHeader("Set-Cookie", "fake_jwt=; Path=/; Max-Age=0; SameSite=Lax")
    res.status(200).json({ ok: true })
}
