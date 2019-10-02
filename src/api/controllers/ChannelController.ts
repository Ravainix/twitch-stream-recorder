import { Request, Response } from 'express';
import Models from '../../models';
import { Channel } from '../../models/User.model';
import { recorder } from '../../app';

export const getAllPosts = (request: Request, response: Response) => {
  try {
    Models.Channel.find()
      .then(channel => {
        response.send(channel);
      })
      .catch(err => {
        response.status(500).send({ err });
      });
  } catch (err) {
    response.status(500).send({ err });
  }
};

export const getChannelById = (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    Models.Channel.findById(id)
      .then(channel => {
        response.send(channel);
      })
      .catch(err => {
        response.status(500).send({ err });
      });
  } catch (err) {
    response.status(500).send({ err });
  }
};

export const createChannel = (request: Request, response: Response) => {
  try {
    const channelData: Channel = request.body;
    const createdChannel = new Models.Channel(channelData);

    createdChannel.save().then(savedChannel => {
      response.send(savedChannel);
    });

    recorder.addChannel(createdChannel.username);
  } catch (error) {
    response.send(error);
  }
};

export const deleteChannel = (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    Models.Channel.findByIdAndDelete(id)
      .then(successResponse => {
        if (successResponse) {
          recorder.deleteChannel(successResponse.username);
          response.sendStatus(200);
        } else {
          response.sendStatus(404);
        }
      })
      .catch(err => {
        response.status(500).send({ err });
      });
  } catch (err) {
    response.status(500).send({ err });
  }
};

export const modifyChannel = (request: Request, response: Response) => {
  const id = request.params.id;
  const channelData: Channel = request.body;
  Models.Channel.findByIdAndUpdate(id, channelData, { new: true }).then(channel => {
    response.send(channel);
  });
};
