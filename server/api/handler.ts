import { Request, Response } from "express";
import Joi from "joi";

type HandlerCallback = (req: Request, res: Response, parsed?: any) => void;
type Handler = (req: Request, res: Response) => void;

/**
 * Creates a handler for a route, using Joi to validate the request body
 * @param schema Joi schema to validate the request body
 * @param callback Callback to run if the request body is valid
 * @returns
 */
export function handler(
  schema: Joi.ObjectSchema,
  callback: HandlerCallback
): Handler {
  return function (req: Request, res: Response) {
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: "400 - Bad Request" });
      return;
    }

    callback(req, res, value || {});
  };
}
