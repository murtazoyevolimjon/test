import AddressModel from "../models/address.model";
import { ApiError } from "../helper/errorMessage";
import logger from "../utils/logger";

export const AddressController = {
  getAll: async (req, res, next) => {
    try {
      const model = AddressModel;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || " ";
      const skip = (page - 1) * limit;
      const fields = Object.keys(model.schema.path).filter(
        (f) => !["_id", "_v", "createAt", "updateAt"].includes(f),
      );
      const query = search
        ? {
            $or: fields.map((field) => ({
              [field]: { $regex: search, $options: "i" },
            })),
          }
        : {};
      if (req.user.role === "customer") {
        query.customer_id = req.user;
      }
      const [data, total] = await Promise.all([
        model
          .find({ ...query })
          .skip(skip)
          .limit(limit)
          .sort({ createAt: -1 }),
        model.countDocuments(query),
      ]);
      logger.info(`Successfully retrieving the data`);
      return res.status(200).json({
        succes: true,
        message: `Retrieved all data successfully!`,
        data,
        total,
        limit,
        page,
      });
    } catch (error) {
      return next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const data = await model.findOne({ _id: id, customer_id: req.user.id });
      if (!data) {
        logger.warn(`Address ID is incorrect`);
        return next(new ApiError(404, `Not found such an ID`));
      }
      return res.status(200).json({
        succes: true,
        message: `Retrieved one from data successFully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  createOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const body = req.validateData;
      const data = await model.crate(body);
      return res.status(201).json({
        success: true,
        message: `Created successfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const body = req.validationData;
      const data = await model.findByIdAndUpdate(id, body, { new: true });
      if (!data) {
        return next(new ApiError(404, `Not found such an ID!`));
      }
      return res.status(200).json({
        succes: true,
        message: `Updated successfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const model = AddressModel;
      const { id } = req.params;
      const data = await model.findByIdAndDelete({ _id: id });
      if (!data) {
        return next(new ApiError(404, `Not found such an ID!`));
      }
      return res.status(200).json({
        succes: true,
        message: `Delete successfully!`,
        data,
      });
    } catch (error) {
      return next(error);
    }
  },
};
