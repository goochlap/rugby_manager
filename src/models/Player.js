import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
    maxlength: [10, 'Name can not be more than 10 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
    maxlength: [15, 'Name can not be more than 15 characters']
  },
  nickName: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please add a position']
  },
  salary: {
    type: Number,
    required: [true, 'Please add a salary']
  },
  height: {
    type: Number,
    trim: true
  },
  weight: {
    type: Number,
    trim: true
  },
  birthday: { type: Date },
  birthplace: {
    type: String
  },
  biography: {
    type: String,
    maxlength: [500, 'Biography can not be more than 500 characters']
  },
  previousClub: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true
  }
});

PlayerSchema.statics.getAveragSalary = async function (teamId) {
  console.log(teamId);
  const avgObj = await this.aggregate([
    {
      $match: { team: teamId }
    },
    {
      $group: {
        _id: '$team',
        averageSalary: { $avg: '$salary' }
      }
    }
  ]);

  try {
    await this.model('Team').findByIdAndUpdate(teamId, {
      averageSalary: Math.round(avgObj[0].averageSalary)
    });
  } catch (err) {
    throw err;
  }
};

PlayerSchema.post('save', function () {
  this.constructor.getAveragSalary(this.team);
});

PlayerSchema.pre('remove', function () {
  this.constructor.getAveragSalary(this.team);
});

const Player = mongoose.model('Player', PlayerSchema);

export { Player };
