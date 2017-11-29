var host=process.argv[2];
module.exports = {
	sessionSecret: 'developmentSessionSecret',
	DBuri: 'mongodb://'+host+'/pacientes-crh'

};
