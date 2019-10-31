import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkProvider = await User.findOne({
      were: {
        user_id: req.userId,
        provider: true,
      },
    });

    if (!checkProvider) {
      return res.status(401).json('User is not are provider');
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      were: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
        order: ['date'],
      },
    });
    return res.json(appointments);
  }
}

export default new ScheduleController();
