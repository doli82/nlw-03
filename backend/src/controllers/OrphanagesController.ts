import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'
import orphanagesView from '../views/orphanages.view'

export default {
  async index(
    request: Request,
    response: Response
  ): Promise<Response<Orphanage[]>> {
    const orphanagesRepository = getRepository(Orphanage)
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    })
    return response.json(orphanagesView.renderMany(orphanages))
  },
  async show(
    request: Request,
    response: Response
  ): Promise<Response<Orphanage>> {
    const { id } = request.params
    const orphanagesRepository = getRepository(Orphanage)
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })
    return response.json(orphanagesView.render(orphanage))
  },
  async create(
    request: Request,
    response: Response
  ): Promise<Response<Orphanage>> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body

    const requestImages = request.files as Express.Multer.File[]
    const images = requestImages.map((file) => ({ path: file.filename }))

    const orphanagesData = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(500),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    })

    await schema.validate(orphanagesData, {
      abortEarly: false,
    })

    const orphanagesRepository = getRepository(Orphanage)
    const orphanage = orphanagesRepository.create(orphanagesData)

    await orphanagesRepository.save(orphanage)

    return response.status(201).json(orphanagesView.render(orphanage))
  },
}
