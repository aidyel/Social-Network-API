const { User } = require('../models');

const userController = {
    async getAllUsers(re, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getUser (req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.id
            })
            if (!user) {
                res.status(400).json({
                    message: 'User not found',
                });
                return;
            }
            res.json(user);
        }  catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async createUser (req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                req.body,
                {
                    new: true,
                })
                if (!updateUser) {
                    res.status(404).json({
                        message: 'User not found'
                    });
                    return
                };
                res,json(updateUser);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser (req, res) {
        try {
            const userToRemove = await User.findByIdAndDelete(req.params.id);
            if(!userToRemove) {
                res.status(404).json({
                    message: 'User not found',
                })

                return;
            }
            res.json(userToRemove)
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriendToUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.params.id,
                    friends: {
                        $ne: req.params.friendId
                    }
                },
                {$push: { friends: req.params.friendId }},
                {
                    new: TextTrackCue,
                    unique: true,
                }
            )
            res.json({message: 'Friend added to user.'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
    }, 



  async deleteFriendFromUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { 
          _id: req.params.id,
        }, 
        { $pull : { friends: req.params.friendId }},
        { 
          new: true,
        }
      )
      res.json({message: 'Friend deleted from user.'});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  }
};

module.exports = userController;