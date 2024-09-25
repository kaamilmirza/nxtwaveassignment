import User from '../../models/User';

export const getProfile = async (req: any, res: any) => {
  const userId = req.body.userId;

  const user = await User.findByPk(userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateProfile = async (req: any, res: any) => {
  const userId = req.body.userId;
  const { name, email } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.name = name;
      user.email = email;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
};
