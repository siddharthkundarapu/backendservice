const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;

  try {
    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user.id,
    });
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    const { status, assignedTo } = req.body;

    ticket.status = status || ticket.status;
    ticket.assignedTo = assignedTo || ticket.assignedTo;

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};