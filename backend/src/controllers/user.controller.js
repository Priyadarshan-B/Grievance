import {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  updateStatusService,
  deleteUserService,
  getMyProfileService,
} from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getUsersService();

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const result = await createUserService(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserService(req.params.id, req.body);

    res.json({
      success: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const user = await updateStatusService(req.params.id, req.body.is_active);

    res.json({
      success: true,
      message: "Status updated.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await getMyProfileService(req.user.id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
