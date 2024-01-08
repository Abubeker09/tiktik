import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/utils/client'
import { uuid } from 'uuidv4'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  if(req.method === 'PUT') {
    const { UserId, postId, like } = req.body

    const data = like ? await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: UserId
        }
      ])
      .commit()
    : await client
      .patch(postId)
      .unset([`likes[_ref=="${UserId}"]`])
      .commit()

      res.status(200).json(data)
  }
}
