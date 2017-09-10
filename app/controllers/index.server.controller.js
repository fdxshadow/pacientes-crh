// Invocar modo JavaScript 'strict'
'use strict';

exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('index', {
    title: 'CRH - UV',
   user: JSON.stringify(req.user)

  });
};

