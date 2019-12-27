const express = require('express');
const router = express.Router();
const Messege = require('../models/messege');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({ "secret": true });
});

router.get('/manage', UserCtrl.authMiddleware, function(req, res) {
    const user = res.locals.user;

    Messege
        .where({ user })
        .exec(function(err, foundMesseges) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json(foundMesseges);
        });
});

router.get('/:id/verify-user', UserCtrl.authMiddleware, function(req, res) {
    const user = res.locals.user;

    Messege
        .findById(req.params.id)
        .populate('user')
        .exec(function(err, foundMessege) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (foundMessege.user.id !== user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not messege owner!' }] });
            }


            return res.json({ status: 'verified' });
        });
});

router.get('/:id', function(req, res) {
    const messegeId = req.params.id;

    Messege.findById(messegeId)
        .populate('user', 'username -_id')
        .exec(function(err, foundMessege) {

            if (err || !foundMessege) {
                return res.status(422).send({ errors: [{ title: 'Messege Error!', detail: 'Could not find Messege!' }] });
            }

            return res.json(foundMessege);
        });
});

router.patch('/:id', UserCtrl.authMiddleware, function(req, res) {

    const messegeData = req.body;
    const user = res.locals.user;

    Messege
        .findById(req.params.id)
        .populate('user')
        .exec(function(err, foundMessege) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (foundMessege.user.id !== user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not messege owner!' }] });
            }

            foundMessege.set(messegeData);
            foundMessege.save(function(err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.status(200).send(foundMessege);
            });
        });
});

router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
    const user = res.locals.user;

    Messege
        .findById(req.params.id)
        .populate('user', '_id')
        .exec(function(err, foundMessege) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (user.id !== foundMessege.user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'You are not messege owner!' }] });
            }

            foundMessege.remove(function(err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                User.update({ _id: foundMessege.user.id }, { $pull: { messeges: foundMessege._id } }, () => {});

                return res.json({ 'status': 'deleted' });
            });
        });
});

router.post('', UserCtrl.authMiddleware, function(req, res) {
    const {  description } = req.body;
    const user = res.locals.user;

    const messege = new Messege({  description });
    messege.user = user;

    Messege.create(messege, function(err, newMessege) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        User.updateOne({ _id: user.id }, { $push: { messeges: newMessege } }, function() {});

        return res.json(newMessege);
    });
});

router.get('', function(req, res) {
    Messege.find({})
        .populate('user', 'username -_id')
        .exec(function(err, foundMesseges) {

            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json(foundMesseges);
        });
});

module.exports = router;

