import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      where: {
        user_id: req.userId,
        provider: true,
      },
    });

    if (!checkProvider) {
      return res.status(401).json('Only providers can load notifications');
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notificatoin = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notificatoin);
  }
}

export default new NotificationController();
