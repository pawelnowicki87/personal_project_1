import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email, password);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("[LOGIN ERROR]:", error.message, error);
    return res.status(401).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    await authService.logout(token);
    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("[LOGOUT ERROR]:", error.message, error);
    return res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserFromToken(req.userId);
  
    return res.status(200).json({ user });
  } catch (error) {
    console.error("[PROFILE ERROR]:", error.message, error);
    return res.status(404).json({ error: error.message });
  }
};
